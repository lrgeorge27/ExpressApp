/* global $ */
$(function() {
    $.get('/cities', appendToList);

    function appendToList(cities) {
        var list = [];
        var city, content;
        for (var i in cities) {
            city = cities[i];
            content = '<a href="/cities/' + city + '">' + city + '</a>';
            list.push($('<li>', { html: content }, '</li>'));
        }
        $('.cities-list').append(list);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        var form = $(this); //makes form easier to work with
        var cityData = form.serialize(); //transforms form data to url-encoded notation

        $.ajax({
            type: 'POST',
            url: '/cities',
            data: cityData
        }).done(function(cityName) {
            appendToList([cityName]); //array with single argument, keeps function parameters consistant
            form.trigger('rest'); //clears form text input fields
        });
    });
});
