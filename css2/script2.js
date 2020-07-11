// ---- VARIABLES ---- //
const menuIcon = document.querySelector('.hamburger-menu');
const navbar= document.querySelector('.navbar');
let currentYelpObj;
let latitude;
let longitude;
let currentInd;
var apiKey ="AIzaSyDMTbiZBhMhP9h1zIfI3PWius0RL6YRBSU"
let currentSavedObj
const yStars = {
    0: 'css2/yelp_stars/small_0.png', 
    1: 'css2/yelp_stars/small_1_half.png', 
    1.5: 'css2/yelp_stars/small_1_half.png', 
    2: 'css2/yelp_stars/small_2.png', 
    2.5: 'css2/yelp_stars/small_2_half.png',
    3: 'css2/yelp_stars/small_3.png',
    3.5: 'css2/yelp_stars/small_3_half.png',
    4: 'css2/yelp_stars/small_4.png',
    4.5: 'css2/yelp_stars/small_4_half.png',
    5: 'css2/yelp_stars/small_5.png'
};

// --- EVENT HANDLERS --- //
//triggers hiding home btns and showing map and yelp info
$(document).on("click", ".home-btns", (event) => {
    homeBtnClick(event);
    populateSavedPlaces();
})

//triggers left/right arrow functionality
$(".arrow").on("click", (event) => {
    clickLR(event);
});

//gets user lat / lng on doc load
$(document).on("load", getPosition());

//toggles side navbar
menuIcon.addEventListener('click',() =>{
    navbar.classList.toggle("change");
});
$("#heart").on("click", () => {
    storeCurrent(currentInd);
    populateSavedPlaces();
});

// ---- FUNCTIONS ---- //

// --- User interaction functions --- ///

//event function to trigger Drink/Eat based on click event
function homeBtnClick(event) {
    if ( event.target.alt === "Drink Button" ) {
        yelpDrink(latitude, longitude);
        weather(latitude, longitude);
    } else if ( event.target.alt === "Food Button" ) {
        yelpEat(latitude, longitude);
        weather(latitude, longitude);
    } else {
        //exception handler here
    }
};

//hides the homebtns and shows the map + placeholders at index 0 
function toggleMapBox() {
    $(".home-btns").toggle();
    $(".placeholder-div").toggle();
    currentInd = Math.floor(Math.random() * 50);
    switchYelp(currentInd);
};

//event function to handle left and right arrow clicks to scroll through the yelpObj. Populates placeholder divs and updates the placeholder google map
function clickLR(event) {
    if (event.target.classList.contains("leftarrow")) {
        console.log(currentYelpObj);
        if ( currentInd === 0 ) {
            console.log(currentInd);
            currentInd = (currentYelpObj.businesses.length) - 1;
            switchYelp(currentInd);
            initMap(currentYelpObj.businesses[currentInd].coordinates.latitude, currentYelpObj.businesses[currentInd].coordinates.longitude);
        } else {
            console.log(currentInd);
            currentInd --;
            switchYelp(currentInd);
            initMap(currentYelpObj.businesses[currentInd].coordinates.latitude, currentYelpObj.businesses[currentInd].coordinates.longitude);
        }
    } else if (event.target.classList.contains("rightarrow")) {
        if ( currentInd === (currentYelpObj.businesses.length) - 1 ) {
            console.log(currentInd);
            currentInd = 0;
            switchYelp(currentInd);
            initMap(currentYelpObj.businesses[currentInd].coordinates.latitude, currentYelpObj.businesses[currentInd].coordinates.longitude);
        } else {
            console.log(currentInd);
            //initMap(currentYelpObj.businesses[currentInd].coordinates.latitude, currentYelpObj.businesses[currentInd].coordinates.longitude);
            currentInd ++;
            switchYelp(currentInd);
            initMap(currentYelpObj.businesses[currentInd].coordinates.latitude, currentYelpObj.businesses[currentInd].coordinates.longitude);
        }
    }
//     //there are some weird index errors we need to fix here but it works fine enough for now
 };
// -- API functions -- //
function weather(latitude, longitude) {
    var dateTime = moment().format('dddd, MMMM Do YYYY');
    var apiKey = "0ec949b8b13f2ad5d8653cd84a541bde";
    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var cityName = response.name;
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        console.log(response);
        $("#weather-div").css("display", "inherit");
        $("#city-name").text(cityName + " ").append(img)
        $("#date").text(dateTime);
        $("#temp").text("Temperature (F): " + tempF.toFixed(1));
    })
}
//runs yelpAPI by passing in lat & lng with the search term bar. Saves the object to currentYelpObj
function yelpDrink(latitude, longitude) {
        var queryUrl = "https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?term=bar&limit=50&latitude=" + latitude + "&longitude=" + longitude;
        $.ajax({
            url: queryUrl,
            method: "GET",
            headers: {
                "Authorization": "Bearer A2gkx232mzI-cg0iezpecL7BJ6qGJOALp7cfxPNUTKIg_sAzW7cuxFtI-jxDx96erLsBjITw4erG5AuyOIqSvcZerhdQxYAPcn-IW7Eg9Isd9SQ3dEBemMObOdcHX3Yx",
            }
        }).then(function(response) {
            currentYelpObj = response;
            initMap();
            toggleMapBox();
        }).then(() => {
            initMap(currentYelpObj.businesses[currentInd].coordinates.latitude, currentYelpObj.businesses[currentInd].coordinates.longitude)
        });
};
//runs yelpAPI by passing in lat & lng with the search term restaurant. Saves the object to currentYelpObj
function yelpEat(latitude, longitude) {
        var queryUrl = "https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?term=restaurant&limit=50&latitude=" + latitude + "&longitude=" + longitude
        $.ajax({
            url: queryUrl,
            method: "GET", 
            headers: {
                "Authorization": "Bearer A2gkx232mzI-cg0iezpecL7BJ6qGJOALp7cfxPNUTKIg_sAzW7cuxFtI-jxDx96erLsBjITw4erG5AuyOIqSvcZerhdQxYAPcn-IW7Eg9Isd9SQ3dEBemMObOdcHX3Yx",
            }
        }).then(function(response) {
            currentYelpObj = response;
            initMap();
            toggleMapBox();
        }).then(() => {
            initMap(currentYelpObj.businesses[currentInd].coordinates.latitude, currentYelpObj.businesses[currentInd].coordinates.longitude)
        });
};
//gets user coordinates
function getPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log(showPosition)
    }; 
      function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + " " +
        "Longitude: " + position.coords.longitude);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    };
};
function storeCurrent(ind) {
    let oldItems= JSON.parse(localStorage.getItem('saved-obj')) || []
    let saveObj = {
        yelpBusiness: currentYelpObj.businesses[ind].name,
        yelpType: currentYelpObj.businesses[ind].categories[0].title,
        yelpRating: currentYelpObj.businesses[ind].rating,
        yelpDist: (currentYelpObj.businesses[ind].distance).toFixed(0),
        yelpLat: currentYelpObj.businesses[ind].coordinates.latitude,
        yelpLng: currentYelpObj.businesses[ind].coordinates.longitude,
        yelpLink: currentYelpObj.businesses[ind].url
    }
    oldItems.push(saveObj);
    localStorage.setItem('saved-obj', JSON.stringify(oldItems))
};
// --- DOM functions --- //
//updates all of the placeholder divs with new yelp info (triggered from left/right arrows)
function switchYelp(ind) {
    $("#business").text(currentYelpObj.businesses[ind].name)
    $("#type").text(currentYelpObj.businesses[ind].categories[0].title)
    $("#rating").text(currentYelpObj.businesses[ind].rating + " out of 5")
    $("#distance").text((currentYelpObj.businesses[ind].distance/1609).toFixed(2) + " mi away")
};

//renders map
function initMap(lat, lng) {
    mapURL = "https://maps.google.com/maps?q=" + lat + "," + lng + "&z=17&output=embed&key=" + apiKey;
    mapDiv = $('<iframe>').width("100%").height("600px").attr("src", mapURL).attr("id", "map-view");
    $('#map-view').remove()
    $('#map-div').prepend(mapDiv);
    $('#map-view').html(mapURL);
};

//populates saved places from local storage
function populateSavedPlaces() {
    if ( localStorage.getItem('saved-obj') ) {
        $("#saved-places").empty()
        $("#saved-places").html("<ul id='saved-places-list'><ul>")
        currentSavedObj = JSON.parse(localStorage.getItem('saved-obj'))
        for ( i = 0; i < currentSavedObj.length; i++ ) {
            yelpStars(currentSavedObj[i].yelpRating)
            let addListItem = $("<li>").attr("class", "saved-places-list-item").attr("href", `${currentSavedObj}`)
            let addListItemInner = 
            `<h5>${currentSavedObj[i].yelpBusiness}</h5>
            <img src=${yelpStars(currentSavedObj[i].yelpRating)} class="yelp-star-image" alt="yelp star image">
            <p>${currentSavedObj[i].yelpType}</p>
            <p>${currentSavedObj[i].yelpBusiness} is ${(currentSavedObj[i].yelpDist/1609).toFixed(2)} miles from you!</p> 
            </li>`
        //<img src="${yelpStars(currentSavedObj[i].yelpRating)} alt="yelp star img">
            addListItem.html(addListItemInner)
            $("#saved-places-list").prepend(addListItem)
        };
    };
};

//toggles like button
function changeLikeButton() {
    console.log('change called')
    $("#heart").click(function () {
        if ( $("#like-button").attr("src", "css2/whiteheart.png") )
            $("#like-button").attr("src", "css2/redheart.png");
        else
            $("#like-button").attr("src", "css/whiteheart.png");
    });
};
//resets like button
function resetLikeButton() {
    console.log('reset called')
    $(".arrow").click(function() {
        if ($("#like-button").attr("src", "css2/redheart.png"))
            $("#like-button").attr("src", "css2/whiteheart.png");
        else
        $("#like-button").attr("src", "css/redheart.png");
    });
};

//adds yelp stars to the saved items div
function yelpStars(rating) {
    for (const [key, value] of Object.entries(yStars)) {
        starString = rating.toString()
            if (starString === key) {
                console.log([value][0])
                return [value][0]
        };
    };
};


/* TO DO */
// Consolidate yelp functions into one
// Get Coords on page open so were not waiting on yelp functions
// Update updateMap function