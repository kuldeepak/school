apos.define("google-maps-widgets", {
  extend: "apostrophe-widgets",
  construct: function(self, options) {
    self.play = function($widget, data, options) {
      function initialize() {
        var myLatLng = new google.maps.LatLng(
            Number(data.lat),
            Number(data.long)
          ),
          myOptions = {
            zoom: 17,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          },
          map = new google.maps.Map(document.getElementById("map"), myOptions),
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map
          });

        marker.setMap(map);
        moveMarker(map, marker);
      }

      function moveMarker(map, marker) {
        //delayed so you can see it move
        setTimeout(function() {
          marker.setPosition(
            new google.maps.LatLng(Number(data.lat), Number(data.long))
          );
          map.panTo(
            new google.maps.LatLng(Number(data.lat), Number(data.long))
          );
        }, 1500);
      }

      initialize();
    };
  }
});
