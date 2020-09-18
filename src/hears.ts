import DataBaseManager from './databaseManager';
import User from "./model/user";
import {Sex} from "./sex";

export default (bot) => {
    bot.hears('Your Sex', (ctx) => {
        ctx.reply('Your Sex', {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Male'},
                        {text: 'Female'}
                    ], [{text: 'Unspecified'}]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Male', (ctx) => {
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, Sex.MALE));
        ctx.reply('Your Sex has been set to Male', {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Your Sex'},
                        {text: "Partner's Sex"}
                    ],
                    [
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Female', (ctx) => {
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, Sex.FEMALE));
        ctx.reply('Your Sex has been set to Female', {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Your Sex'},
                        {text: "Partner's Sex"}
                    ],
                    [
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Unspecified', (ctx) => {
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, Sex.UNSPECIFIED));
        ctx.reply("Your Sex isn't specified", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Your Sex'},
                        {text: "Partner's Sex"}
                    ],
                    [
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });

    bot.hears("Partner's Sex", (ctx) => {
        ctx.reply("Your partner's sex", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'MALE'},
                        {text: 'FEMALE'}
                    ],
                    [
                        {text: 'UNSPECIFIED'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('MALE', (ctx) => {
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, null,Sex.MALE));
        ctx.reply("Your partner's sex has been set to male", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Your Sex'},
                        {text: "Partner's Sex"}
                    ],
                    [
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('FEMALE', (ctx) => {
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, null, Sex.FEMALE));
        ctx.reply("Your partner's sex has been set to female", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Your Sex'},
                        {text: "Partner's Sex"}
                    ],
                    [
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('UNSPECIFIED', (ctx) => {
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, null, Sex.UNSPECIFIED));
        ctx.reply("Your partner's sex isn't specified", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Your Sex'},
                        {text: "Partner's Sex"}
                    ],
                    [
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });

    bot.hears('Done', (ctx) => {
        ctx.reply('Setup Complete', {
            reply_markup: {
                remove_keyboard: true
            }
        });
    });
}
