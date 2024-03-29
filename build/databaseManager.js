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
var config_1 = require("./config/config");
var user_1 = require("./model/user");
var matchedUsers_1 = require("./model/matchedUsers");
var mongodb_1 = require("mongodb");
var sex_1 = require("./sex");
function setUpDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function () {
        var database;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect(config_1.config.DATABASE_URL, { useUnifiedTopology: true })];
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
            var database, cursor, pendingList, hasValue, document_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        if (!(thisUser.partnerSex == sex_1.Sex.UNSPECIFIED && thisUser.sex == sex_1.Sex.UNSPECIFIED)) return [3 /*break*/, 3];
                        return [4 /*yield*/, database.collection('pendingUsers').find({})];
                    case 2:
                        cursor = _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!(thisUser.partnerSex == sex_1.Sex.UNSPECIFIED)) return [3 /*break*/, 5];
                        return [4 /*yield*/, database.collection('pendingUsers').find({ partnerSex: thisUser.sex })];
                    case 4:
                        cursor = _a.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(thisUser.sex == sex_1.Sex.UNSPECIFIED)) return [3 /*break*/, 7];
                        return [4 /*yield*/, database.collection('pendingUsers').find({ sex: thisUser.partnerSex })];
                    case 6:
                        cursor = _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, database.collection('pendingUsers').find({ $and: [{ partnerSex: thisUser.sex }, { sex: thisUser.partnerSex }] })];
                    case 8:
                        cursor = _a.sent();
                        _a.label = 9;
                    case 9:
                        pendingList = [];
                        hasValue = true;
                        _a.label = 10;
                    case 10:
                        if (!hasValue) return [3 /*break*/, 12];
                        return [4 /*yield*/, cursor.next()];
                    case 11:
                        document_1 = _a.sent();
                        if (document_1 === null)
                            hasValue = false;
                        else
                            pendingList.push(document_1);
                        return [3 /*break*/, 10];
                    case 12: return [2 /*return*/, pendingList];
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
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    getAllUsers: function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, database, cursor, hasValue, document_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allUsers = [];
                        return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('userPreference').find({})];
                    case 2:
                        cursor = _a.sent();
                        hasValue = true;
                        _a.label = 3;
                    case 3:
                        if (!hasValue) return [3 /*break*/, 5];
                        return [4 /*yield*/, cursor.next()];
                    case 4:
                        document_2 = _a.sent();
                        if (document_2 === null)
                            hasValue = false;
                        else
                            allUsers.push(document_2);
                        return [3 /*break*/, 3];
                    case 5: return [2 /*return*/, allUsers];
                }
            });
        });
    },
    /** MatchedUsers **/
    getMatchedUsers: function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var database, matchedJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('matchedUsers').findOne({ $or: [{ userOneId: userId }, { userTwoId: userId }] })];
                    case 2:
                        matchedJson = _a.sent();
                        return [2 /*return*/, matchedUsers_1.default.fromJson(matchedJson)];
                }
            });
        });
    },
    registerMatchedUsers: function (matchedUsers) {
        return __awaiter(this, void 0, void 0, function () {
            var database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('matchedUsers').insertOne(matchedUsers.toJson(), function (error, response) {
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
    updateMatched: function (matched) {
        return __awaiter(this, void 0, void 0, function () {
            var database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        database.collection('matchedUsers').updateOne({ $or: [{ userOneId: matched.userOneId }, { userOneId: matched.userTwoId }] }, {
                            $set: {
                                userOneId: matched.userOneId,
                                userTwoId: matched.userTwoId,
                                partnerHasLeft: matched.partnerHasLeft
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
    deleteMatchedUsers: function (userOneId) {
        return __awaiter(this, void 0, void 0, function () {
            var database;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('matchedUsers').deleteOne({ $or: [{ userOneId: userOneId }, { userTwoId: userOneId }] }, function (error, response) {
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
    hasPartnerLeft: function (matched) {
        return __awaiter(this, void 0, void 0, function () {
            var database, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setUpDatabaseConnection()];
                    case 1:
                        database = _a.sent();
                        return [4 /*yield*/, database.collection('matchedUsers').findOne({ $or: [{ userOneId: matched.userOneId }, { userOneId: matched.userTwoId }] })];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, json == null ? true : json.partnerHasLeft];
                }
            });
        });
    },
};
//# sourceMappingURL=databaseManager.js.map