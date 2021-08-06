/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const wwwRoutes = require('./routes');
const { Client } = require('pg')

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Routes Definitions
 */

app.use('/', wwwRoutes);
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
