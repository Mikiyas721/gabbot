"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseManager_1 = require("./databaseManager");
var user_1 = require("./model/user");
var sex_1 = require("./sex");
exports.default = (function (bot) {
    bot.hears('You', function (ctx) {
        ctx.reply('Your Info', {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Sex' },
                        { text: 'Age' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Sex', function (ctx) {
        ctx.reply('Your Sex', {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Male' },
                        { text: 'Female' }
                    ], [{ text: 'Unspecified' }]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Male', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, sex_1.Sex.MALE));
        ctx.reply('Your Sex has been set to Male', {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Sex' },
                        { text: 'Age' }
                    ],
                    [
                        { text: 'Back' },
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Female', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, sex_1.Sex.FEMALE));
        ctx.reply('Your Sex has been set to Female', {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Sex' },
                        { text: 'Age' }
                    ],
                    [
                        { text: 'Back' },
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Unspecified', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, sex_1.Sex.UNSPECIFIED));
        ctx.reply("Your Sex isn't specified", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Sex' },
                        { text: 'Age' }
                    ],
                    [
                        { text: 'Back' },
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Age', function (ctx) {
        ctx.reply('Please enter your age');
        bot.on('text', function (ctx) {
            databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, null, parseInt(ctx.message.text)));
            ctx.reply("Your age has been set to " + ctx.message.text, {
                reply_markup: {
                    keyboard: [
                        [
                            { text: 'Sex' },
                            { text: 'Age' }
                        ],
                        [
                            { text: 'Back' },
                            { text: 'Done' }
                        ]
                    ], resize_keyboard: true
                }
            });
        });
    });
    bot.hears('Partner', function (ctx) {
        ctx.reply("Partner's Info", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'SEX' },
                        { text: 'AGE' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('SEX', function (ctx) {
        ctx.reply("Your partner's sex", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'MALE' },
                        { text: 'FEMALE' }
                    ],
                    [
                        { text: 'UNSPECIFIED' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('MALE', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, sex_1.Sex.MALE, null));
        ctx.reply("Your partner's sex has been set to male", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'SEX' },
                        { text: 'AGE' }
                    ],
                    [
                        { text: 'Back' },
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('FEMALE', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, sex_1.Sex.FEMALE, null));
        ctx.reply("Your partner's sex has been set to female", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'SEX' },
                        { text: 'AGE' }
                    ],
                    [
                        { text: 'Back' },
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('UNSPECIFIED', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, sex_1.Sex.UNSPECIFIED, null));
        ctx.reply("Your partner's sex isn't specified", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'SEX' },
                        { text: 'AGE' }
                    ],
                    [
                        { text: 'Back' },
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('AGE', function (ctx) {
        ctx.reply('Please enter your partners age');
        bot.on('text', function (ctx) {
            //TODO check if the value entered is valid
            databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, null, null, null, parseInt(ctx.message.text)));
            ctx.reply("Your partner's age has been set to " + ctx.message.text, {
                reply_markup: {
                    keyboard: [
                        [
                            { text: 'SEX' },
                            { text: 'AGE' }
                        ],
                        [
                            { text: 'Back' },
                            { text: 'Done' }
                        ]
                    ], resize_keyboard: true
                }
            });
        });
    });
    bot.hears('Back', function (ctx) {
        ctx.reply('Main Menu', {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'You' },
                        { text: 'Partner' }
                    ],
                ], resize_keyboard: true,
            }
        });
    });
    bot.hears('Done', function (ctx) {
        ctx.reply('Setup Complete', {
            reply_markup: {
                remove_keyboard: true
            }
        });
    });
});
//# sourceMappingURL=hears.js.map