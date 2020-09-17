import {Sex} from '../sex';
export default class User {
    constructor(
        public userId: number,
        public firstName?: string,
        public userName?: string,
        public sex?: Sex,
        public partnerSex?: Sex,
    ) {
    };

    toJson() {
        return {
            userId: this.userId,
            firstName: this.firstName,
            userName: this.userName,
            sex: this.sex,
            partnerSex: this.partnerSex,
        }
    }

    static fromJson(json): User {
        if (json) {
            return new User(json.userId, json.firstName,json.userName,
                json.sex, json.partnerSex
            );
        }
        return null;
    }
}

