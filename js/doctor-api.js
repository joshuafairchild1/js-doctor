const apiKey = require('./../.env').apiKey;

class DoctorFinder {
  ailmentSearch(ailment, displayFn) {
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query= ${ailment}+&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=${apiKey}`)
      .then(response => {
        console.log(response);
        const doctors = response.data;
        doctors.forEach(doctor => {
          const profile = doctor.profile;
          const location = doctor.practices[0].visit_address;
          const doctorName = `${profile.first_name} ${profile.last_name}, ${profile.title}`;
          const address = `${location.street}, ${location.city} ${location.state} ${location.zip}`;
          displayFn(doctorName, address);
        });
      })
      .catch(error => console.log(error));
  }
}

exports.doctorFinderModule = DoctorFinder;
