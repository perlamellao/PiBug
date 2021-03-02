var Chart = require('chart.js');
var ctx = document.getElementById('PiOnlineW');
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




function updateData(chart, label, data) {
    Chart.data.datasets[0].bars[2].value = 50
    chart.update();
  }
