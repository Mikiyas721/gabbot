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
var matchedUsers_1 = require("./model/matchedUsers");
var commands_1 = require("./commands");
exports.default = (function (chatRoom) {
    chatRoom.on('text', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var hasLeft;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasPartnerLeft(ctx)];
                case 1:
                    hasLeft = _a.sent();
                    if (!(ctx.message.text == "/end")) return [3 /*break*/, 7];
                    if (!hasLeft) return [3 /*break*/, 2];
                    ctx.reply("You aren't in a chat");
                    return [3 /*break*/, 6];
                case 2:
                    ctx.reply('Chat ended.');
                    return [4 /*yield*/, ctx.telegram.sendMessage(ctx.scene.state.partnerId, 'Your partner has left the chat 😌. Press /begin to start looking for a partner again.')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, databaseManager_1.default.updateMatched(new matchedUsers_1.default(ctx.scene.state.partnerId, ctx.chat.id, true))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, ctx.scene.leave()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 15];
                case 7:
                    if (!(ctx.message.text == "/begin")) return [3 /*break*/, 11];
                    if (!hasLeft) return [3 /*break*/, 9];
                    return [4 /*yield*/, commands_1.onBegin(ctx)];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    ctx.reply('You are in a chat. Please first end this chat, if you want to start looking for another partner');
                    _a.label = 10;
                case 10: return [3 /*break*/, 15];
                case 11:
                    if (!(ctx.message.text == "/help")) return [3 /*break*/, 12];
                    commands_1.onHelp(ctx);
                    return [3 /*break*/, 15];
                case 12:
                    if (!(ctx.message.text == "/setup")) return [3 /*break*/, 13];
                    if (hasLeft)
                        commands_1.onSetUp(ctx);
                    else
                        ctx.reply("You can't setup your preference while you are in a chat.");
                    return [3 /*break*/, 15];
                case 13:
                    if (!!hasLeft) return [3 /*break*/, 15];
                    return [4 /*yield*/, ctx.telegram.sendMessage(ctx.scene.state.partnerId, "" + ctx.message.text)];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15: return [2 /*return*/];
            }
        });
    }); });
    chatRoom.on('audio', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var hasLeft;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasPartnerLeft(ctx)];
                case 1:
                    hasLeft = _a.sent();
                    if (!!hasLeft) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.telegram.sendAudio(ctx.scene.state.partnerId, ctx.message.file_id)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    chatRoom.on('document', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var hasLeft;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasPartnerLeft(ctx)];
                case 1:
                    hasLeft = _a.sent();
                    if (!!hasLeft) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.telegram.sendDocument(ctx.scene.state.partnerId, ctx.message.file_id)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    chatRoom.on('photo', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var hasLeft;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasPartnerLeft(ctx)];
                case 1:
                    hasLeft = _a.sent();
                    if (!!hasLeft) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.telegram.sendPhoto(ctx.scene.state.partnerId, ctx.message.file_id)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    chatRoom.on('sticker', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var hasLeft;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasPartnerLeft(ctx)];
                case 1:
                    hasLeft = _a.sent();
                    if (!!hasLeft) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.telegram.sendSticker(ctx.scene.state.partnerId, ctx.message.file_id)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    chatRoom.on('video', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var hasLeft;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasPartnerLeft(ctx)];
                case 1:
                    hasLeft = _a.sent();
                    if (!!hasLeft) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.telegram.sendVideo(ctx.scene.state.partnerId, ctx.message.file_id)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    chatRoom.on('voice', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var hasLeft;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hasPartnerLeft(ctx)];
                case 1:
                    hasLeft = _a.sent();
                    if (!!hasLeft) return [3 /*break*/, 3];
                    return [4 /*yield*/, ctx.telegram.sendVoice(ctx.scene.state.partnerId, ctx.message.file_id)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); });
    var hasPartnerLeft = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var hasLeft;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, databaseManager_1.default.hasPartnerLeft(new matchedUsers_1.default(ctx.chat.id, ctx.scene.state.partnerId))];
                case 1:
                    hasLeft = _a.sent();
                    if (!hasLeft) return [3 /*break*/, 4];
                    return [4 /*yield*/, ctx.scene.leave()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, databaseManager_1.default.deleteMatchedUsers(ctx.chat.id)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/, hasLeft];
            }
        });
    }); };
});
//# sourceMappingURL=chatScene.js.map