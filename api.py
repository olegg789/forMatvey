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


class notes(Resource):

        def get(self):
                if len(request.args.to_dict()) == 0:
                        return {"error": True, "code": 5, "messsage": 'Incorrectly passed parameters'}, 400
                if request.args.to_dict().get('method') == None or request.args.to_dict().get('access_token') == None:
                    return {"error": True, "code": 5, "messsage": 'Incorrectly passed parameters'}, 400
                query_params = dict(
                    parse_qsl(
                        urlparse(f"https://example.com/?{request.args.to_dict().get('access_token').replace('/', '&')}").query,
                        keep_blank_values=True
                    )
                )
                status = is_valid(query=query_params, secret=client_secret)
                if status:
                    if request.args.to_dict().get('method') == 'notes.getMyNotes':
                        resultData = actionDB.getData(query_params['vk_user_id'])
                        return {"count": resultData[0], "items": resultData[1]}, 200

                    if request.args.to_dict().get('method') == 'notes.createNote' or request.args.to_dict().get('method') == 'notes.editNote':
                        params = ['status', 'priority', 'name','value']
                        for param in range(4):
                                if request.args.to_dict().get(params[param]) == None or request.args.to_dict().get(params[param]) == '':
                                        return {"error": True, "code": f'1{param}', "messsage": 'One of the parameters is invalid'}, 400
                        for param in range(2):
                                result = re.match('^[0-9]+$', request.args.to_dict().get(params[param]))
                                if result == None:
                                        return {"error": True, "code": f'1{param}', "messsage": 'One of the parameters is invalid'}, 400
                                if int(request.args.to_dict().get(params[param])) < 0 or int(request.args.to_dict().get(params[param])) > 3:
                                        return {"error": True, "code": f'1{param}', "messsage": 'One of the parameters is invalid'}, 400
                        if request.args.to_dict().get('method') == 'notes.createNote':
                                resultData = actionDB.createNote(query_params['vk_user_id'], request.args.to_dict().get('name').replace('¦', '&'), request.args.to_dict().get('value').replace('¦', '&'), request.args.to_dict().get('priority'), request.args.to_dict().get('status'))
                                return {"message": resultData}, 200

                        if request.args.to_dict().get('noteId') == None or request.args.to_dict().get('noteId') == '':
                                        return {"error": True, "code": 14, "messsage": 'One of the parameters is invalid'}, 400
                        result = re.match('^[0-9]+$', request.args.to_dict().get('noteId'))
                        if result == None:
                                        return {"error": True, "code": 14, "messsage": 'One of the parameters is invalid'}, 400
                        if request.args.to_dict().get('method') == 'notes.editNote':
                                resultData =  actionDB.editNote(int(query_params['vk_user_id']), request.args.to_dict().get('noteId'), request.args.to_dict().get('name').replace('¦', '&'), request.args.to_dict().get('value').replace('¦', '&'), request.args.to_dict().get('priority'), request.args.to_dict().get('status'))
                                return resultData

                    if request.args.to_dict().get('method') == 'notes.deleteNote':
                        if request.args.to_dict().get('noteId') == None or request.args.to_dict().get('noteId') == '':
                                return {"error": True, "messsage": 'Invalid passed noteId'}, 400
                        noteId = re.match('^[0-9]+$', request.args.to_dict().get('noteId'))
                        if noteId == None:
                                return {"error": True, "messsage": 'Invalid passed noteId'}, 400
                        else:
                                resultData = actionDB.deleteNote(int(query_params['vk_user_id']), int(request.args.to_dict().get('noteId')))
                                return resultData
                    else:
                        return {"error": True, "message": 'Invalid passed method'}, 400
                else:
                    return {"error": True, "code": 5, "messsage": 'Incorrectly passed parameters'}, 400

api.add_resource(notes, "/notes", "/notes/")
if __name__ == '__main__':
    app.run(host='0.0.0.0')
