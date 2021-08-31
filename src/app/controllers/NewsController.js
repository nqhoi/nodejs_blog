class NewsController {
  index(req, res) {
    res.render("news");
  }

  show(req, res) {
    res.send("Test slug");
  }

}

module.exports = new NewsController;
