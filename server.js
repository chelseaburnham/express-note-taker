//variable declaration
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));