"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseManager_1 = require("./databaseManager");
var user_1 = require("./model/user");
var sex_1 = require("./sex");
exports.default = (function (bot) {
    bot.start(function (ctx) {
        setDefault(ctx);
        ctx.reply('Welcome');
    });
    bot.command('help', function (ctx) {
        var message = '*Command Reference*\n/begin - Begin looking for partner\n/end - End Chat\n/help - Command reference\n/setup - Setup preference\n/start - Start Bot';
        ctx.telegram.sendMessage(ctx.chat.id, message, { parse_mode: "Markdown" });
    });
    bot.command('setup', function (ctx) {
        ctx.reply('Please fill in your information and the preference for your potential partner.', {
            reply_markup: {
                keyboard: [
                    [{ text: 'You' }, { text: 'Partner' }]
                ], resize_keyboard: true
            }
        });
    });
    bot.command('begin', function (ctx) {
        ctx.reply('Searching..... This could take a while.');
    });
    bot.command('end', function (ctx) {
        ctx.reply('Chat ended.');
    });
    var setDefault = function (ctx) {
        var x = databaseManager_1.default.getUserFromDatabase(ctx.message.chat.id);
        if (!x) { // if null
            databaseManager_1.default.addUserToDatabase(new user_1.default(ctx.message.chat.id, ctx.message.chat.first_name, ctx.message.chat.username, sex_1.Sex.UNSPECIFIED, 20, sex_1.Sex.UNSPECIFIED, 20));
        }
    };
});
//# sourceMappingURL=commands.js.map