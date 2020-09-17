"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(userId, firstName, userName, sex, age, partnerSex, partnerAge) {
        this.userId = userId;
        this.firstName = firstName;
        this.userName = userName;
        this.sex = sex;
        this.age = age;
        this.partnerSex = partnerSex;
        this.partnerAge = partnerAge;
    }
    ;
    User.prototype.toJson = function () {
        return {
            userId: this.userId,
            firstName: this.firstName,
            userName: this.userName,
            sex: this.sex,
            age: this.age,
            partnerSex: this.partnerSex,
            partnerAge: this.partnerAge
        };
    };
    User.fromJson = function (json) {
        if (json) {
            return new User(json.userId, json.firstName, json.userName, json.sex, json.age, json.partnerSex, json.partnerAge);
        }
        return null;
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=user.js.map