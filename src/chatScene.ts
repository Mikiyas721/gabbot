import * as Scene from 'telegraf/scenes/base';

export default (chatRoom:Scene)=>{
    chatRoom.on('text', (ctx) => {
        if (ctx.message.text == "/end") {
            ctx.reply('Chat ended.');
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, 'Your partner has left the chat.Please press End button below',
                {
                    reply_markup: {
                        inline_keyboard:
                            [
                                [{text: 'End', callback_data: 'End'}]
                            ]
                    }
                });
            ctx.scene.leave();
        } else {
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, `${ctx.message.text}`);
        }
    });
    chatRoom.on('audio', (ctx) => {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.audio);
    });
    chatRoom.on('document', (ctx) => {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.document);
    });
    chatRoom.on('photo', (ctx) => {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.photo);
    });
    chatRoom.on('sticker', (ctx) => {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.sticker);
    });
    chatRoom.on('video', (ctx) => {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.video);
    });
    chatRoom.on('voice', (ctx) => {
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.voice);
    });
    chatRoom.command('end', (ctx)=>{
       console.log('In chatRoom command method');
    });
}