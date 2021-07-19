const Product = require("../models/product");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.file);
  const name = req.body.name;
  const price = req.body.price;
  const expiryDate = req.body.expiryDate;
  let imageUrl = req.file.path.replace("\\", "/"); //replace \\ with \ ; windows doesn't recognize he format
  if (!imageUrl) {
    const error = new Error("No file picked.");
    error.statusCode = 422;
    throw error;
  }
  const product = new Product({
    name: name,
    price: price,
    imageUrl: imageUrl,
    expiryDate: expiryDate,
    userId: req.body.userId,
  });
  product
    .save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Product created!", productId: result.id });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    //Product.findByPk(prodId)
    .then((products) => {
      //find the record by id with sequelize

      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedExpiryDate = req.body.expiryDate;
  Product.findByPk(prodId)
    .then((product) => {
      product.name = updatedName;
      product.price = updatedPrice;
      product.expiryDate = updatedExpiryDate;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("updated product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  // req.user
  //.getProducts()
  Product.findAll()
    .then((products) => {
      //Fetching Admin products by findAll() in sequelize
      // res.render("admin/products", {
      //   prods: products,
      //   pageTitle: "Admin Products",
      //   path: "/admin/products",
      // });
      res.status(200).json({
        message: "Fetched Products successfully.",
        products: products,
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Deleted product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  console.log(req.body);
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const dob = req.body.dob;
  const age = req.body.age;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
        dob: dob,
        age: age,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password); //encrypt the password
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser.id.toString(),
        },
        "somesupersecretsecret", // add sign key
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser.id.toString() }); //send jwt token
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  //const product = products[0];
  const userId = req.params.userId;

  User.findOne({ where: { id: userId } })
    .then((user) => {
      console.log(user);
      res.status(200).json({
        message: "Fetched user successfully.",
        user: user,
        path: "/admin/user",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
