export default (bot) => {
    bot.start((ctx) => {
        ctx.reply('Welcome',);
    });
    bot.command('help', (ctx) => {
        const message = '*Command Reference*\n/begin - Begin looking for partner\n/end - End Chat\n/help - Command reference\n/setup - Setup preference\n/start - Start Bot';
        ctx.telegram.sendMessage(ctx.chat.id, message, {parse_mode: "Markdown"});
    });
    bot.command('setup', (ctx) => {
        ctx.reply('Please fill in your information and the preference for your potential partner.',
            {
                reply_markup:
                    {
                        keyboard:
                            [
                                [{text: 'You'}, {text: 'Partner'}]
                            ], resize_keyboard: true
                    }
            }
        )
    });
    bot.command('begin', (ctx) => {
        ctx.reply('Searching..... This could take a while.')
    });
    bot.command('end', (ctx) => {
        ctx.reply('Chat ended.')
    });
};