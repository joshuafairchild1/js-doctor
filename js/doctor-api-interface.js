const DoctorFinder = require('./../js/doctor-api.js').doctorFinderModule;

$(() => {
  const doctorFinder = new DoctorFinder();

  $("#ailment-form").submit(ev => {
    ev.preventDefault();
    const ailment = $("#ailment-input").val();
    doctorFinder.ailmentSearch(ailment);
  });
});
