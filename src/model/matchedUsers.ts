export default class MatchedUsers {
    constructor(
        public userOneId: number,
        public userTwoId: number,
        public partnerHasLeft: boolean = false
    ) {
    };

    toJson() {
        return {
            userOneId: this.userOneId,
            userTwoId: this.userTwoId,
            partnerHasLeft: this.partnerHasLeft
        }
    }

    static fromJson(json): MatchedUsers {
        if (json) {
            return new MatchedUsers(json.userOneId, json.userTwoId, json.partnerHasLeft);
        }
        return null;
    }

    getOpponentId(userId: number): number {
        return userId == this.userOneId ? this.userTwoId : this.userOneId;
    }
}