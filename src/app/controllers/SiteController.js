const Course = require("../models/Course");
const { mutipleMongooesToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("home", { courses: mutipleMongooesToObject(courses) });
      })
      .catch(next);

    // res.render("home");
  }

  // [Get] / search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
