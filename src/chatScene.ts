import * as Scene from 'telegraf/scenes/base';
import LocalSession = require('telegraf-session-local');
import DataBaseManager from './databaseManager';
import MatchedUsers from "./model/matchedUsers";
import {onBegin, onHelp, onSetUp} from './commands';


export default (chatRoom: Scene, session: LocalSession<any>) => {
    chatRoom.on('text', async (ctx) => {
        const hasLeft = await hasPartnerLeft(ctx);
        if (ctx.message.text == "/end") {
            if (hasLeft) {
                ctx.reply("You aren't in a chat");
            } else {
                ctx.reply('Chat ended.');
                await ctx.telegram.sendMessage(ctx.scene.state.partnerId, 'Your partner has left the chat 😌. Press /begin to start looking for a partner again.');
                await DataBaseManager.updateMatched(new MatchedUsers(ctx.scene.state.partnerId, ctx.chat.id, true));
                await ctx.scene.leave();
            }
        } else if (ctx.message.text == "/begin") {
            if (hasLeft) {
                await onBegin(ctx);
            } else {
                ctx.reply('You are in a chat. Please first end this chat, if you want to start looking for another partner')
            }
        } else if (ctx.message.text == "/help") {
            onHelp(ctx);
        } else if (ctx.message.text == "/setup") {
            if (hasLeft) onSetUp(ctx);
            else ctx.reply("You can't setup your preference while you are in a chat.")
        } else {
            if (!hasLeft)
                await ctx.telegram.sendMessage(ctx.scene.state.partnerId, `${ctx.message.text}`);
            else await ctx.reply("You aren't in a chat");
        }
    });
    chatRoom.on('audio', async (ctx) => {
        const hasLeft = await hasPartnerLeft(ctx);
        if (!hasLeft) await ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.audio.file_id);
    });
    chatRoom.on('document', async (ctx) => {
        const hasLeft = await hasPartnerLeft(ctx);
        if (!hasLeft) await ctx.telegram.sendDocument(ctx.scene.state.partnerId, ctx.message.document.file_id);
    });
    chatRoom.on('photo', async (ctx) => {
        const hasLeft = await hasPartnerLeft(ctx);
        if (!hasLeft) await ctx.telegram.sendPhoto(ctx.scene.state.partnerId, ctx.message.photo[0].file_id);
    });
    chatRoom.on('sticker', async (ctx) => {
        const hasLeft = await hasPartnerLeft(ctx);
        if (!hasLeft) await ctx.telegram.sendSticker(ctx.scene.state.partnerId, ctx.message.sticker.file_id);
    });
    chatRoom.on('video', async (ctx) => {
        const hasLeft = await hasPartnerLeft(ctx);
        if (!hasLeft) await ctx.telegram.sendVideo(ctx.scene.state.partnerId, ctx.message.video.file_id);
    });
    chatRoom.on('voice', async (ctx) => {
        const hasLeft = await hasPartnerLeft(ctx);
        if (!hasLeft) await ctx.telegram.sendVoice(ctx.scene.state.partnerId, ctx.message.voice.file_id);
    });

    const hasPartnerLeft = async (ctx): Promise<boolean> => {
        const hasLeft = await DataBaseManager.hasPartnerLeft(new MatchedUsers(ctx.chat.id, ctx.scene.state.partnerId));
        if (hasLeft) {
            await ctx.scene.leave();
            await DataBaseManager.deleteMatchedUsers(ctx.chat.id);
        }
        return hasLeft;
    }
}