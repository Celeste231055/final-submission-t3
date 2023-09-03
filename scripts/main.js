


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




// document ready
$(document).ready(function() {

    loadWeather();

    //when document loads replace the text after a delay of 2sec (so that you can ready the previous text)
    setTimeout(function() {
        //Fade in and out 
        $("#changeText").fadeOut(500, function() {
          $(this).text('Welcome to your cruise Celeste').fadeIn(500);
        });
          
   }, 2000);

    
   
});

// ------------------------------------------------------------------------------
// Weather Cards

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

//Logo changes when hovered on
$(".logoDefault").hover(function(){
    $(this).attr("src", '../assets/' + "horizon-logo-hover.jpg");
    },
    function() { 
    $(this).attr('src', '../assets/' +'horizon-logo-default.jpg'); 
    } 
);
   

