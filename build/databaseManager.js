"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var config_1 = require("./config/config");
var user_1 = require("./model/user");
var confirm_1 = require("./model/confirm");
var mongodb_1 = require("mongodb");
function setUpDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var database;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect(config_1.default.DATABASE_URL, { useUnifiedTopology: true })];
                case 1:
                    database = _a.sent();
                    return [4 /*yield*/, database.db('GabBot')];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.default = {
    getUserFromDatabase: function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var database, userJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('userPreference').findOne({ userId: userId })];
                    case 2:
                        userJson = _a.sent();
                        return [2 /*return*/, user_1.default.fromJson(userJson)];
                }
            });
        });
    },
    getPendingUsers: function (thisUser) {
        return __awaiter(this, void 0, void 0, function () {
            var database, cursor, pendingList, hasValue, document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('pendingUsers').find({ $and: [{ partnerSex: thisUser.sex }, { sex: thisUser.partnerSex }] })];
                    case 2:
                        cursor = _a.sent();
                        pendingList = [];
                        hasValue = true;
                        _a.label = 3;
                    case 3:
                        if (!hasValue) return [3 /*break*/, 5];
                        return [4 /*yield*/, cursor.next()];
                    case 4:
                        document = _a.sent();
                        if (document === null)
                            hasValue = false;
                        else
                            pendingList.push(document);
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, pendingList];
                }
            });
        });
    },
    addUserToDatabase: function (isPending, user) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = isPending ? "pendingUsers" : "userPreference";
                        return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection(collection).insertOne(user.toJson(), function (error, response) {
                                if (error)
                                    throw error;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                }
            });
        });
    },
    updateUserData: function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var database, saved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('userPreference').findOne({ userId: user.userId })];
                    case 2:
                        saved = _a.sent();
                        database.collection('userPreference').updateOne({ userId: user.userId }, {
                            $set: {
                                userId: user.userId,
                                firstName: user.firstName == null ? saved.firstName : user.firstName,
                                userName: user.userName == null ? saved.userName : user.userName,
                                sex: user.sex == null ? saved.sex : user.sex,
                                partnerSex: user.partnerSex == null ? saved.partnerSex : user.partnerSex,
                            }
                        }, function (error, response) {
                            if (error)
                                throw error;
                            database.close();
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    deleteUserFromDatabase: function (isPending, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collection = isPending ? "pendingUsers" : "userPreference";
                        return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        database.collection(collection).deleteOne({ userId: userId }, function (error, response) {
                            if (error)
                                throw error;
                            database.close();
                            return response;
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    /** Confirmation **/
    getConfirmationFromDatabase: function (senderId) {
        return __awaiter(this, void 0, void 0, function () {
            var database, confirmationJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('confirmationDetails').findOne({ senderId: senderId })];
                    case 2:
                        confirmationJson = _a.sent();
                        return [2 /*return*/, confirm_1.default.fromJson(confirmationJson)];
                }
            });
        });
    },
    registerConfirmationRequest: function (confirm) {
        return __awaiter(this, void 0, void 0, function () {
            var database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('confirmationDetails').insertOne(confirm.toJson(), function (error, response) {
                                if (error)
                                    throw error;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    updateConfirmation: function (confirm) {
        return __awaiter(this, void 0, void 0, function () {
            var database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        database.collection('confirmationDetails').updateOne({ senderId: confirm.senderId }, {
                            $set: {
                                senderId: confirm.senderId,
                                receiverId: confirm.receiverId,
                                isConfirmed: confirm.isConfirmed,
                            }
                        }, function (error, response) {
                            if (error)
                                throw error;
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    deleteConfirmationRequest: function (senderId) {
        return __awaiter(this, void 0, void 0, function () {
            var database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('confirmationDetails').deleteOne({ senderId: senderId }, function (error, response) {
                                if (error)
                                    throw error;
                                database.close();
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
};
//# sourceMappingURL=databaseManager.js.map