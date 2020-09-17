"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(userId, firstName, userName, sex, partnerSex) {
        this.userId = userId;
        this.firstName = firstName;
        this.userName = userName;
        this.sex = sex;
        this.partnerSex = partnerSex;
    }
    ;
    User.prototype.toJson = function () {
        return {
            userId: this.userId,
            firstName: this.firstName,
            userName: this.userName,
            sex: this.sex,
            partnerSex: this.partnerSex,
        };
    };
    User.fromJson = function (json) {
        if (json) {
            return new User(json.userId, json.firstName, json.userName, json.sex, json.partnerSex);
        }
        return null;
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=user.js.map