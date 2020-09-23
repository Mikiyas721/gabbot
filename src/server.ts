import {config, isProduction} from "./config/config";
import bot from './bot';

if (isProduction) {
    bot.telegram.setWebhook(`${config.SERVER_URL}/${config.BOT_TOKEN}`).then(res => {
        console.log("Webhook Added")
    }).catch(err => {
        console.error(err)
    });
    // @ts-ignore
    bot.startWebhook(`/${config.BOT_TOKEN}`, null, process.env.PORT);
} else {
    bot.launch().then(res => {
        console.log("Bot launched")
    })
}