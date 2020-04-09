window.onload = () => {
    displayStores();
}


var map;
var markers = [];
var infoWindow;

function initMap() {
    var dhaka = {
        lat: 34.063380,
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: dhaka,
        zoom: 11,
        mapTypeId: 'roadmap',

    });
    showStoreMarkers();

}

function displayStores() {
    var storesHtml = '';

    for (var [index, store] of stores.entries()) {
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storesHtml += `
       
            <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">
                        ${phone}
                    </div>
                </div>

                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>

            </div>
        
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }

}


function showStoreMarkers() {
    for (var [index, store] of stores.entries()) {
        var latlng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]);
        var name = store["name"];
        var address = store["addressLines"][0];
        createMarker(latlng, name, address, index + 1);
    }

}


function createMarker(latlng, name, address, index) {
    var html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
        map: map,
        position: latlng
    });
    // google.maps.event.addListener(marker, 'click', function() {
    //   infoWindow.setContent(html);
    //   infoWindow.open(map, marker);
    // });
    markers.push(marker);
}