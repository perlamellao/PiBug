const ipc = require('electron').ipcRenderer
const crypto = require('crypto')
window.$ = window.jQuery = require('jquery')
const fs = require('fs');

function logen() {
    const usr = crypto.createHash('sha256')
    const pass = crypto.createHash('sha256')
    const cook = gencook()
    console.log(cook)
    fs.writeFile('.cook', cook, function (err) {
      if (err) return console.log(err)
    })
    usr.update(document.getElementById("login").value)
    let user = usr.digest('hex');
    pass.update(document.getElementById("password").value)
    let password = pass.digest('hex')
    let x = 0

    document.getElementById("login-form").classList.toggle("d-none")
    document.getElementById("loading").classList.remove("d-none")
    document.getElementById("loading").classList.add("d-flex")
    sleep(700)
    
    $.get("http://127.0.0.1/login"+"?user="+user+"&pass="+password+"&cookie="+cook, function(data, status){
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

function gencook() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 16; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

