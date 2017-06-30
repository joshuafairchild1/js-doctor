const apiKey = require('./../.env').apiKey;

class DoctorFinder {
  ailmentSearch(ailment, displayFn) {
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query= ${ailment}+&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=${apiKey}`)
      .catch(error => console.log(error))
      .then(response => {
        console.log(response);
        const doctors = response.data;

        doctors.forEach(doctor => {
          const profile = doctor.profile;
          const location = doctor.practices[0].visit_address;
          const edu = doctor.educations[0] || {school: 'data not found'};   //to handle the occasion of doctor.educations having a length of 0
          const doctorName = `${profile.first_name} ${profile.last_name}, ${profile.title}`;
          const address = `${location.street}, ${location.city} ${location.state} ${location.zip}`;
          const url = profile.image_url;
          const almaMater = edu.school;
          const bio = profile.bio;
          const docInfo = {
            doctor_name: doctorName,
            address: address,
            imgUrl: url,
            school: almaMater,
            bio: bio
          };

          displayFn(docInfo);
        });
      });
  }
}

exports.doctorFinderModule = DoctorFinder;
