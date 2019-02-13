// Initialize firebase
var config = {
    apiKey: "AIzaSyBbRGkTQqynMteWZM9dIr26SsIblxOYe94",
    authDomain: "coffeecollective.firebaseapp.com",
    databaseURL: "https://coffeecollective.firebaseio.com",
    projectId: "coffeecollective",
    storageBucket: "",
    messagingSenderId: "391262478514"
};
firebase.initializeApp(config);

var database = firebase.database();

function initMap() {
        // New map
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:38.5816, lng:-121.4944},
          zoom: 10,
        // Removes Map and Satellite default options
          mapTypeControl: false,
        // Styles a map in Silver
          styles: [
            {
              "elementType": "geometry",
              "stylers": [{"color": "#f5f5f5"}]
            },
            {
              "elementType": "labels.icon",
              "stylers": [{"visibility": "off"}]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#616161"}]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [{"color": "#f5f5f5"}]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#bdbdbd"}]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [{"color": "#eeeeee"}]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#757575"}]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [{"color": "#e5e5e5"}]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#9e9e9e"}]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [{"color": "#ffffff"}]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#757575"}]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [{"color": "#dadada"}]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#616161"}]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#9e9e9e"}]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [{"color": "#e5e5e5"}]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [{"color": "#eeeeee"}]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{"color": "#c9c9c9"}]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [{"color": "#9e9e9e"}]
            }
          ]
        });
        // Listen for click on map
        google.maps.event.addListener(map, 'click', 
        function(event){
        // Add marker
          addMarker({coords:event.latLng});
        });
        var markers = [
            // {
            //   coords:{lat:38.5639, lng:-121.4724},
            //   content:'<h1>Temple Coffee</h1>'
            // },
            // {
            //   coords:{lat:38.5750, lng:-121.4843},
            //   content:'<h1>Old Soul Co.</h1>'
            // },
            // {
            //   coords:{lat:38.7442, lng:-121.2876}
            // }
          ];
      
          // Loop through markers
          for(var i = 0; i < markers.length; i++){
            addMarker(markers[i]);
          }
          
          database.ref('Markers').on("value", function(snapshot) {
            alert('Markers update');
            markers = snapshot.val();
            console.log(markers);
            for (i=0;i<markers.length;i++) {
                consolelog('Latitude=', markers[i].coords.lat);
                consolelog('Longitude=', markers[i].coords.lng);
                consolelog('Content=', markers[i].content);
            }
        });
      
            // Add Marker Function
            function addMarker(props){
              var marker = new google.maps.Marker({
                map:map,
                position:props.coords,
                draggable: true,
                animation: google.maps.Animation.DROP,
                // icon:props.iconImage
                icon: "images/Coffee Collective.png"
              });
      
            //   // Check for custom icon
            //   if(props.iconImage){
            //     // Set icon image
            //     marker.setIcon(props.iconImage);
            //   }
      
              // Check content
              if(props.content){
                var infoWindow = new google.maps.InfoWindow({
                content: props.content 
                });
      
                marker.addListener('click', function(){
                  infoWindow.open(map, marker);
                });
              }
            }


      }
