const DoctorFinder = require('./../js/doctor-api.js').doctorFinderModule;

const displayDoctor = info => {
  $("#doctors").append(`<div class="doctor well">
                          <h3>${info.doctor_name} at ${info.address}</h3>
                          <div class='img text-center'>
                            <img class='doctor-img' src="${info.imgUrl}">
                          </div>
                          <h3>Graduated from: ${info.school}</h3>
                          <p>Bio: ${info.bio}<p>
                        </div>`);
};

$(() => {
  const doctorFinder = new DoctorFinder();

  $("#ailment-form").submit(ev => {
    ev.preventDefault();
    $("#doctors").empty();
    const ailment = $("#ailment-input").val();
    doctorFinder.ailmentSearch(ailment, displayDoctor);
  });
});
