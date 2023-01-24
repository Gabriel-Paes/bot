require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { json } = require("body-parser");

const app = express();
app.use(bodyParser.json());

const { TEL_TOKEN, URL_NGROK } = process.env;

const TEL_API = `https://api.telegram.org/bot${TEL_TOKEN}`;

const WEBHOOK_END = '/webhook/' + TEL_API;
const WEBHOOK_URL = URL_NGROK + WEBHOOK_END;

const setWebhookUrl = async () => {
    await axios.get(`${TEL_API}/setWebhook?url=${WEBHOOK_URL}`);
}

app.listen(process.env.PORT || 8080, async () => {
    console.log("app is running on port: ", process.env.PORT || 8080);
    setWebhookUrl();
    console.log()
});

app.post(WEBHOOK_END, async (req, res) => {
    console.log("req.body :>> ", req.body);
    const chat_id = req.body.message.chat.id;
    const text = req.body.message.text;
    const username = req.body.message.chat.username;

    if (text === "OI"){
        await axios.post(`${TEL_API}/sendMessage`, {
            chat_id,
            text: '01001111 01001001 ' + username + "!",
        });
    }

/*     if (text === "Poll") {
        const options = ['Sim', 'Não'];

        await axios.post(`${TEL_API}/sendPoll`, {
            chat_id,
            question: "Vai dar bom?",
            options: json_encode(options),
        });        
    }
 */
    if (text === "Teste") {
        await axios.post(`${TEL_API}/sendMessage`, {
            chat_id,
            text: text + "," + username,
        });    
    }

    return res.send()
});