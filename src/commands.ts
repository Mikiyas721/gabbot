import DataBaseManger from './databaseManager';
import {Sex} from './sex';
import User from "./model/user";
import Confirmation from "./model/confirm";

async function getRandomPartner(user: User): Promise<number> {
    let pendingUsers: object[] = await DataBaseManger.getPendingUsers(user);
    if (pendingUsers.length !== 0) {
        let random: number = Math.floor(Math.random() * pendingUsers.length);
        let randomPartner: any = pendingUsers[random];
        return randomPartner.userId;
    }
    return null;
}

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
        let user: User = await DataBaseManger.getUserFromDatabase(ctx.chat.id);
        //TODO handle possible null Error
        let partnerId: number = await getRandomPartner(user);
        if (partnerId) {
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
        } else {
            DataBaseManger.addUserToDatabase(true, user);
            ctx.reply('I am searching for a partner for you. You will get a confirmation request when I find a partner.');
        }
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
            DataBaseManger.addUserToDatabase(false, new User(
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
                                [{text: 'End', callback_data: 'End'}]
                            ]
                    }
                });
            ctx.scene.leave();
        } else {
            ctx.telegram.sendMessage(ctx.scene.state.partnerId, `${ctx.message.text}`);
        }
    });
    chatScene.on('audio', (ctx)=>{
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.audio);
    });
    chatScene.on('document', (ctx)=>{
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.document);
    });
    chatScene.on('photo', (ctx)=>{
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.photo);
    });
    chatScene.on('sticker', (ctx)=>{
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.sticker);
    });
    chatScene.on('video', (ctx)=>{
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.video);
    });
    chatScene.on('voice', (ctx)=>{
        ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.voice);
    });
};