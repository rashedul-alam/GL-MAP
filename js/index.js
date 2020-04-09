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
    infoWindow = new google.maps.InfoWindow();
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
    var bounds = new google.maps.LatLngBounds();
    for (var [index, store] of stores.entries()) {
        var latlng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]);
        var name = store["name"];
        var address = store["addressLines"][0];
        var phone = store["phoneNumber"];
        var open = store["openStatusText"];
        bounds.extend(latlng);
        createMarker(latlng, name, open, address, phone, index + 1);
    }
    map.fitBounds(bounds);

}


function createMarker(latlng, name, open, address, phone, index) {
    // var html = "<b>" + name + "</b> <br/>" + open + "</b> <br/><hr>" + address + "</b> <br/>" + phone;
    var html = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';
    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        label: index.toString()
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}