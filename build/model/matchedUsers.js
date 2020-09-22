"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchedUsers = /** @class */ (function () {
    function MatchedUsers(userOneId, userTwoId, partnerHasLeft) {
        if (partnerHasLeft === void 0) { partnerHasLeft = false; }
        this.userOneId = userOneId;
        this.userTwoId = userTwoId;
        this.partnerHasLeft = partnerHasLeft;
    }
    ;
    MatchedUsers.prototype.toJson = function () {
        return {
            userOneId: this.userOneId,
            userTwoId: this.userTwoId,
            partnerHasLeft: this.partnerHasLeft
        };
    };
    MatchedUsers.fromJson = function (json) {
        if (json) {
            return new MatchedUsers(json.userOneId, json.userTwoId, json.partnerHasLeft);
        }
        return null;
    };
    MatchedUsers.prototype.getOpponentId = function (userId) {
        return userId == this.userOneId ? this.userTwoId : this.userOneId;
    };
    return MatchedUsers;
}());
exports.default = MatchedUsers;
//# sourceMappingURL=matchedUsers.js.map