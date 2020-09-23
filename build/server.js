"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config/config");
var bot_1 = require("./bot");
if (config_1.isProduction) {
    bot_1.default.telegram.setWebhook(config_1.config.SERVER_URL + "/" + config_1.config.BOT_TOKEN).then(function (res) {
        console.log("Webhook Added");
    }).catch(function (err) {
        console.error(err);
    });
    // @ts-ignore
    bot_1.default.startWebhook("/" + config_1.config.BOT_TOKEN, null, process.env.PORT);
}
else {
    bot_1.default.launch().then(function (res) {
        console.log("Bot launched");
    });
}
//# sourceMappingURL=server.js.map