let orderArray = [];
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
        description: "A short, single destination cruise to Valletta, Malta.",
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
        description: "This 12 day Turkey cruise will stop in Istanbul and Antalya.",
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
        duration: "3 days",
        date: "20 Sep - 23 Sep",
        code: "T2s-9LS0",
        cost: 3000,
        description: "Welcome to Casablanca the 'White House' in the dessert.",
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
        description: "Travel to one of the most famous places in Greece.",
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
        description: "This Italian cruise is perfect the cooler autumn months.",
        filterDuration: "long",
        filterDestination: "multi",
        roundTrip: "round trip",
        special: "no",
        closestDate: "2023-09-25"
        
    }

];

let appliedFilter = "";
let appliedSort = "low to high";

// document ready
$(document).ready(function() {


    filterSortTrips(tripsArray);
    loadWeather();

    //when document loads replace the text after a delay of 2sec (so that you can ready the previous text)
    setTimeout(function() {
        //Fade in and out 
        $("#changeText").fadeOut(500, function() {
          $(this).text('Welcome to your cruise').fadeIn(500);
        });
          
   }, 2000);

    
   
});

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
        $(currentChild).find("#descriptionText").text(trip.description);
        
       
        $(currentChild).find(".buy-btn").hide();
        $(currentChild).find("#descriptionText").hide();

    

    }
};

// When card is clicked show button
$("#tripContainer").on('click', '.card', function(){
    

    $(this).find(".trips").toggleClass('activeTrip');
    $(this).find(".buy-btn").toggle();
    $(this).find("#departureText").toggle();
    $(this).find("#returnText").toggle();
    $(this).find("#descriptionText").toggle();

    let tripDestination = $(this).find("#destinationText").text();
    let tripCost = $(this).find("#costText").text();
    let tripCode =$(this).find("#codeText").text();
    
    orderArray.push({
        destination: tripDestination,
        totalCost: tripCost,
        code: tripCode,
         
    })

    console.log(orderArray)

});



// -----------------------------------------------------------------------------------------------------------------------
// Sorting and filtering

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

let arr = ["apple", "mango", "apple",
          "orange", "mango", "mango"];
  

// -----------------------------------------------------------------------------------------------------------------------
checkout = () => {
    
    let tripData = JSON.stringify(orderArray);
    localStorage.setItem('order', tripData);
    window.location.href = '../checkout.html';

}
//Logo changes when hovered on
$(".logoDefault").hover(function(){
    $(this).attr("src", '../assets/' + "horizon-logo-hover.jpg");
    },
    function() { 
    $(this).attr('src', '../assets/' +'horizon-logo-default.jpg'); 
    } 
);
   