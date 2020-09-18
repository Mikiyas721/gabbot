"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var config_1 = require("./config/config");
var Session = require("telegraf/session");
var Scene = require("telegraf/scenes/base");
var Stage = require("telegraf/stage");
var hears_1 = require("./hears");
var commands_1 = require("./commands");
var callbackQueryHandler_1 = require("./callbackQueryHandler");
var bot = new telegraf_1.default(config_1.default.BOT_TOKEN);
var chattingScene = new Scene('chatScene');
var stage = new Stage();
stage.register(chattingScene);
bot.use(Session());
bot.use(stage.middleware());
commands_1.default(bot, chattingScene);
hears_1.default(bot);
callbackQueryHandler_1.default(bot);
bot.launch();
//# sourceMappingURL=bot.js.map