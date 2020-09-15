class User {
    constructor(
        public userId: string,
        public userName: string,
        public sex: Sex,
        public age: number,
        public partnerSex: Sex,
        public partnerAge: number
    ) {
    };

    toJson() {
        return {
            userId: this.userId,
            userName: this.userName,
            sex: this.sex,
            age: this.age,
            partnerSex: this.partnerSex,
            partnerAge: this.partnerAge
        }
    }

    static fromJson(json): User {
        if (json) {
            return new User(json.userId, json.userName,
                json.sex, json.age, json.partnerSex, json.partnerAge
            );
        }
        return null;
    }
}

enum Sex {
    MALE,
    FEMALE,
}
