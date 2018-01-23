/* global $ */
$(function() {
    $.get('/cities', appendToList);

    function appendToList(cities) {
        var list = [];
        var city, content;
        for (var i in cities) {
            city = cities[i];
            content = '<a href="/cities/' + city + '">' + city + '</a>' + '<a href="#" data-city="' + city + '"> X </a>';
            list.push($('<li>', { html: content }, '</li>'));
        }
        $('.cities-list').append(list);
    }

    function invalidEntry() { //form verification
        // console.log("invalid entry");
        console.log($('#city').val().length); //need .val() to grab the length of the input value in jQuery
        if ($('#city').val().length < 3 || $('#state').val().length < 1) {
            // console.log("if statement true");
            return true; //throw alert in form validation
        }
        return false; //continue to ajax call
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        if (invalidEntry()) { //call function as conditional 
            alert('Invalid Entry. City must have 4 characters, state must have 2 characters.');
            return;
        }

        var form = $(this); //makes form easier to work with
        var cityData = form.serialize(); //transforms form data to url-encoded notation


        $.ajax({
            type: 'POST',
            url: '/cities',
            data: cityData
        }).done(function(cityName) {
            appendToList([cityName]); //array with single argument, keeps function parameters consistant
            form.trigger('reset'); //clears form text input fields
        });

    });
    //Delete item from the list
    $('.cities-list').on('click', '[data-city]', function(event) {
        if (!confirm('Are you sure you want to delete this city?')) {
            return false;
        }

        var target = $(event.currentTarget); //link element that was clicked

        $.ajax({
            type: 'DELETE',
            url: '/cities/' + target.data('city') //reads name from links data attribute
        }).done(function() {
            target.parents('li').remove(); //removes li element containing link
        });
    });

});
