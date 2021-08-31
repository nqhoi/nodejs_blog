var path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const SortMiddleware = require("./app/middleware/SortMiddleware");

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
      helpers: {
         sum: (a, b) => a + b,
         sorttable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : "default";

            const icons = {
               default: "oi oi-elevator",
               asc: "oi oi-sort-ascending",
               desc: "oi oi-sort-descending",
            };
            const types = {
               default: "desc",
               asc: "desc",
               desc: "asc",
            };

            const icon = icons[sortType];
            const type = types[sortType];

            return `<a href="?_sort&column=${field}&type=${type}">
            <span class="${icon}"></span>
           </a>`;
         },
      },
   })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

route(app);

app.listen(port, () => {
   console.log(`app listening at http://localhost:${port}`);
});
