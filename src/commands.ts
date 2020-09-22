import DataBaseManger from './databaseManager';
import {Sex} from './sex';
import User from "./model/user";
import MatchedUsers from "./model/matchedUsers";

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
            await DataBaseManger.registerMatchedUsers(new MatchedUsers(ctx.chat.id, partnerId));
            await DataBaseManger.deleteUserFromDatabase(true, partnerId);
            await ctx.scene.enter('chatRoom', {partnerId: partnerId});
            await ctx.reply('Your partner is here 😊. Have a nice chat');
            await ctx.telegram.sendMessage(partnerId, `Your partner is here 😊. Have a nice chat.`);
        } else {
            await ctx.reply("Unfortunately, I couldn't find a partner now 😔.I will keep searching and match you as soon as possible 🙂");
            await DataBaseManger.addUserToDatabase(true, user);
        }
    });
    bot.command('end', (ctx) => {
        ctx.reply("You aren't in a chat");
    });
    bot.on('text', async (ctx) => {
        let match: MatchedUsers = await DataBaseManger.getMatchedUser(ctx.chat.id);
        if (match) {
            await ctx.telegram.sendMessage(match.firstUserId, ctx.message.text)
            await ctx.scene.enter('chatRoom', {partnerId: match.firstUserId});
            await DataBaseManger.deleteMatchedUsers(match.firstUserId);
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