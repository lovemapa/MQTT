
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')


var clientOptions = {

    qos: 1,                         //QoS =1
    retain: true                    //retain messages

}
var topic = "iap/0/./=query/request"



client.on('connect', function () {
    client.subscribe(topic)     //subscribe the topic


    let reqObj = {
        corr: "corr",
        filter: "my/system/confg",
        response: "iap/0/./=query/request"

    }

    client.publish(topic,   // publish to request topic 
        JSON.stringify(reqObj),  //in JSON format
        clientOptions, (err) => {

            if (err)
                console.log(`Error from client: `, err);

        })


})



client.on('message', (topic, message) => {

    console.log(`message from topic ${topic} :  `, JSON.parse(message.toString()))


})