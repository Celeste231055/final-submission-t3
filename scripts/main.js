
// --------------------------------------------------------------------------
// Trips Array

const tripsArray = [
    {
        image: "valetta.jpg",
        destination: "Valetta",
        departure: "Cape Town",
        return: "Cape Town",
        duration: "5 days",
        date: "15 May- 20 May",
        code: "Tw2-91Rs0",
        cost: 1920
    },
    {
        image: "istanbul.jpg",
        destination: "Istanbul",
        departure: "Cape Town",
        return: "Durban",
        duration: "12 days",
        date: "18 May - 30 May",
        code: "TP-93PS0",
        cost: 5600
    },
    {
        image: "casablanca.jpg",
        destination: "Casablanca",
        departure: "Cape Town",
        return: "Cape Town",
        duration: "7 days",
        date: "20 May - 27 May",
        code: "T2s-9LS0",
        cost: 3000
    },
    {
        image: "mykonos.jpg",
        destination: "Mykonos",
        departure: "Durban",
        return: "Mykonos",
        duration: "9 days",
        date: "1 June - 10 June",
        code: "TR03-D60",
        cost: 4500
    },
    {
        image: "valencia.jpg",
        destination: "Valencia",
        departure: "Cape Town",
        return: "George",
        duration: "10 days",
        date: "25 May - 5 Jun",
        code: "RS-40S0",
        cost: 5300
    }

];

// document ready
$(document).ready(function() {


    loadTrips();
    

});

// ------------------------------------------------------------------------------
// Trips Page

function loadTrips () {
    for(let i = 0; i < tripsArray.length; i++){
        const trip = tripsArray[i];

        $("#tripContainer").append($("#tripTemplate").html());

        let currentChild = $("#tripContainer").children().eq(i+1);

        $(currentChild).find(".img-round").attr('src', 'assets/' + trip.image);
        $(currentChild).find("#destinationText").text(trip.destination);
        $(currentChild).find("#departureText").text('Departing from ' + trip.departure);
        $(currentChild).find("#returnText").text('Returning to ' + trip.return);
        $(currentChild).find("#durationText").text(trip.duration);  
        $(currentChild).find("#dateText").text(trip.date);      
        $(currentChild).find("#codeText").text(trip.code);
        $(currentChild).find("#costText").text('R' + trip.cost + '.00');
       
        $(currentChild).find(".buy-btn").hide();
    }
};


// When card is clicked show button
$("#tripContainer").on('click', '#trips', function(){
    $(this).find(".buy-btn").toggle();
})