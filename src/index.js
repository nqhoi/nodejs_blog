var path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const SortMiddleware = require("./app/middleware/sortMiddleware");

const app = express();
const port = 3000;

const methodOverride = require("method-override");

const route = require("./routes");
const db = require("./config/db");

app.use(methodOverride("_method"));

//Custom Middleware
app.use(SortMiddleware);

// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

// HTTP
// app.use(morgan("combined"));

app.use(
   express.urlencoded({
      extended: true,
   })
);

// template engine
app.engine(
   "hbs",
   handlebars({
      extname: "hbs",
      helpers: require('./helpers/handlebars')
   })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

route(app);

app.listen(port, () => {
   console.log(`app listening at http://localhost:${port}`);
});
