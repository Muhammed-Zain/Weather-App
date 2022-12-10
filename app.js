const express = require("express");
const https = require("https");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const city = req.body.cityName;
  // const apiKey = "f375a208c4a71fd0ecac74723ad94d27";
  const api = process.env.API_KEY;
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=${unit}`;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const infoWeather = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<h1>The weather in ${city} is:   ${temp}&#8451 </h1>`);
      res.write(`<p>The weather is currently <b>${infoWeather}<b></p>`);
      res.write(`<img src=${imageURL}></img>`);

      res.send();
    });
  });
});

app.listen(4000, () => {
  console.log("Server is successfully running at port 3000!");
});
