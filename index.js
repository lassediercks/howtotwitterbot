const Twit = require("twit");
const URL = "https://github.com/lassediercks/howtotwitterbot";
const express = require("express");
const app = express();
const http = require("http");

app.set("port", process.env.PORT || 5000);

setInterval(function() {
  http.get("http://csstweetbot.herokuapp.com/");
}, 300000);

//For avoidong Heroku $PORT error
app
  .get("/", function(request, response) {
    var result = "App is running";
    response.send(result);
  })
  .listen(app.get("port"), function() {
    console.log(
      "App is running, server is listening on port ",
      app.get("port")
    );
  });

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

setInterval(Tweet, 6000 * 60 * 23);

function Tweet() {
  T.post(
    "statuses/update",
    {
      status: `You can change the content of this daily tweet here:${URL}`
    },
    function(err, data, response) {
      console.log(data);
    }
  );
}
