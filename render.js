const ipc = require('electron').ipcRenderer
const crypto = require('crypto')
window.$ = window.jQuery = require('jquery')
const fs = require('fs');
const server = "http://127.0.0.1:4432"
function init() {
  fs.writeFile('files/.cook', "NoCook", function (err) {
    if (err) return console.log(err)
  })
}
init()




function logen() {
    const usr = crypto.createHash('sha256')
    const pass = crypto.createHash('sha256')
    const cook = gencook()
    fs.writeFile('files/.cook', cook, function (err) {
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
    
    $.ajax({
      url:server + "/login"+"?user="+user+"&pass="+password+"&cookie="+cook,
      success: function(data){
        if(data == "accepted"){
          sleep(2500)
          ipc.send('entry-accepted', 'login')
        }else{
          sleep(2500)
          alert("SUS CREDENCIALES NO SON CORRECTAS")
          document.getElementById("login-form").classList.toggle("d-none")
          document.getElementById("loading").classList.remove("d-flex")
          document.getElementById("loading").classList.add("d-none")
          document.getElementById("password").value="";
        }
      },
      timeout:2000,
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (textStatus == 'timeout'){
          alert("NO SE HA PODIDO ESTABLECER CONEXION CON EL SERVIDOR")
          document.getElementById("login-form").classList.toggle("d-none")
          document.getElementById("loading").classList.remove("d-flex")
          document.getElementById("loading").classList.add("d-none")
          document.getElementById("password").value=""
        }
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

