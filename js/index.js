window.onload = () => {

    displayStores();
    setOnClickListener();
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
    displayStores();
    showStoreMarkers();


}

function searchStore() {
    var zipCode = document.getElementById('zip-code-input').value;
    var foundStores = [];

    for (var store of stores) {
        var postal = store['address']['postalCode'].substring(0, 5);
        if (postal == zipCode) {
            foundStores.push(store);
        }
    }
    console.log(foundStores);
}



function setOnClickListener() {
    var storeElements = document.querySelectorAll('.store-container');
    console.log(storeElements);
    storeElements.forEach(function(elem, index) {
        console.log(index);
        elem.addEventListener('click', function() {
            new google.maps.event.trigger(markers[index], 'click');

        })
    })

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
    var html = `
     <div class="store-info-window">
        <div class="store-info-name">
            ${name}
        </div>
        <div class="store-info-status">
        ${open}
        </div>
        <div class="store-info-address">
            <div class="circle">
                <i class="fas fa-location-arrow"></i>
            </div>
            
            ${address}
        </div>
        <div class="store-info-phone">
            <div class="circle">
                <i class="fas fa-phone"></i>
            </div>
            
            ${phone}
        </div>
        

     </div>    
     `;

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