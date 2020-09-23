"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseManager_1 = require("./databaseManager");
var user_1 = require("./model/user");
var sex_1 = require("./sex");
exports.default = (function (bot) {
    bot.hears('Your Sex', function (ctx) {
        ctx.reply('Your Sex', {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Male 👨' },
                        { text: 'Female 👩' }
                    ], [{ text: 'Unspecified' }]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Male 👨', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, sex_1.Sex.MALE));
        ctx.reply('Your Sex has been set to Male', {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Your Sex' },
                        { text: "Partner's Sex" }
                    ],
                    [
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Female 👩', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, sex_1.Sex.FEMALE));
        ctx.reply('Your Sex has been set to Female', {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Your Sex' },
                        { text: "Partner's Sex" }
                    ],
                    [
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
                        { text: 'Your Sex' },
                        { text: "Partner's Sex" }
                    ],
                    [
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears("Partner's Sex", function (ctx) {
        ctx.reply("Your partner's sex", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'MALE 👨' },
                        { text: 'FEMALE 👩' }
                    ],
                    [
                        { text: 'UNSPECIFIED' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('MALE 👨', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, null, sex_1.Sex.MALE));
        ctx.reply("Your partner's sex has been set to male", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Your Sex' },
                        { text: "Partner's Sex" }
                    ],
                    [
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('FEMALE 👩', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, null, sex_1.Sex.FEMALE));
        ctx.reply("Your partner's sex has been set to female", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Your Sex' },
                        { text: "Partner's Sex" }
                    ],
                    [
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('UNSPECIFIED', function (ctx) {
        databaseManager_1.default.updateUserData(new user_1.default(ctx.message.chat.id, null, null, null, sex_1.Sex.UNSPECIFIED));
        ctx.reply("Your partner's sex isn't specified", {
            reply_markup: {
                keyboard: [
                    [
                        { text: 'Your Sex' },
                        { text: "Partner's Sex" }
                    ],
                    [
                        { text: 'Done' }
                    ]
                ], resize_keyboard: true
            }
        });
    });
    bot.hears('Done', function (ctx) {
        ctx.reply('Setup Complete 🤗', {
            reply_markup: {
                remove_keyboard: true
            }
        });
    });
});
//# sourceMappingURL=hears.js.map