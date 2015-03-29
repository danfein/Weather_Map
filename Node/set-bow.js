/*jslint node: true */
"use strict";

var _ = require('underscore');
var request = require('request');
var spark = require('spark');
var async = require('async');


var map = [];

// Login as usual
var promise = spark.login({ username: 'xxxx@yyy.com', password: 'xxxx' });


var fetch = function(loc, cb) {

 request(loc.url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
//            console.log(body) // Print the google web page.
      var data = JSON.parse(body);
//        console.log(data.current_observation.station.name);
//        console.log(data.current_observation.temperature);
      if(data && data.current_observation) {
        var temp = data.current_observation.temperature;
        var precip_today = data.current_observation.precip_today;
        var color;
        if(precip_today) {
          color = 155;
        } else {
          color = 65;
        }
        /*
        if(temp >= 60) {
          color = '255';
        }
        if(temp < 60) {
          color = '155';
        }
        */
//        var command = index + ':' + color;
//        map[index].command = command;
        cb(null, color);

//        console.log(command);
//        console.log(color);
      } else {
        cb(null, '001');
      }
    } else {
      cb("error 1");
    }
  });

};

var spark_device = null;

var batch_send = function(command, cb) {

  console.log('sending command: ' + command);
  spark_device.callFunction('rainmap', command, function(err, data) {
    if (err) {
      console.log('An error occurred:', err);
      cb(err);
    } else {
      console.log('Function called succesfully:', data);
      cb(null);
    //                rec_call(device, index+1);
    }
  });
}



promise.then(
  function(token){
    // If login is successful we get and accessToken,
    // we'll use that to call Spark API ListDevices
    var devicesPr = spark.listDevices();

    devicesPr.then(
      // We get an array with devices back and we list them
      function(devices){
        console.log('API call List Devices completed on promise resolve: ', devices);
        var device = devices[0];
        spark_device = device;

        var command = "blah";
        spark_device.callFunction('rainbow', command, function(err, data) {
          if (err) {
            console.log('An error occurred:', err);
            //cb(err);
          } else {
            console.log('Function called succesfully:', data);
            //cb(null);
          //                rec_call(device, index+1);
          }
        });

      },
      function(err) {
        console.log('API call List Devices completed on promise fail: ', err);
      }
    );
  },
  function(err) {
    console.log('API call completed on promise fail: ', err);
  }
);

function rec_call(device, index) {
  if(index > 99) return;
  var command = map[index].command;
  console.log("index: " + index);
  device.callFunction('rainbow', command, function(err, data) {
    if (err) {
      console.log('An error occurred:', err);
    } else {
      console.log('Function called succesfully:', data);
      rec_call(device, index+1);
    }
  });
}



function blah() {

  var locations = [
    {'lat':'34', 'lon': '-111'},
    {'lat':'37', 'lon': '-112'},
    {'lat':'41', 'lon': '-123'},
    {'lat':'45', 'lon': '-122'},
    {'lat':'47', 'lon': '-122'},
    {'lat':'45', 'lon': '-119'},
    {'lat':'42', 'lon': '-119'},
    {'lat':'40', 'lon': '-118'},
    {'lat':'38', 'lon': '-118'},
    {'lat':'33', 'lon': '-116'},
    {'lat':'35', 'lon': '-115'},
    {'lat':'33', 'lon': '-114'},
    {'lat':'34', 'lon': '-113'},
    {'lat':'36', 'lon': '-113'},
    {'lat':'39', 'lon': '-114'},
    {'lat':'41', 'lon': '-117'},
    {'lat':'45', 'lon': '-116'},
    {'lat':'47', 'lon': '-117'},
    {'lat':'47', 'lon': '-114'},
    {'lat':'46', 'lon': '-110'},
    {'lat':'42', 'lon': '-112'},
    {'lat':'40', 'lon': '-111'},
    {'lat':'39', 'lon': '-111'},
    {'lat':'35', 'lon': '-110'},
    {'lat':'32', 'lon': '-110'},
    {'lat':'31', 'lon': '-109'},
    {'lat':'33', 'lon': '-108'},
    {'lat':'36', 'lon': '-108'},
    {'lat':'39', 'lon': '-108'},
    {'lat':'41', 'lon': '-108'},
    {'lat':'45', 'lon': '-107'},
    {'lat':'46', 'lon': '-108'},
    {'lat':'47', 'lon': '-104'},
    {'lat':'46', 'lon': '-103'},
    {'lat':'42', 'lon': '-104'},
    {'lat':'40', 'lon': '-104'},
    {'lat':'38', 'lon': '-105'},
    {'lat':'34', 'lon': '-106'},
    {'lat':'32', 'lon': '-106'},
    {'lat':'30', 'lon': '-103'},
    {'lat':'33', 'lon': '-102'},
    {'lat':'35', 'lon': '-102'},
    {'lat':'39', 'lon': '-101'},
    {'lat':'40', 'lon': '-101'},
    {'lat':'43', 'lon': '-100'},
    {'lat':'47', 'lon': '-101'},
    {'lat':'48', 'lon': '-98'},
    {'lat':'45', 'lon': '-98'},
    {'lat':'41', 'lon': '-98'},
    {'lat':'40', 'lon': '-99'},
    {'lat':'36', 'lon': '-99'},
    {'lat':'34', 'lon': '-99'},
    {'lat':'33', 'lon': '-97'},
    {'lat':'30', 'lon': '-100'},
    {'lat':'28', 'lon': '-98'},
    {'lat':'29', 'lon': '-95'},
    {'lat':'33', 'lon': '-96'},
    {'lat':'35', 'lon': '-94'},
    {'lat':'37', 'lon': '-94'},
    {'lat':'40', 'lon': '-93 '},
    {'lat':'43', 'lon': '-94'},
    {'lat':'47', 'lon': '-94'},
    {'lat':'46', 'lon': '-90'},
    {'lat':'42', 'lon': '-91'},
    {'lat':'38', 'lon': '-90'},
    {'lat':'36', 'lon': '-91'},
    {'lat':'33', 'lon': '-92'},
    {'lat':'30', 'lon': '-93'},
    {'lat':'29', 'lon': '-90'},
    {'lat':'33', 'lon': '-88'},
    {'lat':'34', 'lon': '-88'},
    {'lat':'39', 'lon': '-87'},
    {'lat':'40', 'lon': '-87'},
    {'lat':'44', 'lon': '-86'},
    {'lat':'42', 'lon': '-86'},
    {'lat':'38', 'lon': '-86'},
    {'lat':'35', 'lon': '-86'},
    {'lat':'33', 'lon': '-86'},
    {'lat':'30', 'lon': '-85'},
    {'lat':'33', 'lon': '-85'},
    {'lat':'35', 'lon': '-85'},
    {'lat':'39', 'lon': '-85'},
    {'lat':'42', 'lon': '-84'},
    {'lat':'45', 'lon': '-83'},
    {'lat':'39', 'lon': '-82'},
    {'lat':'38', 'lon': '-82'},
    {'lat':'33', 'lon': '-82'},
    {'lat':'31', 'lon': '-81'},
    {'lat':'28', 'lon': '-82'},
    {'lat':'25', 'lon': '-80'},
    {'lat':'29', 'lon': '-79'},
    {'lat':'33', 'lon': '-80'},
    {'lat':'43', 'lon': '-80'},
    {'lat':'39', 'lon': '-80'},
    {'lat':'43', 'lon': '-80 '},
    {'lat':'45', 'lon': '-80'},
    {'lat':'46', 'lon': '-80'},
    {'lat':'46', 'lon': '-70'},
    {'lat':'42', 'lon': '-71'},
    {'lat':'33', 'lon': '-44'}
  ];


  var high = -999;
  var low = 999;
  for(var i=0; i<locations.length; i++) {
    console.log(i);
    var point = locations[i]
    map[i] = {}
    map[i].loc = point;
    map[i].url = 'http://api.wxug.com/api/--APIKEYHERE--/conditions/v:2.0/lang:EN/units:english/q/' + point.lat + ',' + point.lon + '.json';
    //console.log(map[i]);
    /*
    request(map[i].url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
//            console.log(body) // Print the google web page.
        var data = JSON.parse(body);
//        console.log(data.current_observation.station.name);
//        console.log(data.current_observation.temperature);
        if(data && data.current_observation) {
          var temp = data.current_observation.temperature;
          if(temp > 70) {
            high = temp;
          }
          if(temp < low) {
            low = temp;
          }
          console.log("high: " + high);
          console.log("low: " + low);
        }
      }
    });
    */
  }
}

//blah();
