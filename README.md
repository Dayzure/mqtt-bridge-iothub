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
## Docker HUB
The image is published to [Docker HUB](https://hub.docker.com/r/astaykov/mqtt-bridge/)

## Run it on Azure Container Instance (ACI)
You can quickly test the bridge with the following command
```
az container create -g <RESOURCE_GROUP> -n <NAME_OF_THE_SERVICE> -e 'DEVICE_CONNECTION_STRING=<YOUR_CONN_STRING>' --image astaykov/mqtt-bridge --cpu 1 --memory 0.5
```
Where the placeholders have following meaning

 * **RESOURCE_GROUP** - name of an existing resource group to place the container intance into
 * **NAME_OF_THE_SERVICE** - name of the Azure Container Instance reosurce you are going to create
 * **DEVICE_CONNECTION_STRING** - your IoT Hub Device Connection String

## TODO
Extract the MQTT Server parameters into Environment Variables