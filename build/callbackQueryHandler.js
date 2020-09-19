"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var confirm_1 = require("./model/confirm");
var databaseManager_1 = require("./databaseManager");
exports.default = (function (bot) {
    bot.on('callback_query', function (ctx) {
        var data = ctx.callbackQuery.data;
        if (data == "End") { // TODO find a better way to end the chat.
            ctx.scene.leave();
            ctx.reply('Chat Ended');
            ctx.deleteMessage();
        }
        else {
            ctx.scene.enter('chatScene', { partnerId: data });
            databaseManager_1.default.updateConfirmation(new confirm_1.default(parseInt(data), ctx.chat.id, true));
            ctx.telegram.sendMessage(data, 'Your partner has confirmed your request. Have a nice chat.');
            ctx.reply('Request confirmed. Have a nice chat.');
            ctx.deleteMessage();
        }
    });
});
//# sourceMappingURL=callbackQueryHandler.js.map