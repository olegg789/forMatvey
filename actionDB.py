import sqlite3 as sql
import json

con = sql.connect('data/allUsers.db', check_same_thread = False)

def createNote(user_id, name, value, priority, status):
    cur = con.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS `allUsers` (`id` INT, `noteId` INT, `name` STRING, `value` STRING, `priority` INT, `status` INT)")
    cur.execute('SELECT noteId FROM `allUsers`')
    result = cur.fetchall()
    print(result)
    if len(result) == 0:
                result = 1
    else:
                print(result[-1][-1])
                result = int(result[-1][-1]) + 1
    cur.execute('''insert into allUsers (id,noteId,name,value,priority,status)values
                (:id,:noteId,:name,:value,:priority,:status)''',{'id':user_id,'noteId':result,'name':name,'value':value,'priority':priority,'status':status})
    con.commit(); cur.close()
    return 'ok'

def getData(user_id):
    cur = con.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS `allUsers` (`id` INT, `noteId` INT, `name` STRING, `value` STRING, `priority` INT, `status` INT)")
    cur.execute('SELECT * FROM `allUsers` WHERE id = ?', (user_id,))
    rows = cur.fetchall()
    items = []

    for item in rows:
                values = []
                for value in range(6):
                        values.append(item[value])
                result = {
                        "id": values[0],
                        "noteId": values[1],
                        "name": values[2],
                        "value": values[3],
                        "priority": values[4],
                        "status": values[5]
                }
                items.append(result)

    con.commit(); cur.close()
    return [len(rows), items]

def deleteNote(user_id, noteId):
    cur = con.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS `allUsers` (`id` INT, `noteId` INT, `name` STRING, `value` STRING, `priority` INT, `status` INT)")
    cur.execute('SELECT id FROM `allUsers` WHERE noteId = ?', (noteId,))
    result = cur.fetchall()
    if len(result) == 0:
                return {"error": True, "message": 'Incorreclyt passed noteId'}, 400
    if result[-1][-1] == user_id:
                cur.execute('DELETE from `allUsers` where noteId = ?', (noteId,))
                con.commit(); cur.close()
                return {"message": 'ok'}, 200
    else:
                return {"error": True, "message": 'One of the parameters is invalid'}, 400
