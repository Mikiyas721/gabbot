"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (bot) {
    /*    bot.on('callback_query', ctx => {
            let data: string = ctx.callbackQuery.data;
            if (data == "End") {   // TODO find a better way to end the chat.
                ctx.scene.leave();
                ctx.reply('Chat Ended');
                ctx.deleteMessage();
            }
            else {
                ctx.scene.enter('chatScene', {partnerId: data});
                DataBaseManger.updateConfirmation(new MatchedUsers(parseInt(data), ctx.chat.id, true));
                DataBaseManger.deleteUserFromDatabase(true, parseInt(data));
                ctx.telegram.sendMessage(data, 'Your partner has confirmed your request. Have a nice chat.');
                ctx.reply('Request confirmed. Have a nice chat.');
                ctx.deleteMessage();
            }
        });*/
});
//# sourceMappingURL=callbackQueryHandler.js.map