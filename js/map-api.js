class MapApi {
  constructor() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {
        lat: 45.52,
        lng: -122.6
      }
    });
  }

  //this method returns a promise, allowing .then() to be called so that the resulting Lng/Lat can be accessed. (the point of this to allow the geocoding process to be a reusable standalone method)
  geoCodeAddress(zip) {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve,reject) => {
      geocoder.geocode({'address': zip}, (results, status) => {
        status == 'OK' ? resolve(results) : reject(status);
      });
    });
  }

  addMarker(latLngObj, doctor) {
    const lat = latLngObj.lat;
    const lng = latLngObj.lng;
    const marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: this.map
    });

    this.addInfoWindow(doctor, marker);
  }

  addInfoWindow(doctor, mapMarker) {
    const contentString = `<div class="doctor well">
                            <h3>${doctor.name} at ${doctor.address}</h3>
                            <div class='img text-center'>
                            <img class='doctor-img' src="${doctor.imgUrl}">
                            </div>
                            <h3>Graduated from: ${doctor.school}</h3>
                            <p>Bio: ${doctor.bio}<p>
                          </div>`;

    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    mapMarker.addListener('click', function() {
      infowindow.open(this.map, mapMarker);
    });
  }
}

exports.mapApiModule = MapApi;
