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

  addMarker(latLngObj) {
    const lat = latLngObj.lat;
    const lng = latLngObj.lng;
    const marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: this.map
    });
  }
}

exports.mapApiModule = MapApi;
