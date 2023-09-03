

const arrCruise = [
  {
    name: "China To Japan",
    price: 1500,
    description: "Take a trip from the island of Japan to the beaches of China!",
    image: "08cfd33ef641d38397581cbeba5edef7.jpg",
    cruiseTime: "low",
    addedDate: "2023-03-25",
    origin: "Tokyo",
    orderNum: "0"
  },
  {
    name: "Tour de America",
    price: 6000,
    description: "Take a trip around all of America!!",
    image: "452b3e49d4e64e50b938f398e057de78.jpg",
    cruiseTime: "bright",
    addedDate: "2023-05-01",
    origin: "Florida",
    orderNum: "1"
  },
  {
    name: "Johannesburg to Capetown",
    price: 1000,
    description: "Take a trip from Johannesburg to CapeTown!",
    image: "a673ca0733a5d876d1f55c3fe3edfea1.jpg",
    cruiseTime: "low",
    addedDate: "2023-07-04",
    origin: "Cape Town",
    orderNum: "2"
  },
  {
    name: "London to France",
    price: 1000,
    description: "Take a trip from London to France!",
    image: "f832d54f5dc1f0681fc8b651e9037eed.jpg",
    cruiseTime: "low",
    addedDate: "2023-04-29",
    origin: "Pretoria",
    orderNum: "3"
  },
  {
    name: "North Japan to South Japan",
    price: 1200,
    description: "See everything there is to see of Japan by going from the most norhten point to the most southern point",
    image: "bd1a6cc511bc54e60587c83f010d7aaa.jpg",
    cruiseTime: "bright",
    addedDate: "2023-05-10",
    origin: "Japan",
    orderNum: "4"
  },
];

let appliedFilter = "";
let appliedSort = "date added";

// ------------------------------------------------------------------------
// When the document loads
// ------------------------------------------------------------------------

$(document).ready(function(){

    console.log("Hello");

    // ------------------------------------------------------------------
    // Home

    // When the document loads, animate the hero image upwards
    $("#hero-image").animate({top: '-=100px'});

    // ------------------------------------------------------------------
    // Browse

    filterSortCruises();

});

// ------------------------------------------------------------------------
// Load all cruises
// ------------------------------------------------------------------------

function loadCruises(crouseToShow) {

  // Clear all elements inside the cruises cards container

  $("#crouseContainer").empty();

  // Loop though cruises

  for (let i = 0; i < crouseToShow.length; i++) {
    const cruise = crouseToShow[i];
    
    console.log(cruise.name);

    // Open weather API call for getting the temprature
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + cruise.origin + "&appid=1734da151190ac7d50e318a7d39444f9",
      success: function (data) {
        tempData = data;
        console.log(tempData);
      },
    }).done(function () {

      // Set Temperature
      $(currentChild).find("#originTemp").text("Origin Temp: " + Math.round(tempData.main.temp- 273) + "°C");
     
    
    });

    // 1: Select the cruises container add the cruise card to it
    $("#crouseContainer").append($("#cruiseCardTemplate").html());

    // 2: Create a variable that contains the most recently added cruise card
    let currentChild = $("#crouseContainer").children().eq(i);

    // 3: Set the content for the current cruise card from the cruise array
    $(currentChild).find("#nameText").text(cruise.name);
    $(currentChild).find("#priceText").text("R" + cruise.price);
    $(currentChild).find("#descriptionText").text(cruise.description);
    $(currentChild).find(".card-img-top").attr('src','../Term3FinalWebDv100/assets/newAssets/' + cruise.image);

    // 4: Hide the description text from the curent card
    $(currentChild).find("#descriptionText").hide();
    $(currentChild).find("#originTemp").hide();

  };

};

// ------------------------------------------------------------------------
// When a filter or sort option is clicked
// ------------------------------------------------------------------------

$("input[name='filterRadio']").click(function(){
  appliedFilter = $(this).attr('value');

  filterSortCruises();
});

$("input[name='sortRadio']").click(function(){
  appliedSort = $(this).attr('value');

  filterSortCruises();
});

function filterSortCruises() {
  
  let filteredSortedArrCruise = [];

  console.log(appliedFilter);
  console.log(appliedSort);

  // Filter cruises

  if (appliedFilter) {
    filteredSortedArrCruise = arrCruise.filter(cruise => cruise.cruiseTime == appliedFilter);
  } else {
    filteredSortedArrCruise = arrCruise;
  }

  // Sort cruises

  if (appliedSort == "low to high") {

    // Sort cruises from the lowest to highest price
    filteredSortedArrCruise = filteredSortedArrCruise.sort((a, b) => {
      return a.price - b.price;
    });

  } else if (appliedSort == "date added") {

    // Sort cruises from the newest to oldest
    filteredSortedArrCruise = filteredSortedArrCruise.sort((a, b) => {
      let da = new Date(a.addedDate);
      let db = new Date(b.addedDate);
    
      return db - da;
    });

  }

  console.log(filteredSortedArrCruise)

  loadCruises(filteredSortedArrCruise);

}

// ------------------------------------------------------------------------
// When a cruise card is clicked
// ------------------------------------------------------------------------

$("#crouseContainer").on('click','.card', function() {

  // Toggle the price & description text
  $(this).find("#priceText").toggle();
  $(this).find("#descriptionText").toggle();
  $(this).find("#originTemp").toggle();

  // Resize the image to fit the additional content
  $(this).find(".card-img-top").toggleClass("small");

});



$(document).ready(function(){
  var $newTemp = $("#temp");
  
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=1734da151190ac7d50e318a7d39444f9",
    success: function (data) {
      temp = data;
      console.log(temp);
    },
  }).done(function () {
    // Set Temperature
    $newTemp.html(temp.main.temp- 277 + " &degC");
  
  });

  var $newTempTwo = $("#tempTwo");
  
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=1734da151190ac7d50e318a7d39444f9",
    success: function (data) {
      temp = data;
      console.log(temp);
    },
  }).done(function () {
    // Set Temperature
    $newTempTwo.html(temp.main.temp- 277 + " &degC");
  
  });

})
let cruiseOrderInfo = [];
makeCruise = () =>{
  cruiseOrderInfo.push(  {
    name: "China To Japan",
    price: 1500,
    description: "Take a trip from the island of Japan to the beaches of China!",
    image: "08cfd33ef641d38397581cbeba5edef7.jpg",
    cruiseTime: "low",
    addedDate: "2023-03-25",
    origin: "Tokyo",
    orderNum: "0"
  },
  {
    name: "Tour de America",
    price: 6000,
    description: "Delicate and captivating, this rare succulent showcases a mesmerizing silver-white hue that gracefully adorns its petite, fleshy leaves.",
    image: "452b3e49d4e64e50b938f398e057de78.jpg",
    cruiseTime: "bright",
    addedDate: "2023-05-01",
    origin: "Florida",
    orderNum: "1"
  })
}

checkout = () =>{
  let data = JSON.stringify(cruiseOrderInfo)
  localStorage.setItem('order', data)
  window.location.href = "../Term3FinalWebDv100/cart.html"
}