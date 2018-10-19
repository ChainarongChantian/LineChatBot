const express = require('express')
const line = require('@line/bot-sdk')
const app = express()
const port = 8080

const config = {
    channelAccessToken:"bFZqPodK9Q7BbKCu4mh9n0CP5sAanECIpIQaWDlQNuEgjl/y+dRtGn4PRYAzMXQ2K402ihL23J7hymC0/NHbIduxUmLwkF06fNhWkUcSYhieEqEtRGA5ChDwpAApo9Sf+PdQDVeEO2hICPZ2ZThmCAdB04t89/1O/w1cDnyilFU=",
    channelSecret:"0da5f74ba269a364c6e9f692716ae89c"
}

const client = new line.Client(config)

app.get('/', (req, res) => {
    res.send("Hello, world")
})

app.post('/', line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))
})

function handleEvent(event) {
    if(event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null)
    }
    if(event.message.text == "ขอสติกเกอร์หน่อย") {
        return client.replyMessage(event.replyToken, {
            type: "sticker",
            packageId: "1",
            stickerId:"131"
        })
    }
    return client.replyMessage(event.replyToken, {
        type:'text',
        text:event.message.text
    })
}

app.listen(port, () => console.log(`App running ${port}`))