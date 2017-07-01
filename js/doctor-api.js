const apiKey = require('./../.env').apiKey;
const Doctor = require('./../js/doctor.js').doctorModule;

class DoctorFinder {
  ailmentSearch(ailment, displayFn, displayErr) {
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query= ${ailment}+&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=${apiKey}`)
      .catch(error => console.log(error))

      .then(response => {
        response.data.length || displayErr();

        const doctors = response.data;

        doctors.forEach(doctor => {
          const location = doctor.practices[0].visit_address;
          const edu = doctor.educations[0] || {school: 'no data available'};//to handle the occasion of doctor.educations having a length of 0
          const doctorName = `${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}`;
          const address = `${location.street}, ${location.city} ${location.state} ${location.zip}`;
          const url = doctor.profile.image_url;
          const almaMater = edu.school;
          const bio = doctor.profile.bio;

          const newDoctor = new Doctor(doctorName, address, url, almaMater, bio);
          displayFn(newDoctor);
        });
      });
  }
}

exports.doctorFinderModule = DoctorFinder;
