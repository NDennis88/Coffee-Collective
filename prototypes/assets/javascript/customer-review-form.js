
// Initialize Firebase
var config = {
apiKey: "AIzaSyBbRGkTQqynMteWZM9dIr26SsIblxOYe94",
authDomain: "coffeecollective.firebaseapp.com",
databaseURL: "https://coffeecollective.firebaseio.com",
projectId: "coffeecollective",
storageBucket: "",
messagingSenderId: "391262478514"
};



var coffeeShopListItem = {
name: '',
address: '',
} 
var SacramentoAreaZipCodes = [95843,
                            95864,
                            95825,
                            95821,
                            95608,
                            95610,
                            95621,
                            95638,
                            95615,
                            95757,
                            95758,
                            95624,
                            95626,
                            95628,
                            95828,
                            95630,
                            95842,
                            95632,
                            95639,
                            95641,
                            95655,
                            95652,
                            95841,
                            95660,
                            95662,
                            95827,
                            95742,
                            95670,
                            95683,
                            95673,
                            95826,
                            95680,
                            95837,
                            95816,
                            95819,
                            95811,
                            95814,
                            95832,
                            95817,
                            95835,
                            95833,
                            95820,
                            95838,
                            95824,
                            95818,
                            95834,
                            95815,
                            95831,
                            95822,
                            95823,
                            95829,
                            95830,
                            95690,
                            95693];

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
firebase.initializeApp(config);
var database = firebase.database();
$('#add-review-button').attr("disabled", "disabled");
initializeReviewFormDropdowns();
function initializeReviewFormDropdowns() {
    // $("#coffee-shop-name").prop("selectedIndex", -1);
    // $("#coffee-shop-address").prop("selectedIndex", -1);
    // $("#coffee-shop-zipcode").prop("selectedIndex", -1);
    // $("#reviewers-name").prop("selectedIndex", -1);
    // $("#reviewers-email").prop("selectedIndex", -1);
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
var key = 'Under the Rainbow_555 Newton Place, Rancho Cordova, CA';
database.ref(key).on("value", function(snapshot) {
    var reviews = [];
    snapshot.forEach(function(data) {
        console.log(data.child('shopName').val());
        console.log(data.child('categories').val());
        reviews.push(data);
        // alert(data.key + " wifi=" + data.key.categoryRatings.wifi);
    });
    // for (i=0;i<reviews.length;i++) {
    //     alert("Wifi=" + reviews[i].child('categoryRatings').child('alternativeBeverages').val());
    // }
});
$("#hide-show-button").on('click', function() {
    if ($('#my-form').is(':visible')) {
        alert("Hiding form");
        $('#my-form').hide();
    } else {
        alert("Showing form");
        $('#my-form').show();
    }
});
$("#add-review-button").on('click', function(){
    // database.ref().push(coffeeShopReview);
    coffeeShopReview.shopName = $("#coffee-shop-name").val();
    coffeeShopReview.shopAddress = $("#coffee-shop-address").val();
    coffeeShopReview.shopZipcode = $("#coffee-shop-zipcode").val();
    coffeeShopReview.reviewerUsername = $("#reviewers-name").val();
    coffeeShopReview.reviewerEmail = $("#reviewers-email").val();
    coffeeShopReview.categoryRatings.food = $("#food-rating").val();
    coffeeShopReview.categoryRatings.parking = $("#parking-rating").val();
    coffeeShopReview.categoryRatings.powerOutlets = $("#power-outlets-rating").val();
    coffeeShopReview.categoryRatings.spaceForMeetings = $("#meeting-space-rating").val();
    coffeeShopReview.categoryRatings.wifi = $("#wifi-rating").val();
    coffeeShopReview.categoryRatings.alternativeBeverages = $("#beverage-alternative-rating").val();
    coffeeShopReview.categoryRatings.food = $("#food-rating").val();
    var key = coffeeShopReview.shopName + '_' + coffeeShopReview.shopAddress;
    database.ref(key).push(coffeeShopReview);
    // database.ref().push(coffeeShopReview);
    alert('Database updated');
});
// function validateInputs() {
//     alert("Howdy"); 
// }
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



