export default class MatchedUsers {
    constructor(
        public firstUserId: number,
        public secondUserId: number,
    ) {
    };

    toJson() {
        return {
            firstUserId: this.firstUserId,
            secondUserId: this.secondUserId,
        }
    }

    static fromJson(json): MatchedUsers {
        if (json) {
            return new MatchedUsers(json.firstUserId, json.secondUserId);
        }
        return null;
    }
}