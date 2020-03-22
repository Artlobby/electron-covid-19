var $ = require('jquery');
var Chart = require('chart.js');

Chart.platform.disableCSSInjection = true;

$(document).ready(() => {
    $.when(ajaxCall('https://corona.lmao.ninja/all'), ajaxCall('https://corona.lmao.ninja/countries')).done(function(total, countries) {
        displayData(total[0]);
        displayMap(countries[0]);
    });
});

$('#btnRefresh').on('click', () => {
    $.when(ajaxCall('https://corona.lmao.ninja/all'), ajaxCall('https://corona.lmao.ninja/countries')).done(function(total, countries) {
        displayData(total[0]);
        displayMap(countries[0]);
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
    var donut = null;
    var ctx = $('#donut');
    var cases = result.cases;
    var deaths = result.deaths;
    var recovered = result.recovered;

    $('#cardConfirmed').text(cases);
    $('#cardDeaths').text(deaths);
    $('#cardRecovered').text(recovered);

    donut = new Chart(ctx, {
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