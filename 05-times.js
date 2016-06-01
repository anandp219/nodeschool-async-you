"use strict";

var http = require("http"),
    async = require("async");

var hostname = process.argv[2],
    port = process.argv[3],
    url = 'http://' +  hostname + ':' + port;

function addUser(id, next) {
  var data = JSON.stringify({ "user_id": id });
  var opts = { hostname: hostname, port: port, path: "/users/create", method: "POST", headers: { "Content-Length": data.length } };
  var req = http.request(opts, function (res) {
    res.on("data", function () {});
    res.on("end", function () {
      next();
    });
  });

  req.on("error", next);

  req.write(data);
  req.end();
}

async.series([
  function (done) {
    async.times(5, function (n, next) {
      addUser(n + 1, function (err) { next(err); });
    }, function () { done(null, "saved"); });
  },

  function (done) {
    http.get(url + '/users', function(res){
      var body = "";
      res.on('data', function(chunk){
        body += chunk.toString();
      });

      res.on('end', function(){
        done(null, body);
      });
    }).on('error', done);
  }
], function (err, result) {
  if (err) { console.log(err); }
  console.log(result[1]);
});
