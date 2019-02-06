

///Google search API format
var url = "https://www.googleapis.com/customsearch/v1?key=" + API + "&cx=017576662512468239146:omuauf_lfve&q=lectures";
var API = "AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo";
//https://www.googleapis.com/customsearch/v1?key=AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo&cx=000232087639553296774:quobpehcgrs&q=coffee
var cx = "000232087639553296774:quobpehcgrs"


// (function() {
//     var cx = '000232087639553296774:quobpehcgrs';
//     var gcse = document.createElement('script');
//     gcse.type = 'text/javascript';
//     gcse.async = true;
//     gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(gcse, s);
//   })();


  var queryURL = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo&cx=000232087639553296774:quobpehcgrs&q=coffee&hq=95762";
 
      var api = "AIzaSyDC8Ls0IJZZAT9XBFjlvR3ErhtuzIPt5Vo"
    $.ajax({
      url: queryURL,
      method: "GET",
      
    }).then(function(response) {

      console.log(response);
      console.log(response.items.length);
     console.log(response.items[1].pagemap.localbusiness[0].name);
  console.log(response.items[1].pagemap.review[0].image_url);
      

      //$("#spot").html(response.items[0].htmlTitle);
      $("#spot").html(response.items[1].pagemap.localbusiness[0].name);
      $("#spot").addClass("hiiii");
      $("#rating").html(response.items[1].pagemap.review[0].ratingstars);
      
      $("#reviews").html(response.items[1].pagemap.review[0].ratingcount);
      $("#address").html(response.items[1].pagemap.postaladdress[0].streetaddress);
      
      //$("#image").addClass("hiiii");
      $("#image").attr("src", response.items[1].pagemap.review[0].image_url);
    });

    
    