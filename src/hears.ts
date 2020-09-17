import DataBaseManager from './databaseManager';
import User from "./model/user";
import {Sex} from "./sex";

export default (bot) => {
    bot.hears('You', (ctx) => {
        ctx.reply('Your Info', {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'Sex'},
                        {text: 'Age'}
                    ]
                ], resize_keyboard: true
            }
        });
    });

    bot.hears('Sex', (ctx) => {
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
                        {text: 'Sex'},
                        {text: 'Age'}
                    ],
                    [
                        {text: 'Back'},
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
                        {text: 'Sex'},
                        {text: 'Age'}
                    ],
                    [
                        {text: 'Back'},
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
                        {text: 'Sex'},
                        {text: 'Age'}
                    ],
                    [
                        {text: 'Back'},
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });

    bot.hears('Age', (ctx) => {
        ctx.reply('Please enter your age');
        bot.on('text', (ctx) => {
            DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, null, parseInt(ctx.message.text)));
            ctx.reply(`Your age has been set to ${ctx.message.text}`, {
                reply_markup: {
                    keyboard: [
                        [
                            {text: 'Sex'},
                            {text: 'Age'}
                        ],
                        [
                            {text: 'Back'},
                            {text: 'Done'}
                        ]
                    ], resize_keyboard: true
                }
            });
        })
    });

    bot.hears('Partner', (ctx) => {
        ctx.reply("Partner's Info", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'SEX'},
                        {text: 'AGE'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('SEX', (ctx) => {
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
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, Sex.MALE, null));
        ctx.reply("Your partner's sex has been set to male", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'SEX'},
                        {text: 'AGE'}
                    ],
                    [
                        {text: 'Back'},
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('FEMALE', (ctx) => {
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, Sex.FEMALE, null));
        ctx.reply("Your partner's sex has been set to female", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'SEX'},
                        {text: 'AGE'}
                    ],
                    [
                        {text: 'Back'},
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('UNSPECIFIED', (ctx) => {
        DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, Sex.UNSPECIFIED, null));
        ctx.reply("Your partner's sex isn't specified", {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'SEX'},
                        {text: 'AGE'}
                    ],
                    [
                        {text: 'Back'},
                        {text: 'Done'}
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('AGE', (ctx) => {
        ctx.reply('Please enter your partners age');
        bot.on('text', (ctx) => {
            //TODO check if the value entered is valid
            DataBaseManager.updateUserData(new User(ctx.message.chat.id, null, null, null, null, null, parseInt(ctx.message.text)));
            ctx.reply(`Your partner's age has been set to ${ctx.message.text}`, {
                reply_markup: {
                    keyboard: [
                        [
                            {text: 'SEX'},
                            {text: 'AGE'}
                        ],
                        [
                            {text: 'Back'},
                            {text: 'Done'}
                        ]
                    ], resize_keyboard: true
                }
            });
        })
    });

    bot.hears('Back', (ctx) => {
        ctx.reply('Main Menu', {
            reply_markup: {
                keyboard: [
                    [
                        {text: 'You'},
                        {text: 'Partner'}
                    ],
                ], resize_keyboard: true,
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
