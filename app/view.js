let $ = require('jquery');
let Chart = require('chart.js');
Chart.platform.disableCSSInjection = true;

$(document).ready(() => {
    console.log('Document ready!');
    $.when(ajaxCall('https://corona.lmao.ninja/all')).done(function(total) {
        displayData(total);
    });
});

function ajaxCall(url) {
    return $.ajax({
        url: url,
        success: function(result) {
            return result;
        },
        error: function(error) {
            console.log(error);
        }
    });
}


function displayData(result) {
    var ctx = $('#donut');
    var cases = result.cases;
    var deaths = result.deaths;
    var recovered = result.recovered;

    $('#cardConfirmed').text(cases);
    $('#cardDeaths').text(deaths);
    $('#cardRecovered').text(recovered);

    var donut = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Cases', 'Deaths', 'Recovered'],
            datasets: [{
                label: '# of Totals',
                data: [cases, deaths, recovered],
                backgroundColor: ['#e74c3c', '#2980b9', '#2ecc71'],
                borderColor: ['#e74c3c', '#2980b9', '#2ecc71']
            }]
        }
    });
}