const menuIcon = document.querySelector
('.hamburger-menu');
const navbar= document.querySelector('.navbar');

menuIcon.addEventListener('click',() =>{
    navbar.classList.toggle("change");
});

function yelpDrink() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log(showPosition)
      } 
      function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + " " +
        "Longitude: " + position.coords.longitude);
        
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var queryUrl = "https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?term=bar&latitude=" + latitude + "&longitude=" + longitude

        $.ajax({
            url: queryUrl,
            method: "GET",
            headers: {
                "Authorization": "Bearer onVbl7k5cpGLZGH64zpFqN58hJoywsYCQdA1MeVe9Ef-M3hxHzaGB3ORpNWfMA7S3ux-c1tMVy5r51Qq34xLirIogtuifiIcT9RFeJzWj-23_UZctLUMbD4jqsP3XnYx",
            }
        }).then(function(response) {
            console.log(response)
        })
      }
}

function yelpEat() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log(showPosition)
      } 
      function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + " " +
        "Longitude: " + position.coords.longitude);
        
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var queryUrl = "https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?term=restaurant&latitude=" + latitude + "&longitude=" + longitude

        $.ajax({
            url: queryUrl,
            method: "GET",
            headers: {
                "Authorization": "Bearer onVbl7k5cpGLZGH64zpFqN58hJoywsYCQdA1MeVe9Ef-M3hxHzaGB3ORpNWfMA7S3ux-c1tMVy5r51Qq34xLirIogtuifiIcT9RFeJzWj-23_UZctLUMbD4jqsP3XnYx",
            }
        }).then(function(response) {
            console.log(response)
        })
      }
}

$(document).on("click", "#food-btn", yelpEat);
$(document).on("click", "#drink-btn", yelpDrink);