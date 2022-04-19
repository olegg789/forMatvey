from base64 import b64encode
from hashlib import sha256
from hmac import HMAC
from urllib.parse import urlparse, parse_qsl, urlencode
from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource
app = Flask(__name__)
api = Api(app)
CORS(app)

import re
import time
import actionDB

client_secret = 'cmlhxM5rbfQ6ExlzAxW7'

def is_valid(query: dict, secret: str) -> bool:
    if not query.get("sign"):
        return False
    vk_subset = sorted(
        filter(
            lambda key: key.startswith("vk_"),
            query
            ))
    if not vk_subset:
        return False

    ordered = {k: query[k] for k in vk_subset}
    hash_code = b64encode(
        HMAC(
            secret.encode(),
            urlencode(ordered, doseq=True).encode(),
            sha256
        ).digest()
    ).decode("utf-8")

    if hash_code[-1] == "=":
        hash_code = hash_code[:-1]

    fixed_hash = hash_code.replace('+', '-').replace('/', '_')
    return query.get("sign") == fixed_hash

timeUsers = dict()

class notes(Resource):

        def post(self):
                if len(str(request.get_json())) == 0:
                        return {"error": True, "code": 5, "messsage": 'Incorrectly passed parameters'}, 400
                if request.get_json().get('method') == None or request.get_json().get('access_token') == None:
                    return {"error": True, "code": 5, "messsage": 'Incorrectly passed parameters'}, 400
                query_params = dict(
                    parse_qsl(
                        urlparse(f"https://example.com/?{request.get_json().get('access_token')}").query,
                        keep_blank_values=True
                    )
                )
                status = is_valid(query=query_params, secret=client_secret)
                if status:
                    if request.get_json().get('method') == 'notes.getMyNotes':
                        resultData = actionDB.getData(query_params['vk_user_id'])
                        return {"count": resultData[0], "items": resultData[1]}, 200

                    if request.get_json().get('method') == 'notes.createNote' or request.get_json().get('method') == 'notes.editNote':
                        if timeUsers.get(query_params['vk_user_id']) is None: timeUsers[query_params['vk_user_id']] = time.time() - 1

                        if (time.time() - timeUsers[query_params['vk_user_id']]) > 0 or (time.time() - timeUsers[query_params['vk_user_id']] - 4) > 0:
                                params = ['status', 'priority', 'name','value']
                                for param in range(4):
                                        if request.get_json().get(params[param]) == None or not str(request.get_json().get(params[param])).strip():
                                                return {"error": True, "code": f'1{param}', "messsage": 'One of the parameters is invalid'}, 400
                                        if len(str(request.get_json().get(params[param]))) > 300:
                                                return {"error": True, "code": f'1{param}', "messsage": 'One of the parameters is invalid'}, 400
                                for param in range(2):
                                        result = re.match('^[0-9]+$', str(request.get_json().get(params[param])))
                                        if result == None:
                                                return {"error": True, "code": f'1{param}', "messsage": 'One of the parameters is invalid'}, 400
                                        if int(request.get_json().get(params[param])) < 0 or int(request.get_json().get(params[param])) > 3:
                                                return {"error": True, "code": f'1{param}', "messsage": 'One of the parameters is invalid'}, 400
                                if request.get_json().get('method') == 'notes.createNote':
                                        if (time.time() - timeUsers[query_params['vk_user_id']]) > 0:
                                                timeUsers[query_params['vk_user_id']] = time.time() + 5
                                                resultData = actionDB.createNote(query_params['vk_user_id'], request.get_json().get('name'), request.get_json().get('value'), request.get_json().get('priority'), request.get_json().get('status'))
                                                return resultData, 200
                                        else:
                                                return {"error": True, "code": '7', "message": 'today no flood'}

                                if request.get_json().get('noteId') == None or not str(request.get_json().get('noteId')).strip():
                                        return {"error": True, "code": 14, "messsage": 'One of the parameters is invalid'}, 400
                                result = re.match('^[0-9]+$', str(request.get_json().get('noteId')))
                                if result == None:
                                        return {"error": True, "code": 14, "messsage": 'One of the parameters is invalid'}, 400
                                if request.get_json().get('method') == 'notes.editNote':
                                        if (time.time() - timeUsers[query_params['vk_user_id']]) > 0:
                                                timeUsers[query_params['vk_user_id']] = time.time() + 1
                                                resultData =  actionDB.editNote(int(query_params['vk_user_id']), request.get_json().get('noteId'), request.get_json().get('name'), request.get_json().get('value'), request.get_json().get('priority'), request.get_json().get('status'))
                                                return resultData
                                        else:
                                                return {"error": True, "code": '7', "message": 'today no flood'}, 418
                        else:
                                return {"error": True, "code": '7', "message": 'today no flood'}, 418

                    if request.get_json().get('method') == 'notes.deleteNote':
                        if request.get_json().get('noteId') == None or not str(request.get_json().get('noteId')).strip():
                                return {"error": True, "messsage": 'Invalid passed noteId'}, 400
                        noteId = re.match('^[0-9]+$', str(request.get_json().get('noteId')))
                        if noteId == None:
                                return {"error": True, "messsage": 'Invalid passed noteId'}, 400
                        else:
                                resultData = actionDB.deleteNote(int(query_params['vk_user_id']), int(request.get_json().get('noteId')), False)
                                return resultData
                    if request.get_json().get('method') == 'notes.deleteAllNotes':
                        resultData = actionDB.deleteNote(int(query_params['vk_user_id']), None, True)
                        return resultData
                    else:
                        return {"error": True, "message": 'Invalid passed method'}, 400
                else:
                    return {"error": True, "code": 5, "messsage": 'Incorrectly passed parameters'}, 400

api.add_resource(notes, "/notes", "/notes/")
if __name__ == '__main__':
    app.run(host='0.0.0.0')
