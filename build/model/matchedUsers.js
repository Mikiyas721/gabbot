"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchedUsers = /** @class */ (function () {
    function MatchedUsers(firstUserId, secondUserId) {
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
    }
    ;
    MatchedUsers.prototype.toJson = function () {
        return {
            firstUserId: this.firstUserId,
            secondUserId: this.secondUserId,
        };
    };
    MatchedUsers.fromJson = function (json) {
        if (json) {
            return new MatchedUsers(json.firstUserId, json.secondUserId);
        }
        return null;
    };
    return MatchedUsers;
}());
exports.default = MatchedUsers;
//# sourceMappingURL=matchedUsers.js.map