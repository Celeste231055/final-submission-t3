
// --------------------------------------------------------------------------
// Trips Array

const tripsArray = [
    {
        image: "valletta.jpg",
        destination: "Valletta",
        departure: "Cape Town",
        return: "Cape Town",
        duration: "5 days",
        date: "15 Sep - 20 Sep",
        code: "Tw2-91Rs0",
        cost: 1920,
        filterDuration: "short",
        filterDestination: "single",
        roundTrip: "round trip",
        special: "special offer",
        closestDate: "2023-09-15"
    },
    {
        image: "istanbul.jpg",
        destination: "Istanbul - Antalya",
        departure: "Cape Town",
        return: "Durban",
        duration: "12 days",
        date: "18 Sep - 30 Sep",
        code: "TP-93PS0",
        cost: 5600,
        filterDuration: "long",
        filterDestination: "multi",
        roundTrip: "no",
        special: "no",
        closestDate: "2023-09-18"
    },
    {
        image: "casablanca.jpg",
        destination: "Casablanca",
        departure: "Cape Town",
        return: "Cape Town",
        duration: "7 days",
        date: "20 Sep - 27 Sep",
        code: "T2s-9LS0",
        cost: 3000,
        filterDuration: "short",
        filterDestination: "single",
        roundTrip: "round trip",
        special: "special offer",
        closestDate: "2023-09-20"
    },
    {
        image: "mykonos.jpg",
        destination: "Mykonos",
        departure: "Durban",
        return: "Mykonos",
        duration: "9 days",
        date: "1 Oct - 10 Oct",
        code: "TR03-D60",
        cost: 4500,
        filterDuration: "long",
        filterDestination: "single",
        roundTrip: "no",
        special: "no",
        closestDate: "2023-10-01"
    },
    {
        image: "valencia.jpg",
        destination: "Valencia - Palma",
        departure: "Cape Town",
        return: "Cape Town",
        duration: "10 days",
        date: "25 Sep - 5 Oct",
        code: "RS-40S0",
        cost: 5300,
        filterDuration: "long",
        filterDestination: "multi",
        roundTrip: "round trip",
        special: "no",
        closestDate: "2023-09-25"
    }

];

const weatherArray = [
    {
        weatherImage: "valletta.jpg",
        city: "Valletta"
    },
    {
        weatherImage: "istanbul.jpg",
        city: "Istanbul"
    },
    {
        weatherImage: "casablanca.jpg",
        city: "Casablanca"
    },
    {
        weatherImage: "mykonos.jpg",
        city: "Mykonos"
    },
    {
        weatherImage: "valencia.jpg",
        city: "Valencia"
    }
];


let appliedFilter = "";
let appliedSort = "low to high";

// document ready
$(document).ready(function() {


    filterSortTrips(tripsArray);
    loadWeather();

    

});

// ------------------------------------------------------------------------------
// Homepage Weather Cards

function loadWeather (){

    for(let i = 0; i < weatherArray.length; i++){
        const weather = weatherArray[i];
        
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + weather.city +"&appid=2e69876c9344bbafe48bcf1b99faf2b1",
            success: function(data){
                temp = data
                console.log(data);
            }
          }).done(function(){
            $(currentWeather).find("#minMaxTemp").text(Math.round(temp.main.temp_min-273) + "°C | " + Math.round(temp.main.temp_max-273) + "°C");
            $(currentWeather).find("#weatherState").text(temp.weather[0].main);
            $(currentWeather).find("#humidity").text("Humidity: " + temp.main.humidity + "%");
          })

        $("#weatherContainer").append($("#weatherTemplate").html());

        let currentWeather = $("#weatherContainer").children().eq(i+2);
        
        $(currentWeather).find("#weatherImg").attr('src', 'assets/' + weather.weatherImage);
        $(currentWeather).find("#weatherCity").text(weather.city);
        
    };
};
console


// ------------------------------------------------------------------------------
// Trips Page

function loadTrips (showTrips) {

    $("#tripContainer").empty();
    
    for(let i = 0; i < showTrips.length; i++){
        const trip = showTrips[i];


        $("#tripContainer").append($("#tripTemplate").html());

        let currentChild = $("#tripContainer").children().eq(i);

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

// When filter or sort is selected
$(".tripFilter").click(function(){
    appliedFilter = $(this).attr('value');
    filterSortTrips();
});

$(".tripSort").click(function(){
    appliedSort = $(this).attr('value');
    filterSortTrips();
});

function filterSortTrips () {
    let filterSortArray = [];

    if(appliedFilter == "short", "long"){
        filterSortArray = tripsArray.filter(trip => trip.filterDuration == appliedFilter);
        
    } 
    if (appliedFilter == "single"){
        filterSortArray = tripsArray.filter(trip => trip.filterDestination == appliedFilter);
        
    }
    if (appliedFilter == "multi"){
        filterSortArray = tripsArray.filter(trip => trip.filterDestination == appliedFilter);
        
    }
    if(appliedFilter == "round trip"){
        filterSortArray = tripsArray.filter(trip => trip.roundTrip == appliedFilter);
    }
    if(appliedFilter == "special offer"){
        filterSortArray = tripsArray.filter(trip => trip.special == appliedFilter);
    }
    if (appliedFilter == "") {
        filterSortArray = tripsArray;
    }
    
    if(appliedSort == "low to high") {
    
        filterSortArray = filterSortArray.sort((a, b) => {
        return a.cost - b.cost;
        }); 

    } else if (appliedSort == "high to low") {

        filterSortArray = filterSortArray.sort((a, b) => {
        return b.cost - a.cost;
         });

    } else if (appliedSort == "closest departure") {
        
        filterSortArray = filterSortArray.sort((a, b) => {
          let da = new Date (a.closestDate);
          let db = new Date (b.closestDate);
          return da - db;
        });

    } else if (appliedSort == "a to z") {
        FilterSortArray = filterSortArray.sort((a, b) => {
            if (a.destination < b.destination) { return -1;}
            if (a.destination > b.destination) { return 1; }
            return 0;
        });
    } else if (appliedSort == "z to a") {
        FilterSortArray = filterSortArray.sort((a, b) => {
            if (a.destination > b.destination) { return -1;}
            if (a.destination < b.destination) { return 1; }
            return 0;
        });
    }
    
      loadTrips(filterSortArray);

};





// When card is clicked show button
$("#tripContainer").on('click', '#trips', function(){
    $(this).find(".buy-btn").toggle();
})