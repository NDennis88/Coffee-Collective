
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBbRGkTQqynMteWZM9dIr26SsIblxOYe94",
    authDomain: "coffeecollective.firebaseapp.com",
    databaseURL: "https://coffeecollective.firebaseio.com",
    projectId: "coffeecollective",
    storageBucket: "",
    messagingSenderId: "391262478514"
};
var GoogleCustomSearchJSON_API_key = "AIzaSyCKKAaR9MblJ2MBOk7Ek2Wzr0iYZAtCf6Y";
var coffeeShopListItem = {
    name: '',
    streetAddress: '',
    addressLocality: '',
    postalCode: ''
};
var coffeeShopListItems = [];
var firstNames = ['Dave', 'Sandra', 'Michelle', 'Day', 'Neda', 'Nai-Mu', 'Robert',
                 'Alice', 'Susan', 'Nancy', 'Allen', 'Francis', 'William', 'Gail',
                'Betty', 'Steve', 'Richard', 'Paul', 'Charles', 'John', 'Jeanne'];
var lastNames = ['Jones', 'Wang', 'Choi', 'Davis', 'Brooks', 'Johnson', 'Lu',
                'Martinez', 'Cramer', 'Pence', 'Trump', 'Obama', 'Martin', 'Thomas',
                'Jackson', 'Stinson', 'Pearl', 'Rodriquez', 'Sanchez', 'Bingamon', 'Kraft'];
var ratings = ['0 (none)', '1 (minimal)', '2 (adequate)', '3 (excellent)'];

var SacramentoAreaZipCodes = [
                            // 95843, 95864, 95825, 95821, 95608,
                            // 95610, 95621, 95638, 95615, 95757,
                            // 95758, 95624, 95626, 95628, 95828,
                            // 95630, 95842, 95632, 95639, 95641,
                            // 95655, 95652, 95841, 95660, 95662,
                            // 95827, 95742, 95670, 95683, 95673,
                            95826, 95680, 95837, 95816, 95819,
                            95811, 95814, 95832, 95817, 95835,
                            95833, 95820, 95838, 95824, 95818,
                            95834, 95815, 95831, 95822, 95823,
                            95829, 95830, 95690, 95693];
var coffeeShop = {
    name: 'my coffee shop',
    address: '1234 Park Ave',
    zipCode: '95674',
    coffeShopReviews: []
}                
var coffeeShopReview = {
    reviewerUsername: 'Mary Allen',
    reviewerEmail: 'mallen@gmail.com',
    shopName: 'Falcon Coffee',
    shopAddress: '12345 South North Street',
    categoryRatings: {
        wifi: 'slow',
        powerOutlets: 'some',
        food: 'none',
        alternativeBeverages: 'teas',
        spaceForMeetings: 'none',
        parking: 'private parking'
    }
}
var displayCount;
var queryCount;
var totalQueries;

firebase.initializeApp(config);
var database = firebase.database();
$('#add-review-button').attr("disabled", "disabled");
initializeReviewFormDropdowns();
function initializeReviewFormDropdowns() {
    // This function forces the dropdowns in the review form to effectively have no 
    //  initial value. We do this to validate user inputs before allowing them to
    // submit the review, i.e., they must have explicitly selected a value for each of 
    // of the 
    $("#food-rating").prop("selectedIndex", -1);
    $("#parking-rating").prop("selectedIndex", -1);
    $("#power-outlets-rating").prop("selectedIndex", -1);
    $("#meeting-space-rating").prop("selectedIndex", -1);
    $("#wifi-rating").prop("selectedIndex", -1);
    $("#beverage-alternative-rating").prop("selectedIndex", -1);
    $("#food-rating").prop("selectedIndex", -1);
    $("#overall-rating").prop("selectedIndex", -1);
}
// $(document).ready(function(){
//     $("button").click(function(){
//       $.getJSON("demo_ajax_json.js", function(result){
//         $.each(result, function(i, field){
//           $("div").append(field + " ");
//         });
//       });
//     });
//   });
var $customerReviewsTable = $("#customer-reviews-table");
// $.getJSON('coffeShopReview.json', function(data) {
//     var coffeShopReviewData = "";
//     $customerReviewsTable.empty();
//     $each(data, function(key, value) {
//         coffeShopReviewData += "<tr>";
//         coffeShopReviewData += "<td>" + value.coffeeShopName + "</td>";
//         coffeShopReviewData += "<td>" + value.coffeeShopAdress + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category1 + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category2 + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category3 + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category4 + "</td>";
//         coffeShopReviewData += "<td>" + value.Rating_category5 + "</td>";
//         coffeShopReviewData += "</tr>";
//     }); 
//     $customerReviewsTable.append(coffeShopReviewData);
// });

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
// // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
// });

//  populate the list of coffee shops in the database
var markers = {
    longitude: [100, 200, 300],
    latitude: [30, 40, 50],
    storeNames: ['store A', 'store B', 'store C']
}
database.ref('Markers').set(markers);

database.ref('Markers').on("value", function(snapshot) {
    // alert('Markers update');
    markers = snapshot.val();
    console.log(markers);
    for (i=0;i<markers.length;i++) {
        consolelog('Latitude=', markers[i].coords.lat);
        consolelog('Longitude=', markers[i].coords.lng);
        consolelog('Content=', markers[i].content);
    }
});

database.ref().on("value", function(snapshot) {
    event.preventDefault();
    var $coffeeShopsList = $('#coffee-shops');
    var $coffeeShopZipCodesList = $('#coffee-shop-zipcode');
    var keys = Object.keys(snapshot.val());
    var data = snapshot.val();
    for (i=0;i<keys.length;i++) {
        console.log(keys[i]);
        $coffeeShopsList.append($('<option></option>').val(keys[i]).html(keys[i]));
    } 
    var zipCodes = [];
    snapshot.forEach(function(childElement) {
        var data = childElement.val();
        childElement.forEach(function(thisData) {
            var dataPoint = thisData.val()
            console.log('childElement =', dataPoint.reviewerEmail);
            console.log('childElement =', dataPoint.shopName);
            console.log('childElement =', dataPoint.shopZipcode);
            zipCodes.push(dataPoint.shopZipcode);
        });
    });
    // Remove duplicates from zip code list and display list of unique zip codes
    zipCodes.sort();
    var uniqueZipCodes = [];
    uniqueZipCodes.push(zipCodes[0]);
    for (i=0;i<zipCodes.length-1;i++) {
        if (zipCodes[i+1]!=zipCodes[i]) {
            uniqueZipCodes.push(zipCodes[i+1]);
        }
    }
    for (i=0;i<uniqueZipCodes.length;i++) {
        $coffeeShopZipCodesList.append($('<option></option>').val(uniqueZipCodes[i]).html(uniqueZipCodes[i]));
    }

    // });
    // });
    populateCoffeeShopFields();
});
function populateCoffeeShopFields() {
    var selectedElement = $("#coffee-shops").find(":selected").text();
    var components = selectedElement.split('_');
    console.log(components);
    $("#coffee-shop-name").val(components[0]);
    $("#coffee-shop-address").val(components[1]);
}

$("#coffee-shops").on('change', function() {
    populateCoffeeShopFields();
});
$('#get-reviews-button').on('click', function() {
    var avgRatings = {
        wifi: [0, 0],
        powerOutlets: [0, 0],
        food: [0, 0],
        alternativeBeverages: [0, 0],
        spaceForMeetings: [0, 0],
        parking: [0, 0],
        avg_wifi: 0,
        avg_powerOutlets: 0,
        avg_food: 0,
        avg_alternativeBeverages: 0,
        avg_spaceForMeetings: 0,
        avg_parking: 0,
    }
    event.preventDefault();
    $reviews = $('#reviews');
    $reviews.empty();
    var key = $('#coffee-shop-name').val() + "_" + $('#coffee-shop-address').val();
    database.ref(key).on("value", function(snapshot) {
        event.preventDefault();
        var reviews = [];
        var elements = [];
        var $reviewDivs = [];
        snapshot.forEach(function(data) {
            reviews.push(data);
        });
        $reviews.append("Number of reviews=" + reviews.length);
        for (i=0;i<reviews.length;i++) {
            $reviewDivs.push($('<div id="review-details"></div>'));
            // var $newDiv = $('<div id="review-details"></div>');
            $reviewDivs[i].append('<p>Reviewer name=' + reviews[i].child('reviewerUsername').val() +
                ' Reviewer email=' + reviews[i].child('reviewerEmail').val() + '</p>');
            // wifi
            $reviewDivs[i].append('<p>Wifi rating=' + 
                reviews[i].child('categoryRatings').child('wifi').val() + '</p>');
            elements = reviews[i].child('categoryRatings').child('wifi').val().split(' ');
            avgRatings.wifi[0] += Number(elements[0]);
            avgRatings.wifi[1] += 1;
    
            // power outlets
            $reviewDivs[i].append('<p>Power outlets rating=' + 
                reviews[i].child('categoryRatings').child('powerOutlets').val() + '</p>');
            elements = reviews[i].child('categoryRatings').child('powerOutlets').val().split(' ');
            avgRatings.powerOutlets[0] += Number(elements[0]);
            avgRatings.powerOutlets[1] += 1;

            // food
            $reviewDivs[i].append('<p>Food rating=' + 
                reviews[i].child('categoryRatings').child('food').val() + '</p>');
            elements = reviews[i].child('categoryRatings').child('food').val().split(' ');
            avgRatings.food[0] += Number(elements[0]);
            avgRatings.food[1] += 1;

            // alternative beverages
            $reviewDivs[i].append('<p>Alternative beverages rating=' + 
                reviews[i].child('categoryRatings').child('alternativeBeverages').val() + '</p>');
            elements = reviews[i].child('categoryRatings').child('alternativeBeverages').val().split(' ');
            avgRatings.alternativeBeverages[0] += Number(elements[0]);
            avgRatings.alternativeBeverages[1] += 1;

            // space for meetings
            $reviewDivs[i].append('<p>Space for meetings rating=' + 
                reviews[i].child('categoryRatings').child('spaceForMeetings').val() + '</p>');
            elements = reviews[i].child('categoryRatings').child('spaceForMeetings').val().split(' ');
            avgRatings.spaceForMeetings[0] += Number(elements[0]);
            avgRatings.spaceForMeetings[1] += 1;

            // parking
            $reviewDivs[i].append('<p>Parking rating=' + 
                reviews[i].child('categoryRatings').child('parking').val() + '</p>');
            elements = reviews[i].child('categoryRatings').child('parking').val().split(' ');
            avgRatings.parking[0] += Number(elements[0]);
            avgRatings.parking[1] += 1;
            // $reviews.append($newDiv);
        }
        avgRatings.avg_wifi = avgRatings.wifi[0]/avgRatings.wifi[1];
        avgRatings.avg_food = avgRatings.food[0]/avgRatings.food[1];
        avgRatings.avg_parking = avgRatings.parking[0]/avgRatings.parking[1];
        avgRatings.avg_powerOutlets = avgRatings.powerOutlets[0]/avgRatings.powerOutlets[1];
        avgRatings.avg_spaceForMeetings = avgRatings.spaceForMeetings[0]/avgRatings.spaceForMeetings[1];
        avgRatings.avg_alternativeBeverages = avgRatings.alternativeBeverages[0]/avgRatings.alternativeBeverages[1];
        $avgRatingsDiv = $('<div id="avg-ratings"></div>');
        $avgRatingsDiv.append('<h3>Average Ratings</h>');
        $avgRatingsDiv.append('Wifi=' + avgRatings.avg_wifi.toFixed(2) + '<br>')
        $avgRatingsDiv.append('Food=' + avgRatings.avg_food.toFixed(2) + '<br>')
        $avgRatingsDiv.append('Power outlets=' + avgRatings.avg_powerOutlets.toFixed(2) + '<br>')
        $avgRatingsDiv.append('Parking=' + avgRatings.avg_parking.toFixed(2) + '<br>')
        $avgRatingsDiv.append('Meeting spaces=' + avgRatings.avg_spaceForMeetings.toFixed(2) + '<br>')
        $reviews.append($avgRatingsDiv);
        for (i=0;i<$reviewDivs.length;i++)
            $reviews.append($reviewDivs[i]);
    });
});
$("#hide-show-button").on('click', function() {
    if ($('#my-form').is(':visible')) {
        // alert("Hiding form");
        $('#my-form').hide();
    } else {
        // alert("Showing form");
        $('#my-form').show();
    }
});
$("#add-review-button").on('click', function(){
    pushCoffeeShopReviewToDatabase($("#coffee-shop-name").val(),
                                    $("#coffee-shop-address").val(),
                                    $("#coffee-shop-zipcode").val(),
                                    $("#reviewers-name").val(),
                                    $("#reviewers-email").val(),
                                    $("#food-rating").val(),
                                    $("#parking-rating").val(),
                                    $("#power-outlets-rating").val(),
                                    $("#meeting-space-rating").val(),
                                    $("#wifi-rating").val(),
                                    $("#beverage-alternative-rating").val());
});
$("#my-form :input").change(function() {
    var disable=false;
    $('#my-form').find('select').each(function(){ 
        if ($(this).prop('selectedIndex')==-1) {
            disable=true;
        }
    });
    if (disable) {
        $('#add-review-button').attr("disabled", "disabled");
    } else {
        $('#add-review-button').removeAttr("disabled");
    }
  });

  $('#generate-dummy-data-button').on('click', executeAJAXzipCodeQueries);

function generateDummyData() {
    var reviewerUsername;
    var reviewerEmail;
    var foodRating;
    var parkingRating;
    var powerOutletsRating;
    var spaceForMeetingsRating
    var wifiRating;
    var alternativeBeveragesRating;
    var firstNameIndex;
    var lastNameIndex;

    for (var i=0;i<coffeeShopListItems.length;i++) {
        firstNameIndex = Math.floor(Math.random() * firstNames.length);
        lastNameIndex = Math.floor(Math.random() * lastNames.length);
        reviewerUsername = firstNames[firstNameIndex] + " " + lastNames[lastNameIndex];
        reviewerEmail = lastNames[lastNameIndex] + "@gmail.com";
        foodRating = ratings[Math.floor(Math.random() * ratings.length)];
        parkingRating = ratings[Math.floor(Math.random() * ratings.length)];
        powerOutletsRating = ratings[Math.floor(Math.random() * ratings.length)];
        spaceForMeetingsRating = ratings[Math.floor(Math.random() * ratings.length)]
        wifiRating = ratings[Math.floor(Math.random() * ratings.length)];
        alternativeBeveragesRating = ratings[Math.floor(Math.random() * ratings.length)];
        pushCoffeeShopReviewToDatabase(coffeeShopListItems[i].name, 
                                        coffeeShopListItems[i].streetAddress, 
                                        coffeeShopListItems[i].postalCode,
                                        reviewerUsername,
                                        reviewerEmail,
                                        foodRating,
                                        parkingRating,
                                        powerOutletsRating,
                                        spaceForMeetingsRating,
                                        wifiRating,
                                        alternativeBeveragesRating);
    }
    alert('Successfully generated dummy review for ' + coffeeShopListItems.length + ' coffee shops');
}
function pushCoffeeShopReviewToDatabase(shopName, 
                                        shopAddress, 
                                        shopZipcode,
                                        reviewerUsername,
                                        reviewerEmail,
                                        foodRating,
                                        parkingRating,
                                        powerOutletsRating,
                                        spaceForMeetingsRating,
                                        wifiRating,
                                        alternativeBeveragesRating) 
{
    coffeeShopReview.shopName = shopName;
    coffeeShopReview.shopAddress = shopAddress;
    coffeeShopReview.shopZipcode = shopZipcode;
    coffeeShopReview.reviewerUsername = reviewerUsername;
    coffeeShopReview.reviewerEmail = reviewerEmail;
    alert('pushCoffeeShopReviewToDatabase: Pushing data for shop=' + shopName);
    coffeeShopReview.categoryRatings.food = foodRating;
    coffeeShopReview.categoryRatings.parking = parkingRating;
    coffeeShopReview.categoryRatings.powerOutlets = powerOutletsRating;
    coffeeShopReview.categoryRatings.spaceForMeetings = spaceForMeetingsRating;
    coffeeShopReview.categoryRatings.wifi = wifiRating;
    coffeeShopReview.categoryRatings.alternativeBeverages = alternativeBeveragesRating;
    var key = coffeeShopReview.shopName + '_' + coffeeShopReview.shopAddress;
    database.ref(key).push(coffeeShopReview);
    // alert('pushCoffeeShopReviewToDatabase: Database updated');
}
function executeAJAXzipCodeQueries() {
    var NedasAPIkey = "AIzaSyBqPdf_mEV6S3Q4dL6Y2Rg8EBsH-Oi2RUA";
    var startCount = 1;
    var queryURL;
    var APIkey = GoogleCustomSearchJSON_API_key;
    displayCount = 0;
    queryCount = 0;
    totalQueries = SacramentoAreaZipCodes.length;
    coffeeShopListItems = [];
    for (i=0;i<SacramentoAreaZipCodes.length;i++)
    {
        queryURL = "https://www.googleapis.com/customsearch/v1?key=" + APIkey + "&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + 
            SacramentoAreaZipCodes[i] + "&start=" + startCount;
        // alert('Generating dummy data');
        getShopsData(queryURL);
        // alert("Number of shops found at zip code=" + SacramentoAreaZipCodes[i] + "=" + coffeeShopListItems.length);
    }
  }
  function AJAXqueryComplete() {
    //   alert('Completed AJAX query #' + queryCount);
  }
  $( document ).ajaxComplete(function() {
    AJAXqueryComplete();
  });
  function getShopsData(queryURL){
    $.ajax({
      url: queryURL,
      method: "GET" 
    }).then(function(response) {
        console.log(response);
        // alert("Response");
        queryCount++;
        for (var i = 0; i< response.items.length; i++){
            if (response.items[i].pagemap.localbusiness === undefined || 
                response.items[i].pagemap.review === undefined ||
                response.items[i].title.includes("CLOSED")){
                console.log("not valid - response.items.length=" + response.items.length + " item=" + i);           
            }
            else{
                console.log(response.items[i].pagemap.localbusiness[0].name);
                displayCount++;
                var newObject = {};
                newObject.name = response.items[i].pagemap.localbusiness[0].name;
                newObject.streetAddress = response.items[i].pagemap.postaladdress[0].streetaddress;
                newObject.addresslocality = response.items[i].pagemap.postaladdress[0].addresslocality;
                newObject.postalCode = response.items[i].pagemap.postaladdress[0].postalcode;
                // alert('Adding shop=' + coffeeShopListItem.name);
                coffeeShopListItems.push(newObject);
                for (j=0;j<coffeeShopListItems.length;j++) 
                {
                    // alert(coffeeShopListItems[j].name);
                }
                console.log(coffeeShopListItems);
            }
        }
        if (totalQueries == queryCount) {
            // alert("Last query completed"); 
            generateDummyData(); 
        }                
    });
};
//________________________________________________
//  event handlers for writing and reading reviews
$('.write-review').on('click', function() {
});

$('.submit-reviews').on('click', function() {
    var key = $(this).attr('id');
});





