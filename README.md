# Simple MQTT to Azure IoT Hub Bridge container
This is a very simple project - bridge a generic MQTT Broker (say a specific topic) to an Azure IoT Hub.

## References
This project is based on two main sources:

 * [MQTT Kicking Off](http://dstil.ghost.io/mqtt-kicking-off/)
 * [Remote Monitoring Sample](https://github.com/Azure/azure-iot-sdk-node/tree/master/device/samples) from the Azure IoT Hub Device SDKs for NodeJS

## Configuration
The generic MQTT client part as well as IoT Hub Connection string are configured over the following environment variables:
 * **DEVICE_CONNECTION_STRING** - your IoT Hub Device Connection String
 * **MQTT_SERVER** - full address of your MQTT Server (i.e. mqtt://test.mosquitto.org:1883)
 * **MQTT_TOPIC** - relative address of your MQTT Topic (i.e. /v1/flex/001F4808EA60/interesting_events)

## Docker HUB
The image is published to [Docker HUB](https://hub.docker.com/r/astaykov/mqtt-bridge-iothub/)

## Run it on Azure Container Instance (ACI)
You can quickly test the bridge with the following command
```
az container create -g <RESOURCE_GROUP> -n <NAME_OF_THE_SERVICE> -e 'DEVICE_CONNECTION_STRING=<YOUR_DEVICE_CONN_STRING>' 'MQTT_SERVER=<MQTT_SERVER>' 'MQTT_TOPIC=<MQTT_TOPIC>' --image astaykov/mqtt-bridge --cpu 1 --memory 0.5
```
Where the placeholders have following meaning

 * **<RESOURCE_GROUP>** - name of an existing resource group to place the container intance into
 * **<NAME_OF_THE_SERVICE>** - name of the Azure Container Instance reosurce you are going to create
 * **<DEVICE_CONNECTION_STRING>** - your IoT Hub Device Connection String
 * **<MQTT_SERVER>** - full address of your MQTT Server (i.e. mqtt://test.mosquitto.org:1883)
 * **<MQTT_TOPIC>** - relative address of your MQTT Topic (i.e. /v1/flex/001F4808EA60/interesting_events)

## TODO
Enhance MQTT Client to support secured MQTT connections (requires importing of server certificates).