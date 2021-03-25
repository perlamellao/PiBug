from sqlite3.dbapi2 import register_adapter
from flask import Flask, request
import sqlite3
import multiprocessing
import time
import xml.etree.ElementTree as ET

server = Flask(__name__)
cmdbuffer = "files/buffer.dat"
connected = "files/connected.xml"

conTree = ET.parse(connected)
conRoot = conTree.getroot()

@server.route('/login', methods=['GET'])
def index():
     
    userHash = request.args.get('user')
    passHash = request.args.get('pass')
    if loginApi(userHash, passHash) is True:
        cookie = request.args.get('cookie')
        setCookie(userHash, cookie)
        return("accepted")

    return('nope')

@server.route('/postcmd', methods=['GET'])
def postcmd():
    if request.method == 'GET':
        commando = request.args.get('command')
        cookie = request.args.get('cookie')
        if checkCookie(cookie) == False:
            return("nope")
        elif commando == None:
            return("nope")
        else:
            with open(cmdbuffer, 'w') as f:
                f.truncate(0)
                f.write(commando)
            return("200 OK")

@server.route('/getcmd', methods=['GET'])
def getcmd():
    if request.method == 'GET':
        with open(cmdbuffer,'r') as f:
            command=f.readline()
        return(command)

@server.route('/cmdfinished', methods=['GET'])
def cmdfinished():
    if request.method == 'GET':
        with open(cmdbuffer, 'w') as f:
            f.truncate(0)
        return("200 OK")
    return("500")

@server.route('/imonline', methods=['GET'])
def imonline():
    if request.method == 'GET':
        id_online = request.args.get('id')
        pisonline(id_online)
        return("200 OK")
def checkCookie(cookie):
    conn = sqlite3.connect('hashes.db')
    c = conn.cursor()
    c.execute("SELECT rowid, * FROM users WHERE cookies LIKE '%'||?||'%'", (cookie,))
    rowid=c.fetchone()[0]
    if rowid==None:
        return False
    else:
        return True

def setCookie(userHash, cookie):
    conn = sqlite3.connect('hashes.db')
    c = conn.cursor()
    c.execute("SELECT rowid, * FROM users WHERE user LIKE '%'||?||'%'", (userHash,))
    rowid=c.fetchone()[0]
    c.execute('UPDATE users SET cookies=? WHERE rowid=?', [cookie, rowid])
    conn.commit()
    
def loginApi(userHash, passHash):
    conn = sqlite3.connect('hashes.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users")
    rows = c.fetchall()
    for row in rows:
        if row[0] == userHash:
            if row[1] == passHash:
                return True
            else:
                return False
    return False

def pisonline(id):
    if id == None:
        return False
    else:
        pass

    
def resetOnline():
    while True:
        time.sleep(10)
    pass    


if __name__ == '__main__':
    onlinepis = multiprocessing.Process(name='p1', target=resetOnline)
    
    try:
        onlinepis.start()
        server.run(host='0.0.0.0', port=80)
    except KeyboardInterrupt:
        print("TERMINANDO DAEMON")
    except Exception:
        print("Ha ocurrido un Error")