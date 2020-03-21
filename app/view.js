let $ = require('jquery');
let Chart = require('chart.js');
let fs = require('fs');
const path = require('path');

var data = null;

$(document).ready(() => {
    $.ajax({
        url: 'https://covid2019-api.herokuapp.com/v2/total',
        success: function(result) {
            var file = path.join(__dirname, 'data.json');
            displayData(result);
            return result;
        },
        error: function(error) {
            console.log(error);
        }
    });
});

function displayData(result) {
    var ctx = $('#donut');
    $.each(result, function(i, item) {
        var confirmed = item.confirmed;
        var deaths = item.deaths;
        var recovered = item.recovered;
        $('#cardConfirmed').text(confirmed);
        $('#cardDeaths').text(deaths);
        $('#cardRecovered').text(recovered);

        var donut = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Confirmed', 'Deaths', 'Recovered'],
                datasets: [{
                    label: '# of Totals',
                    data: [confirmed, deaths, recovered],
                    backgroundColor: ['#e74c3c', '#ecf0f1', '#2ecc71'],
                    borderColor: ['#e74c3c', '#ecf0f1', '#2ecc71']
                }]
            }
        });
    });
};