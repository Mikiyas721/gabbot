export default (bot) => {
    bot.on('callback_query', ctx => {
        let partnerId:string = ctx.callbackQuery.data;
        ctx.scene.enter('chatScene', {partnerId: partnerId});
        ctx.telegram.sendMessage(partnerId, 'Your partner has confirmed your request. Have a nice chat.');
        ctx.reply('Request confirmed. Have a nice chat.');
        ctx.deleteMessage();
    });
}