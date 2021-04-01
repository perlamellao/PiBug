var Chart = require('chart.js');
window.$ = window.jQuery = require('jquery')
var ctx = document.getElementById('PiOnlineW');
const fs = require('fs');

const server = "http://127.0.0.1:80"




var qwe = new Chart(ctx, {
  type: 'line',
  data: {
      labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
      datasets: [{
          label: '# PIBUGS CONECTED',
          data: [5, 12, 3, 5, 2, 3, 10],
          backgroundColor: [ { fillColor: '#ffff00' }, { fillColor: '#0066ff' } ],
          borderColor: '#00ff00',
          borderWidth: 1
      }]
  },
  options: {
        responsive: true,
        legend: false,
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'ESTA SEMANA',
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                },
            }]
        }
    }
});

function closealert() {
    $('#cmd-error').hide();
}

function sendcmd() {
    cmdform = document.getElementById("massivecmd")
    command = cmdform.value
    fs.readFile('files/.cook', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }else {
            cook = data;
            $.get(server + "/postcmd"+"?command="+command+"&cookie="+cook, function(data, status){
                if(data == "200 OK"){
                    console.log("Se ha enviado correctamente")
                    $('#massivecmd').val('');
                }
                else{
            
                    $('#cmd-error').show();
                }  
            });
        }
    });
}



var updatePis = window.setInterval(function(){
    fs.readFile('files/.cook', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }else {
            cook = data;
            $.get(server+"/getcon"+"?cookie="+cook, function(data, status){
                if(data){
                    var picon = document.getElementById('connected').innerHTML = data;
                }
                else{
                    console.log(status)
                }  
            });
        }
    });


}, 15000)

//MAIN MENU

let menuBtn = document.getElementById('menu-btn')
let piBtn = document.getElementById('pi-btn')
let targetBtn = document.getElementById('target-btn')
let menuDiv = document.getElementById('menupage')
let piDiv = document.getElementById('pipage')
let targetDiv = document.getElementById('targetpage')
menuDiv.classList.add("ninuse");
targetDiv.classList.add("ninuse");





if (piBtn) {
    piBtn.addEventListener("click", function() {
        menuBtn.classList.remove("active");
        targetBtn.classList.remove("active");
        piBtn.classList.add("active");

        menuDiv.classList.remove("inuse");
        menuDiv.classList.add("ninuse");
        targetDiv.classList.add("ninuse");
        targetDiv.classList.remove("inuse");
        piDiv.classList.remove("ninuse");
        piDiv.classList.add("inuse");
    });
}

if (targetBtn){ 
    targetBtn.addEventListener("click", function() {
        menuBtn.classList.remove("active");
        piBtn.classList.remove("active");
        targetBtn.classList.add("active");

        menuDiv.classList.remove("inuse");
        menuDiv.classList.add("ninuse");
        targetDiv.classList.add("inuse");
        targetDiv.classList.remove("ninuse");
        piDiv.classList.remove("inuse");
        piDiv.classList.add("ninuse");
    });
}

if (menuBtn){
    menuBtn.addEventListener("click", function() {
    
        targetBtn.classList.remove("active");
        piBtn.classList.remove("active");
        menuBtn.classList.add("active");

        menuDiv.classList.remove("ninuse");
        menuDiv.classList.add("inuse");
        targetDiv.classList.add("ninuse");
        targetDiv.classList.remove("inuse");
        piDiv.classList.remove("inuse");
        piDiv.classList.add("ninuse");
    });
}


