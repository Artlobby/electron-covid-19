const jquery = require('jquery');

var result = jquery.ajax({
    method: 'GET',
    url: 'covid2019-api.herokuapp.com',
    dataType: 'json',
});

console.log(jquery.getJSON);