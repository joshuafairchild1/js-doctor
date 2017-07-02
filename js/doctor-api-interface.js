const DoctorFinder = require('./../js/doctor-api.js').doctorFinderModule;

const displayError = () => $("#doctors").append('<h3 class="text-center">Your search yielded zero results.</h3>');

const displayDoctor = doctor => {
  $("#doctors").append(`<div class="doctor well">
                          <h3>${doctor.name} at ${doctor.address}</h3>
                          <div class='img text-center'>
                            <img class='doctor-img' src="${doctor.imgUrl}">
                          </div>
                          <h3>Graduated from: ${doctor.school}</h3>
                          <p>Bio: ${doctor.bio}<p>
                        </div>`);
};

$(() => {
  const doctorFinder = new DoctorFinder();

  $("#ailment-form").submit(ev => {
    ev.preventDefault();
    const ailment = $("#ailment-input").val();
    const userZip = $("#zip-input").val();
    $("#doctors").empty();
    doctorFinder.ailmentSearch(ailment, userZip, displayDoctor, displayError);
  });
});
