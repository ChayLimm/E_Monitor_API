const express = require("express");
const axios = require("axios"); 
const PORT = process.env.PORT || 4040;
const { handler } = require("./controller");

const BOT_TOKEN = '7731519842:AAEEAnhShMTmCX6fseR5CsERyVvt-t-63n4';
const WEBHOOK_URL = 'https://3c49-103-16-61-182.ngrok-free.app/telegram';

const app = express();
app.use(express.json());

app.post("/telegram", async (req, res) => {
    console.log(req.body);
    res.send(await handler(req));
});

app.post("/khqr", async (req, res) => {
    console.log(req.body);
    res.send(await handler(req));
});

app.get("*", async (req, res) => {
    res.send("Hello get");
});

// Start the server
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on Port", PORT);

    // Set webhook after server starts
    const setWebhook = async () => {
        try {
            const response = await axios.post(
                `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`,{ url: WEBHOOK_URL }
            );
            console.log('Webhook set successfully:', response.data);
        } catch (error) {
            console.error('Error setting webhook:', error.response ? error.response.data : error.message);
        }
    };

    setWebhook();
});
