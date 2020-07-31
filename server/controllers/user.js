const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");

//Adding new rows, POST API.

exports.addRows = (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email is already exists.",
          success: false,
        });
      } else {
        newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          role: req.body.role,
        });

        newUser
          .save()
          .then((result) => {
            return res.status(201).json({
              message: "New row added successfully.",
              success: true,
              result: result,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

//Edit user form.
exports.editRows = (req, res, next) => {
  const id = req.params.userId;
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
  };

  User.updateOne({ _id: id }, data)
    .exec()
    .then((result) => {
      return res.status(200).json({
        message: "Row updated successfully",
        success: true,
        result: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          role: req.body.role,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

//Delete user row.
exports.deleteRow = (req, res, next) => {
  const id = req.params.userId;
  User.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User row deleted successfully",
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

//get all data.
exports.getAll = (req, res, next) => {
  User.find()
    .exec()
    .then((docs) => {
      return res.status(200).json(docs);
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
