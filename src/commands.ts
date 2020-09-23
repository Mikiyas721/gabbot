import DataBaseManger from './databaseManager';
import {Sex} from './sex';
import User from "./model/user";
import MatchedUsers from "./model/matchedUsers";
import user from "./model/user";

async function getRandomPartner(user: User): Promise<number> {
    let pendingUsers: object[] = await DataBaseManger.getPendingUsers(user);
    if (pendingUsers.length !== 0) {
        let random: number = Math.floor(Math.random() * pendingUsers.length);
        let randomPartner: any = pendingUsers[random];
        return randomPartner.userId;
    }
    return null;
}

export default (bot) => {
    bot.start(async (ctx) => {
        await setDefault(ctx);
        ctx.reply('Welcome');
    });
    bot.command('help', (ctx) => {
        onHelp(ctx);
    });
    bot.command('setup', (ctx) => {
        onSetUp(ctx);
    });
    bot.command('begin', async (ctx) => {
        await onBegin(ctx);
    });
    bot.command('end', async (ctx) => {
        await ctx.reply("Looking for partner has been stopped 😔. Enter the /begin command if you want to start looking again 🙂.");
        await DataBaseManger.deleteUserFromDatabase(true, ctx.chat.id);
    });
    bot.command('users', async ctx => {
        if (ctx.chat.id == 262164706) {
            const users: object[] = await DataBaseManger.getAllUsers();
            let usersList: string = `<b>User count is ${users.length}</b>\n\n`;
            users.forEach((user: any) => {
                usersList += `${user.firstName} -- @${user.userName}\n`
            });
            await ctx.reply(usersList, {parse_mode: "HTML"});
        }
    });
    bot.on('text', async (ctx) => {
        let myId = ctx.chat.id;
        let match: MatchedUsers = await DataBaseManger.getMatchedUsers(myId);
        if (match) {
            await ctx.telegram.sendMessage(match.getOpponentId(myId), ctx.message.text)
            await ctx.scene.enter('chatRoom', {partnerId: match.getOpponentId(myId)});
        } else {
            await ctx.reply("You aren't in a chat");
        }
    });

    const setDefault = async (ctx) => {
        let x = await DataBaseManger.getUserFromDatabase(ctx.message.chat.id);
        if (!x) {   // if null
            await DataBaseManger.addUserToDatabase(false, new User(
                ctx.message.chat.id,
                ctx.message.chat.first_name,
                ctx.message.chat.username,
                Sex.UNSPECIFIED,
                Sex.UNSPECIFIED,
            ));
        }
    };

};
export const onBegin = async (ctx) => {
    let user: User = await DataBaseManger.getUserFromDatabase(ctx.chat.id);
    let partnerId: number = await getRandomPartner(user);
    if (partnerId) {
        await DataBaseManger.registerMatchedUsers(new MatchedUsers(ctx.chat.id, partnerId));
        await DataBaseManger.deleteUserFromDatabase(true, partnerId);
        await ctx.scene.enter('chatRoom', {partnerId: partnerId});
        await ctx.reply('Your partner is here 😊. Have a nice chat');
        await ctx.telegram.sendMessage(partnerId, `Your partner is here 😊. Have a nice chat.`);
    } else {
        await ctx.reply("Unfortunately, I couldn't find a partner now 😔.I will keep searching 🧐 and match you as soon as possible 🙂");
        await DataBaseManger.addUserToDatabase(true, user);
    }
}
export const onHelp = (ctx) => {
    const message = '<b>Welcome to GabBot 🤗</b>\n\nThis bot matches you with a random person of your preferred sex. It has a default preference of unspecified sex for you and your partner, you can change that using the /setup command. Once you are done setting up, you can use the /begin command to start looking for a partner. When you get matched you must always <i><u>start with a text message</u></i>. \n\n<b>Command Reference</b>\n/begin - Begin looking for partner\n/end - End Chat\n/help - Command reference\n/setup - Setup preference\n/start - Start Bot';
    ctx.telegram.sendMessage(ctx.chat.id, message, {parse_mode: "HTML"});
}
export const onSetUp = (ctx) => {
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
}