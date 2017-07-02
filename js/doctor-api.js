const apiKey = require('./../.env').apiKey;
const Doctor = require('./../js/doctor.js').doctorModule;
const MapApi = require('./../js/map-api.js').mapApiModule;

class DoctorFinder {
  ailmentSearch(ailment, zip, displayFn, displayErr) {
    const googMaps = new MapApi();
    googMaps.geoCodeAddress(zip)
      .catch(error => console.log(error))
      .then(response => {
        const lat = response[0].geometry.location.lat();
        const lng = response[0].geometry.location.lng();

        $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query= ${ailment}+&location=${lat}%2C${lng}%2C%205&user_location=${lat}%2C${lng}&skip=0&limit=20&user_key=${apiKey}`)
        .catch(error => console.log(error))
        .then(response => {
          response.data.length || displayErr();

          const doctors = response.data;
          doctors.forEach(doctor => {
            const location = doctor.practices[0].visit_address;
            const latLng = {lat: doctor.practices[0].lat, lng: doctor.practices[0].lon};
            const edu = doctor.educations[0] || {school: 'no data available'};//to handle the occasion of doctor.educations having a length of 0
            const doctorName = `${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}`;
            const address = `${location.street}, ${location.city} ${location.state} ${location.zip}`;
            const url = doctor.profile.image_url;
            const almaMater = edu.school;
            const bio = doctor.profile.bio;
            const newDoctor = new Doctor(doctorName, address, url, almaMater, bio);
            displayFn(newDoctor);
            googMaps.addMarker(latLng);
          });
        });
      });
  }
}

exports.doctorFinderModule = DoctorFinder;
