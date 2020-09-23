"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var databaseManager_1 = require("./databaseManager");
var sex_1 = require("./sex");
var user_1 = require("./model/user");
var matchedUsers_1 = require("./model/matchedUsers");
function getRandomPartner(user) {
    return __awaiter(this, void 0, void 0, function () {
        var pendingUsers, random, randomPartner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, databaseManager_1.default.getPendingUsers(user)];
                case 1:
                    pendingUsers = _a.sent();
                    if (pendingUsers.length !== 0) {
                        random = Math.floor(Math.random() * pendingUsers.length);
                        randomPartner = pendingUsers[random];
                        return [2 /*return*/, randomPartner.userId];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
exports.default = (function (bot) {
    bot.start(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setDefault(ctx)];
                case 1:
                    _a.sent();
                    ctx.reply('Welcome');
                    return [2 /*return*/];
            }
        });
    }); });
    bot.command('help', function (ctx) {
        exports.onHelp(ctx);
    });
    bot.command('setup', function (ctx) {
        exports.onSetUp(ctx);
    });
    bot.command('begin', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.onBegin(ctx)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    bot.command('end', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.reply("Looking for partner has been stopped 😔. Enter the /begin command if you want to start looking again 🙂.")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, databaseManager_1.default.deleteUserFromDatabase(true, ctx.chat.id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    bot.command('users', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var users, usersList_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(ctx.chat.id == 262164706)) return [3 /*break*/, 3];
                    return [4 /*yield*/, databaseManager_1.default.getAllUsers()];
                case 1:
                    users = _a.sent();
                    usersList_1 = "<b>User count is " + users.length + "</b>\n\n";
                    users.forEach(function (user) {
                        usersList_1 += user.firstName + " -- @" + user.userName + "\n";
                    });
                    return [4 /*yield*/, ctx.reply(usersList_1, { parse_mode: "HTML" })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    bot.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var myId, match;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    myId = ctx.chat.id;
                    return [4 /*yield*/, databaseManager_1.default.getMatchedUsers(myId)];
                case 1:
                    match = _a.sent();
                    if (!match) return [3 /*break*/, 4];
                    return [4 /*yield*/, ctx.telegram.sendMessage(match.getOpponentId(myId), ctx.message.text)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.enter('chatRoom', { partnerId: match.getOpponentId(myId) })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, ctx.reply("You aren't in a chat")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); });
    var setDefault = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var x;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, databaseManager_1.default.getUserFromDatabase(ctx.message.chat.id)];
                case 1:
                    x = _a.sent();
                    if (!!x) return [3 /*break*/, 3];
                    return [4 /*yield*/, databaseManager_1.default.addUserToDatabase(false, new user_1.default(ctx.message.chat.id, ctx.message.chat.first_name, ctx.message.chat.username, sex_1.Sex.UNSPECIFIED, sex_1.Sex.UNSPECIFIED))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
});
exports.onBegin = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var user, partnerId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, databaseManager_1.default.getUserFromDatabase(ctx.chat.id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, getRandomPartner(user)];
            case 2:
                partnerId = _a.sent();
                if (!partnerId) return [3 /*break*/, 8];
                return [4 /*yield*/, databaseManager_1.default.registerMatchedUsers(new matchedUsers_1.default(ctx.chat.id, partnerId))];
            case 3:
                _a.sent();
                return [4 /*yield*/, databaseManager_1.default.deleteUserFromDatabase(true, partnerId)];
            case 4:
                _a.sent();
                return [4 /*yield*/, ctx.scene.enter('chatRoom', { partnerId: partnerId })];
            case 5:
                _a.sent();
                return [4 /*yield*/, ctx.reply('Your partner is here 😊. Have a nice chat')];
            case 6:
                _a.sent();
                return [4 /*yield*/, ctx.telegram.sendMessage(partnerId, "Your partner is here \uD83D\uDE0A. Have a nice chat.")];
            case 7:
                _a.sent();
                return [3 /*break*/, 11];
            case 8: return [4 /*yield*/, ctx.reply("Unfortunately, I couldn't find a partner now 😔.I will keep searching 🧐 and match you as soon as possible 🙂")];
            case 9:
                _a.sent();
                return [4 /*yield*/, databaseManager_1.default.addUserToDatabase(true, user)];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.onHelp = function (ctx) {
    var message = '<b>Welcome to GabBot 🤗</b>\n\nThis bot matches you with a random person of your preferred sex. It has a default preference of unspecified sex for you and your partner, you can change that using the /setup command. Once you are done setting up, you can use the /begin command to start looking for a partner. When you get matched you must always <i><u>start with a text message</u></i>. \n\n<b>Command Reference</b>\n/begin - Begin looking for partner\n/end - End Chat\n/help - Command reference\n/setup - Setup preference\n/start - Start Bot';
    ctx.telegram.sendMessage(ctx.chat.id, message, { parse_mode: "HTML" });
};
exports.onSetUp = function (ctx) {
    ctx.reply('Please fill in your information and the preference for your potential partner.', {
        reply_markup: {
            keyboard: [
                [{ text: 'Your Sex' }, { text: "Partner's Sex" }]
            ], resize_keyboard: true
        }
    });
};
//# sourceMappingURL=commands.js.map