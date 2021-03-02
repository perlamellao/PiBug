const ipc = require('electron').ipcRenderer
const crypto = require('crypto')
window.$ = window.jQuery = require('jquery')

function logen() {
    const usr = crypto.createHash('sha256')
    const pass = crypto.createHash('sha256')
    usr.update(document.getElementById("login").value)
    let user = usr.digest('hex');
    pass.update(document.getElementById("password").value)
    let password = pass.digest('hex')
    let x = 0

    document.getElementById("login-form").classList.toggle("d-none")
    document.getElementById("loading").classList.remove("d-none")
    document.getElementById("loading").classList.add("d-flex")
    sleep(700)
    $.get("http://p3rl4.me/login"+"?user="+user+"&pass="+password, function(data, status){
        if(data == "accepted"){
            sleep(2500)
            ipc.send('entry-accepted', 'login')
        }
        else{
            sleep(2500)
            alert("SUS CREDENCIALES NO SON CORRECTAS")
            document.getElementById("login-form").classList.toggle("d-none")
            document.getElementById("loading").classList.remove("d-flex")
            document.getElementById("loading").classList.add("d-none")
        }
            
      });
    return false;
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

