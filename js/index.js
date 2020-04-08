function initMap() {
    var dhaka = {
        lat: 23.8103,
        lng: 90.4125
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: dhaka,
        zoom: 11,
        mapTypeId: 'roadmap',

    });

}