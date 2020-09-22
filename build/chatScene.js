"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (chatRoom) {
    chatRoom.on('text', function (ctx) {
        if (ctx.message.text == "/end") {
            ctx.reply('Chat ended.');
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, 'Your partner has left the chat.Please press End button below', {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'End', callback_data: 'End' }]
                    ]
                }
            });
            ctx.scene.leave();
        }
        else {
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, "" + ctx.message.text);
        }
    });
    chatRoom.on('audio', function (ctx) {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.audio);
    });
    chatRoom.on('document', function (ctx) {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.document);
    });
    chatRoom.on('photo', function (ctx) {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.photo);
    });
    chatRoom.on('sticker', function (ctx) {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.sticker);
    });
    chatRoom.on('video', function (ctx) {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.video);
    });
    chatRoom.on('voice', function (ctx) {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.voice);
    });
    chatRoom.command('end', function (ctx) {
        console.log('In chatRoom command method');
    });
});
//# sourceMappingURL=chatScene.js.map