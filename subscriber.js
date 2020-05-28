const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')


var subscriberOption = {
    qos: 1,                                   //QoS =1
    retain: false                             //Don't retain the messages
}


client.on('connect', () => {
    client.subscribe('iap/0/./=query/request', subscriberOption)

})





client.on('message', (topic, message) => {

    let topic_filter = new RegExp(topic)  // for filter


    let resObj = {
        corr: "corr",
        err: "",
        result: {},
        item: 1,
        count: 25

    }



    console.log(`message from topic ${topic} :  `, JSON.parse(message.toString()))

    client.publish(message.response, JSON.stringify(resObj),  //in JSON format
        clientOptions, (err) => {

            if (err)
                console.log(`Error from client: `, err);

        })


})
