# Simple MQTT to Azure IoT Hub Bridge container
This is a very simple project - bridge a generic MQTT Broker (say a specific topic) to an Azure IoT Hub.

## References
This project is based on two main sources:

 * [MQTT Kicking Off](http://dstil.ghost.io/mqtt-kicking-off/)
 * [Remote Monitoring Sample](https://github.com/Azure/azure-iot-sdk-node/tree/master/device/samples) from the Azure IoT Hub Device SDKs for NodeJS

## Configuration
The generic MQTT client part of the sample is, for the time being, hard coded onto the [bridge.js](./app/bridge.js) file:
``` JavaScript
  var mqttClient = mqtt.connect('mqtt://test.mosquitto.org:1883');  
  mqttClient.on('connect', () => {  
    mqttClient.subscribe('/v1/flex/001F4808EA60/interesting_events');
  });
```

Azure IoT Hub configuration is passed to the container as environment variable **DEVICE_CONNECTION_STRING**. And its value should a device connection string
## Have fun
Have fun with running a bridge between the clouds