"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (chatRoom) {
    chatRoom.on('text', function (ctx) {
        if (ctx.message.text == "/end") {
            ctx.reply('Chat ended.');
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, 'Your partner has left the chat 😌. Press /begin to start looking for a partner again.');
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
        ctx.telegram.sendDocument(ctx.scene.state.partnerId, ctx.message.document);
    });
    chatRoom.on('photo', function (ctx) {
        ctx.telegram.sendPhoto(ctx.scene.state.partnerId, ctx.message.photo);
    });
    chatRoom.on('sticker', function (ctx) {
        ctx.telegram.sendSticker(ctx.scene.state.partnerId, ctx.message.sticker);
    });
    chatRoom.on('video', function (ctx) {
        ctx.telegram.sendVideo(ctx.scene.state.partnerId, ctx.message.video);
    });
    chatRoom.on('voice', function (ctx) {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.voice);
    });
});
//# sourceMappingURL=chatScene.js.map