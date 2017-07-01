class Doctor {
  constructor(name, address, img, school, bio) {
    this.name = name;
    this.address = address;
    this.imgUrl = img;
    this.school = school;
    this.bio = bio;
  }
}

exports.doctorModule = Doctor;
