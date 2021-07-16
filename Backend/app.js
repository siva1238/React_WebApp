const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

//On Windows, the file name that includes a date string is not really supported and will lead to some strange CORS errors.
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});
//filter file based on extension
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const adminRoutes = require("./routes/admin");
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

//set header to response to avoid cors error
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((req, res, next) => {
  //incoming req's are funneled through middleware
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);

//foreign key for one-to-one relation for model
Product.belongsTo(User, { Constraints: true, onDelete: "CASCADE" }); //if we delete the product it will cascade
//one user has many products
User.hasMany(Product);

//sync the data to database
sequelize
  //.sync({ force: true }) //will not override tables if set force:true but not use for prod
  .sync()
  .then((result) => {
    // console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Siva",
        email: "siva@gmail.com",
        password: "siva1234",
        dob: "10-04-1989",
        age: 31,
      });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    //console.log(user);
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
