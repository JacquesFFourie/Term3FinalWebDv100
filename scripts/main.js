// ------------------------------------------------------------------------
// Plants Array
// ------------------------------------------------------------------------

const arrPlants = [
  {
    name: "China To Japan",
    price: 1500,
    description: "Take a trip from the island of Japan to the beaches of China!",
    image: "08cfd33ef641d38397581cbeba5edef7.jpg",
    cruiseTime: "low",
    addedDate: "2023-03-25",
    origin: "Tokyo"
  },
  {
    name: "Tour de America",
    price: 6000,
    description: "Delicate and captivating, this rare succulent showcases a mesmerizing silver-white hue that gracefully adorns its petite, fleshy leaves.",
    image: "452b3e49d4e64e50b938f398e057de78.jpg",
    cruiseTime: "bright",
    addedDate: "2023-05-01",
    origin: "Florida"
  },
  {
    name: "Johannesburg to Capetown",
    price: 1000,
    description: "Boasting tall, sleek, and sword-like leaves, this botanical marvel adds a touch of modern flair to any setting.",
    image: "a673ca0733a5d876d1f55c3fe3edfea1.jpg",
    cruiseTime: "low",
    addedDate: "2023-07-04",
    origin: "Cape Town"
  },
  {
    name: "London to France",
    price: 1000,
    description: "With its lush, feather-like fronds and compact size, this indoor beauty makes a striking addition to any interior space.",
    image: "f832d54f5dc1f0681fc8b651e9037eed.jpg",
    cruiseTime: "low",
    addedDate: "2023-04-29",
    origin: "Pretoria"
  },
  {
    name: "North Japan to South Japan",
    price: 1200,
    description: "Known for its stunning foliage that transforms with the seasons, this ornamental tree captivates with its delicate, lacy leaves in vibrant shades of red, orange, or gold.",
    image: "bd1a6cc511bc54e60587c83f010d7aaa.jpg",
    cruiseTime: "bright",
    addedDate: "2023-05-10",
    origin: "Japan"
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

    filterSortPlants();

});

// ------------------------------------------------------------------------
// Load all plants
// ------------------------------------------------------------------------

function loadPlants(crouseToShow) {

  // Clear all elements inside the plants cards container

  $("#crouseContainer").empty();

  // Loop though plants

  for (let i = 0; i < crouseToShow.length; i++) {
    const plant = crouseToShow[i];
    
    console.log(plant.name);

    // Open weather API call for getting the temprature
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + plant.origin + "&appid=1734da151190ac7d50e318a7d39444f9",
      success: function (data) {
        tempData = data;
        console.log(tempData);
      },
    }).done(function () {

      // Set Temperature
      $(currentChild).find("#originTemp").text("Origin Temp: " + Math.round(tempData.main.temp- 273) + "°C");
     
    
    });

    // 1: Select the plants container add the plant card to it
    $("#crouseContainer").append($("#plantCardTemplate").html());

    // 2: Create a variable that contains the most recently added plant card
    let currentChild = $("#crouseContainer").children().eq(i);

    // 3: Set the content for the current plant card from the plant array
    $(currentChild).find("#nameText").text(plant.name);
    $(currentChild).find("#priceText").text("R" + plant.price);
    $(currentChild).find("#descriptionText").text(plant.description);
    $(currentChild).find(".card-img-top").attr('src','../Term3FinalWebDv100/assets/newAssets/' + plant.image);

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

  filterSortPlants();
});

$("input[name='sortRadio']").click(function(){
  appliedSort = $(this).attr('value');

  filterSortPlants();
});

function filterSortPlants() {
  
  let filteredSortedArrPlants = [];

  console.log(appliedFilter);
  console.log(appliedSort);

  // Filter Plants

  if (appliedFilter) {
    filteredSortedArrPlants = arrPlants.filter(plant => plant.cruiseTime == appliedFilter);
  } else {
    filteredSortedArrPlants = arrPlants;
  }

  // Sort Plants

  if (appliedSort == "low to high") {

    // Sort plants from the lowest to highest price
    filteredSortedArrPlants = filteredSortedArrPlants.sort((a, b) => {
      return a.price - b.price;
    });

  } else if (appliedSort == "date added") {

    // Sort plants from the newest to oldest
    filteredSortedArrPlants = filteredSortedArrPlants.sort((a, b) => {
      let da = new Date(a.addedDate);
      let db = new Date(b.addedDate);
    
      return db - da;
    });

  }

  console.log(filteredSortedArrPlants)

  loadPlants(filteredSortedArrPlants);

}

// ------------------------------------------------------------------------
// When a plant card is clicked
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