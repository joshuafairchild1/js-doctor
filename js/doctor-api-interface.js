const DoctorFinder = require('./../js/doctor-api.js').doctorFinderModule;

const displayDoctor = (doctor, address) => $("#doctors").append(`<li>${doctor} at ${address}</li>`);

$(() => {
  const doctorFinder = new DoctorFinder();

  $("#ailment-form").submit(ev => {
    ev.preventDefault();
    $("#doctors").empty();
    const ailment = $("#ailment-input").val();
    doctorFinder.ailmentSearch(ailment, displayDoctor);
  });
});
