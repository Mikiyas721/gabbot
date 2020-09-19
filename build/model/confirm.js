"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Confirmation = /** @class */ (function () {
    function Confirmation(senderId, receiverId, isConfirmed) {
        if (isConfirmed === void 0) { isConfirmed = false; }
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.isConfirmed = isConfirmed;
    }
    ;
    Confirmation.prototype.toJson = function () {
        return {
            senderId: this.senderId,
            receiverId: this.receiverId,
            isConfirmed: this.isConfirmed,
        };
    };
    Confirmation.fromJson = function (json) {
        if (json) {
            return new Confirmation(json.senderId, json.receiverId, json.isConfirmed);
        }
        return null;
    };
    return Confirmation;
}());
exports.default = Confirmation;
//# sourceMappingURL=confirm.js.map