"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sex;
(function (Sex) {
    Sex[Sex["MALE"] = 0] = "MALE";
    Sex[Sex["FEMALE"] = 1] = "FEMALE";
    Sex[Sex["UNSPECIFIED"] = 2] = "UNSPECIFIED";
})(Sex = exports.Sex || (exports.Sex = {}));
function mapSex(sexValue) {
    if (sexValue == 0)
        return Sex.MALE;
    else if (sexValue == 1)
        return Sex.FEMALE;
    else if (sexValue == 2)
        return Sex.UNSPECIFIED;
}
exports.default = mapSex;
//# sourceMappingURL=sex.js.map