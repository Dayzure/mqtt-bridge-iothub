'use strict';

var mqtt = require('mqtt');  
var Protocol = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var ConnectionString = require('azure-iot-device').ConnectionString;
var Message = require('azure-iot-device').Message;

// String containing Hostname, Device Id & Device Key in the following formats:
//  "HostName=<iothub_host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>"
var connectionString = process.env.DEVICE_CONNECTION_STRING;
var mqttServer = process.env.MQTT_SERVER; // i.e. 'mqtt://test.mosquitto.org:1883'
var mqttTopic = process.env.MQTT_TOPIC; // i.e. '/v1/flex/001F4808EA60/interesting_events'

console.log('Connection String:\n' + connectionString);

if(connectionString == null || typeof(connectionString) == undefined || connectionString.length < 52)
{
	printErrorFor('DEVICE_CONNECTION_STRING')('No valid connection string provided');
}

var deviceId = ConnectionString.parse(connectionString).DeviceId;

// Create IoT Hub client
var client = Client.fromConnectionString(connectionString, Protocol);

// Helper function to print results for an operation
function printErrorFor(op) {
  return function printError(err) {
    if (err) console.log(op + ' error: ' + err.toString());
  };
}

client.open(function (err) {
  if (err) {
    printErrorFor('open')(err);
  } else {
    client.on('message', function (msg) {
      console.log('receive data: ' + msg.getData());
    });
    client.on('error', function (err) {
      printErrorFor('client')(err);
      if (sendInterval) clearInterval(sendInterval);
      client.close(printErrorFor('client.close'));
    });
  }
});

function sendDataToIoTHub(message)
{
  var data = JSON.stringify(message);
  console.log('Sending device event data:\n' + data);
  client.sendEvent(new Message(data), printErrorFor('send event'));
}

var mqttClient = mqtt.connect(mqttServer);  
mqttClient.on('connect', () => {  
  mqttClient.subscribe(mqttTopic);
});
mqttClient.on('message', (topic, message) => {  
  console.log(`Received message: '${message}' on topic '${topic}'`);
  sendDataToIoTHub(message);
});
