"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var config_1 = require("./config/config");
var hears_1 = require("./hears");
var commands_1 = require("./commands");
var bot = new telegraf_1.default(config_1.default.BOT_TOKEN);
commands_1.default(bot);
hears_1.default(bot);
bot.launch();
//# sourceMappingURL=bot.js.map