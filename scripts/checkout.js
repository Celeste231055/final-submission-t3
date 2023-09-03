$(document).ready(function() {


    loadCart();

    
   
});




let total = 0;
function loadCart () {

    //get array from local storage
    let tripData = JSON.parse(localStorage.getItem('order'));
    
    
    for(let i = 0; i < tripData.length; i++){
        let cartItem = tripData[i];
        let cartCost = tripData[i].totalCost;
       

        
        $("#cartContainer").append($("#cartTemplate").html());

        let currentChild = $("#cartContainer").children().eq(i+1);

        
        $(currentChild).find("#destinationCart").text(cartItem.destination);
        $(currentChild).find("#codeCart").text(cartItem.code);
        $(currentChild).find("#costCart").text(cartItem.totalCost);
        
        
        
        let costNum = cartCost.replace(/R/g,'');
        let totalNum = parseInt(costNum); 
        total += totalNum;
        
    }
    
    //After cart items loaded and total is calculated display the total.
    $(".costDisplay").text('R' + total + '.00');

    //when btn clicked remove the item and find that item's cost and remove it from total. 
    $("#cartContainer").on('click', '#removeItem', function(){
  
        //remove the parent row of the current item.
        $(this).parent().remove();
        
        //find the current item's cost. Remove the text and turn it into a number
        let removedItemCost = $(this).parent().find("#costCart").text();
        let removedItemNum = parseInt(removedItemCost.replace(/R/g, ''));

        //then remove the item cost from the total.
        total -= removedItemNum;
        
        //display new total
        $(".costDisplay").text('R' + total + '.00');
        
      });

      $(".rowTwo").on('click', '#removeAll', function(){

        $(".rowOne").remove();

        total = 0;
        
        $(".costDisplay").text("R0.00");
        
      });

    
};

returnBack = () =>{
    localStorage.removeItem('order');
    window.location.href ='../index.html';
}

$(".checkout-btn").click(function(){
    alert("The payment was successful. Enjoy you cruise!");
    returnBack();
});

//Logo changes when hovered on
$(".logoDefault").hover(function(){
    $(this).attr("src", '../assets/' + "horizon-logo-hover.jpg");
    },
    function() { 
    $(this).attr('src', '../assets/' +'horizon-logo-default.jpg'); 
    } 
);
   
