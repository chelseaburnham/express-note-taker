//variable declaration
const { notStrictEqual } = require("assert");
const express = require("express");
const path = require("path");
const app = express();
const uuid = require('./helpers/uuid');
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));