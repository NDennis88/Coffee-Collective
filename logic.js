

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

 var zip = "95816";
 var startCount = 1;
 var displayCount = 0;
  var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBqPdf_mEV6S3Q4dL6Y2Rg8EBsH-Oi2RUA&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zip + "&start=" + startCount;
 
function renderShops(){


    $.ajax({
      url: queryURL,
      method: "GET",
      
    }).then(function(response) {
        console.log(response);

        for (var i = 0; i< response.items.length; i++){
            if (response.items[i].pagemap.localbusiness === undefined || 
                response.items[i].pagemap.review === undefined ||
                response.items[i].title.includes("CLOSED")){
                console.log("not valid");
            
            }
            else{
                console.log(response.items[i].pagemap.localbusiness[0].name);
                displayCount++;

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
                makeImg.attr("src", response.items[i].pagemap.review[0].image_url);
                makeImgDiv.append(makeImg);

                var makeDivStacked = $("<div>");
                makeDivStacked.addClass("card-stacked");
                makeCard.append(makeDivStacked);

                var makeCardContent = $("<div>");
                makeCardContent.addClass("card-content");
                makeCardContent.append("<h5>"+response.items[i].pagemap.localbusiness[0].name + "</h5> <br>");
                makeCardContent.append("<p>"+response.items[i].pagemap.postaladdress[0].streetaddress + "</p>");
                makeCardContent.append("<p>"+response.items[i].pagemap.postaladdress[0].addresslocality + "</p>");
                makeCardContent.append("<p>"+response.items[i].pagemap.postaladdress[0].postalcode + "</p>");
                
                makeDivStacked.append(makeCardContent);

                var makeCardAction = $("<div>");
                makeCardAction.addClass("card-action");

                //could do buttons instead of link??////
                var formLink = $("<a>");
                formLink.attr("href", "#");
                formLink.text("Submit a Review Please!")
                var showReview = $("<a>");
                showReview.attr("href", "#");
                showReview.text("Display reviews");
                makeCardAction.append(formLink, showReview);
                makeDivStacked.append(makeCardAction);

            }        
        }
      
                console.log(displayCount);
                if (displayCount < 10){
                    console.log("leo is here")
                    startCount+=10;
                    queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBqPdf_mEV6S3Q4dL6Y2Rg8EBsH-Oi2RUA&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zip + "&start=" + startCount;
                    console.log(queryURL);
                    console.log(startCount);
                    renderShops();
                }

               
    });
    

};
renderShops();


$("#button").on("click", function(){
    $(".card-small").remove();
    startCount+=10;
    queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBqPdf_mEV6S3Q4dL6Y2Rg8EBsH-Oi2RUA&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zip + "&start=" + startCount;
    console.log("button clicked");
    console.log(startCount);
    console.log(queryURL);
    renderShops();
});


//how to handle async ajax call....this gets run before data is obtained....

//  if (displayCount< 10){
//      startCount+=10;
//      console.log(startCount);
//      queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=" + zip + "&start=" + startCount;
//      console.log(queryURL);
     //renderShops();



    
    