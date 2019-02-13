

///Google search API format
//var url = "https://www.googleapis.com/customsearch/v1?key=" + API + "&cx=017576662512468239146:omuauf_lfve&q=lectures";
//var APINeda = "AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo";
//var APIDay = "AIzaSyBqPdf_mEV6S3Q4dL6Y2Rg8EBsH-Oi2RUA";
//https://www.googleapis.com/customsearch/v1?key=AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo&cx=000232087639553296774:quobpehcgrs&q=coffee
//var cx = "000232087639553296774:quobpehcgrs"
//var api = "AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo";

// (function() {
//     var cx = '000232087639553296774:quobpehcgrs';
//     var gcse = document.createElement('script');
//     gcse.type = 'text/javascript';
//     gcse.async = true;
//     gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(gcse, s);
//   })();

$(document).ready(function (){
   //$('select').css("display","inline");
   //$('select').formSelect();
   

   var zipToSearch = "";
   var startCount = 1;
   var displayCount = 0;
   var markers = [];

   var SacZipCodes = [95605, 95691,95822, 95831, 95831, 95833, 95834, 95835, 95836, 95837, 95811, 95814, 95816,
    95630, 95816, 95819, 95816, 95817, 95819, 95811, 95814, 95628, 95610, 95621, 95608, 95815, 95821, 95825, 95841, 95864];
 
//   var SacZipCodes = [95843,95864,95825,95821,95608,95610,95621,95638,95615,95757,
//                                 95758,95624,95626,95628,95828,95630,95842,95632,95639,95641,
//                                 95655,95652,95841,95660,95662,95827,95742,95670,95683,95673,95826,95680,95837,
//                                 95816,95819,95811,95814,95832,95817,95835,95833,95820,95838,95824,95818,95834,
//                                 95815,95831,95822,95823,95829,95830,95690,95693];

                                

function renderZips(array){

    for (var i=0; i<array.length; i++){
        var zip = $("<option>");
        zip.attr("value", i+1);
        zip.text(array[i]);
        $("#zips").append(zip);
        $('select').formSelect();
    }
};

renderZips(SacZipCodes);

$('select').on('change', function() {
    zipToSearch = ( $(this).find(":selected").text() );
    console.log(zipToSearch);
    renderShops();
});
 
//var mapQuestURL = "http://open.mapquestapi.com/geocoding/v1/address?key=mqSsiVGOlUXWSCAUYjt39mqdAEeF6Gld&location=" + address;   
//var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCzWcFRZ96DbvJn7-Mkf0qkFmnPUIcn5gY&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
      
 
function renderShops(){

console.log(zipToSearch);

var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCzWcFRZ96DbvJn7-Mkf0qkFmnPUIcn5gY&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
    $.ajax({
      url: queryURL,
      method: "GET",
      
    }).then(function(response) {
        console.log(queryURL);
        console.log(response);

        for (var i = 0; i< response.items.length; i++){
            if (response.items[i].pagemap.localbusiness === undefined || 
                response.items[i].pagemap.postaladdress[0].addressregion !== "CA" ||
                response.items[i].pagemap.postaladdress[0].postalcode !== zipToSearch ||
                response.items[i].pagemap.review === undefined ||
                response.items[i].title.includes("CLOSED")){
                console.log("not valid");
            
            }
            else{
                displayCount++;
                generateLatLong(response.items[i]);

                //renderDiv(response.items[i]);

            }        
        }
      
                console.log(displayCount);

                if (displayCount < 10){
                    console.log("leo is here")
                    startCount+=10;
                    queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCzWcFRZ96DbvJn7-Mkf0qkFmnPUIcn5gY&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
                    console.log(queryURL);
                    console.log(startCount);
                    renderShops();
                }
                else if (displayCount >= 10){
                    console.log(markers);
                }

               
    });
    

};



$("#button").on("click", function(){
    $(".card-small").remove();
    displayCount =0;
    startCount+=10;
    queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyCzWcFRZ96DbvJn7-Mkf0qkFmnPUIcn5gY&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zipToSearch + "&start=" + startCount;
    console.log("button clicked");
    console.log(startCount);
    console.log(queryURL);
    markers = [];
    renderShops();
});


function generateLatLong(item){
    var mapLocation = (item.pagemap.postaladdress[0].streetaddress + ","+
                    item.pagemap.postaladdress[0].addresslocality + ",CA");
    var address = mapLocation;
    var addressObj = {
        lat: "",
        lng: ""
    };
    console.log(address);
    var mapQuestURL = "http://open.mapquestapi.com/geocoding/v1/address?key=mqSsiVGOlUXWSCAUYjt39mqdAEeF6Gld&location=" + address; 
    $.ajax({
        url: mapQuestURL,
        method: "GET",
        
      }).then(function(response) {

        console.log('lat long generated');
        addressObj.lat = (response.results[0].locations[0].latLng.lat);
        addressObj.lng = (response.results[0].locations[0].latLng.lng);

        console.log('lat, long', addressObj);

        markers.push({
            coords:{lat:addressObj.lat, lng:addressObj.lng},
            content:"<h1>" + item.pagemap.localbusiness[0].name + "</h1>"
          });
        renderDiv(item, addressObj);


        
        //   console.log("LAT" + latitude);
        //   console.log("LNG" + long);


      });

      return addressObj;
}


function renderDiv(item, addressObj) {
    console.log(item.pagemap.localbusiness[0].name);
    //displayCount++;

    var makeGrid = $("<div>");
    makeGrid.addClass("col s12 m7");
    $(".container").append(makeGrid);

    var makeCard = $("<div>");
    makeCard.addClass("card horizontal card-small");
    makeGrid.append(makeCard);

    var makeImgDiv = $("<div>");
    makeImgDiv.addClass("card-image");
    makeCard.append(makeImgDiv);

    var makeImg = $("<img>");
    makeImg.attr("src", item.pagemap.review[0].image_url);
    makeImgDiv.append(makeImg);

    var makeDivStacked = $("<div>");
    makeDivStacked.addClass("card-stacked");
    makeCard.append(makeDivStacked);

    var makeCardContent = $("<div>");
    makeCardContent.addClass("card-content");
    makeCardContent.append("<h5>"+item.pagemap.localbusiness[0].name + "</h5> <br>");
    makeCardContent.append("<p>"+item.pagemap.postaladdress[0].streetaddress + "</p>");
    makeCardContent.append("<p>"+item.pagemap.postaladdress[0].addresslocality + "</p>");
    makeCardContent.append("<p>"+item.pagemap.postaladdress[0].postalcode + "</p>");

    //get lat and long
    //var mapLocation = (item.pagemap.postaladdress[0].streetaddress + ","+
                    //item.pagemap.postaladdress[0].addresslocality + ",CA");

    //generateLatLong(mapLocation);

    
//******** Peter this is pushing to the array  *************/
    // markers.push({
    //     coords:{lat:addressObj.lat, lng:addressObj.lng},
    //     content:"<h1>" + item.pagemap.localbusiness[0].name + "</h1>"
    //   });

      //console.log(markers);
    //     {
    //       coords:{lat:addressObj.lat, lng:addressObj.lng},
    //       content:"<h1>" + item.pagemap.localbusiness[0].name + "</h1>"
    //     },
    //     {
    //       coords:{lat:38.5750, lng:-121.4843},
    //       content:'<h1>Old Soul Co.</h1>'
    //     },
    //     {
    //       coords:{lat:38.7442, lng:-121.2876}
    //     }
    //   ];

    makeCardContent.append("<p>"+addressObj.lat+ "</p>")
    makeCardContent.append("<p>"+addressObj.lng+ "</p>")

    
    makeDivStacked.append(makeCardContent);

    var makeCardAction = $("<div>");
    makeCardAction.addClass("card-action");

    //could do buttons instead of link??////
    var formLink = $("<a>");
    formLink.attr("href", "#");
    formLink.addClass("write-review");
    formLink.text("Submit a Review Please!")

    var showReview = $("<a>");
    showReview.addClass("show-reviews");
    showReview.attr("id", item.pagemap.localbusiness[0].name + "_"+item.pagemap.postaladdress[0].streetaddress)
    showReview.attr("href", "#");

    showReview.text("Display reviews");
    makeCardAction.append(formLink, showReview);
    makeDivStacked.append(makeCardAction);
}
//console.log(markers);

});

    
    