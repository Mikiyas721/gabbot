export default class Confirmation {
    public isConfirmed?: boolean;

    constructor(
        public senderId: number,
        public receiverId: number,
        isConfirmed = false,
    ) {
        this.isConfirmed = isConfirmed;
    };

    toJson() {
        return {
            senderId: this.senderId,
            receiverId: this.receiverId,
            isConfirmed: this.isConfirmed,
        }
    }

    static fromJson(json): Confirmation {
        if (json) {
            return new Confirmation(json.senderId, json.receiverId, json.isConfirmed);
        }
        return null;
    }
}