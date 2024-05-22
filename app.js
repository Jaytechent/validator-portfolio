const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

// Custom middleware to verify working hours
// const workingHoursMiddleware = (req, res, next) => {
//   const currentDate = new Date();
//   const dayOfWeek = currentDate.getDay();
//   const currentHour = currentDate.getHours();

//   // Check if it's a working day (Monday to Friday) and working hours (9am to 5pm GMT)
//   if (
//     dayOfWeek >= 1 &&
//     dayOfWeek <= 5 &&
//     currentHour >= 9 &&
//     currentHour < 17
//   ) {
//     next(); // Continue with the request
//   } else {
//     res.send(
//       "Sorry, the web application is only available during working hours (Monday to Friday, from 9am to 5pm GMT)."
//     );
//   }
// };

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
// app.use(workingHoursMiddleware);

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "yahoo",
  secure: false, // Use SSL
  port: 587,
  auth: {
    user: "example@ymail.com",
    pass: "example",
  },
});

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/snapshot", (req, res) => {
  const blockHeight = '237843'; // Replace with the actual block height
  res.render("snapshot", { blockHeight });
});

// Handle form submission
app.post("/submit-contact", (req, res) => {
  const { name, email, message } = req.body;

  // Email content
  const mailOptions = {
    from: "example",
    to: "gmcadsservice2022@gmail.com", // Change this to your email address
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Email sent: " + info.response);
    res.send("Message sent successfully!");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
