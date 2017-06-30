const apiKey = require('./../.env').apiKey;

class DoctorFinder {
  ailmentSearch(ailment) {
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query= ${ailment}+&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=${apiKey}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
}

exports.doctorFinderModule = DoctorFinder;
