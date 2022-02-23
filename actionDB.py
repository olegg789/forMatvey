import sqlite3 as sql
import json

con = sql.connect('data/allUsers.db', check_same_thread = False)

def getData(user_id): # Статистика
    cur = con.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS `allUsers` (`id` INT, `name` STRING, `value` STRING, `priority` INT, `status` INT)")
    cur.execute('SELECT * FROM `allUsers` WHERE id = ?', (user_id,))
    rows = cur.fetchall()
    items = []

    for item in rows:
                values = []
                for value in range(5):
                        values.append(item[value])
                result = {
                        "id": values[0],
                        "name": values[1],
                        "value": values[2],
                        "priority": values[3],
                        "status": values[4]
                }
                items.append(result)

    con.commit(); cur.close()
    return [len(rows), items]
