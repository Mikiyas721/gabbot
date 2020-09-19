import DataBaseManger from './databaseManager';
import {Sex} from './sex';
import User from "./model/user";
import Confirmation from "./model/confirm";

export default (bot, chatScene) => {
    bot.start((ctx) => {
        setDefault(ctx);
        ctx.reply('Welcome');
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
                                [{text: 'Your Sex'}, {text: "Partner's Sex"}]
                            ], resize_keyboard: true
                    }
            }
        )
    });
    bot.command('begin', async (ctx) => {
        let partnerId: number = 1081281423;
        DataBaseManger.registerConfirmationRequest(new Confirmation(ctx.chat.id, partnerId));
        ctx.reply('I have sent confirmation message to your partner. Please wait patiently');
        ctx.telegram.sendMessage(partnerId, `A partner is waiting for you. Press Confirm button below to start.`, {
                reply_markup:
                    {
                        inline_keyboard:
                            [[{text: 'Confirm', callback_data: `${ctx.chat.id}`},]]
                    }
            }
        );
    });
    bot.command('end', (ctx) => {
        ctx.reply("You aren't in a chat");
    });
    bot.on('message', async (ctx) => {
        let confirm: Confirmation = await DataBaseManger.getConfirmationFromDatabase(ctx.chat.id);
        if (confirm && confirm.isConfirmed) {
            ctx.telegram.sendMessage(confirm.receiverId, `${ctx.message.text}`);
            ctx.scene.enter('chatScene', {partnerId: confirm.receiverId});
            await DataBaseManger.deleteConfirmationRequest(confirm.senderId);
        } else {
            ctx.reply("You aren't in a chat");
        }
    });
    const setDefault = async (ctx) => {
        let x = await DataBaseManger.getUserFromDatabase(ctx.message.chat.id);
        if (!x) {   // if null
            DataBaseManger.addUserToDatabase(false,new User(
                ctx.message.chat.id,
                ctx.message.chat.first_name,
                ctx.message.chat.username,
                Sex.UNSPECIFIED,
                Sex.UNSPECIFIED,
            ));
        }
    };
    chatScene.on('text', (ctx) => {
        if (ctx.message.text == "/end") {
            ctx.reply('Chat ended.');
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, 'Your partner has left the chat.Please press End button below',
                {
                    reply_markup: {
                        inline_keyboard:
                            [
                                [{text: 'End', callback_data:'End'}]
                            ]
                    }
                });
            ctx.scene.leave();
        } else {
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, `${ctx.message.text}`);
        }
    });
};