var User = /** @class */ (function () {
    function User(userId, userName, sex, age, partnerSex, partnerAge) {
        this.userId = userId;
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
            userName: this.userName,
            sex: this.sex,
            age: this.age,
            partnerSex: this.partnerSex,
            partnerAge: this.partnerAge
        };
    };
    User.fromJson = function (json) {
        if (json) {
            return new User(json.userId, json.userName, json.sex, json.age, json.partnerSex, json.partnerAge);
        }
        return null;
    };
    return User;
}());
var Sex;
(function (Sex) {
    Sex[Sex["MALE"] = 0] = "MALE";
    Sex[Sex["FEMALE"] = 1] = "FEMALE";
})(Sex || (Sex = {}));
//# sourceMappingURL=user.js.map