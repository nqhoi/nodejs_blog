const Course = require("../models/Course");
const { mutipleMongooesToObject } = require("../../util/mongoose");

class MeController {
   // [GET] /me/stored/courses
   storedCourses(req, res, next) {
      Promise.all([
         Course.find({}).sorttable(req),
         Course.countDocumentsDeleted(),
      ])
         .then(([courses, deletedCount]) => {
            res.render("me/stored-courses", {
               deletedCount,
               courses: mutipleMongooesToObject(courses),
            });
         })
         .catch(next);
   }

   //[GET] /me/trash/courses
   trashCourses(req, res, next) {
      Course.findDeleted({})
         .then((courses) =>
            res.render("me/trash-courses", {
               courses: mutipleMongooesToObject(courses),
            })
         )
         .catch(next);
   }
}

module.exports = new MeController();
