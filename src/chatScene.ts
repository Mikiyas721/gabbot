import * as Scene from 'telegraf/scenes/base';
import * as Session from 'telegraf/session';

export default (chatRoom: Scene) => {
    chatRoom.on('text', (ctx) => {
        if (ctx.message.text == "/end") {
            ctx.reply('Chat ended.');
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, 'Your partner has left the chat 😌. Press /begin to start looking for a partner again.');
            ctx.scene.leave();
        } else {
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, `${ctx.message.text}`);
        }
    });
    chatRoom.on('audio', (ctx) => {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.audio);
    });
    chatRoom.on('document', (ctx) => {
        ctx.telegram.sendDocument(ctx.scene.state.partnerId, ctx.message.document);
    });
    chatRoom.on('photo', (ctx) => {
        ctx.telegram.sendPhoto(ctx.scene.state.partnerId, ctx.message.photo);
    });
    chatRoom.on('sticker', (ctx) => {
        ctx.telegram.sendSticker(ctx.scene.state.partnerId, ctx.message.sticker);
    });
    chatRoom.on('video', (ctx) => {
        ctx.telegram.sendVideo(ctx.scene.state.partnerId, ctx.message.video);
    });
    chatRoom.on('voice', (ctx) => {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.voice);
    });
}