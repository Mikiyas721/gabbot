import config from './config/config';
import User from './model/user';
import MatchedUsers from "./model/matchedUsers";
import {MongoClient} from "mongodb";

async function setUpDatabaseConnection() {
    const database = await MongoClient.connect(config.DATABASE_URL, {useUnifiedTopology: true});
    return await database.db('GabBot');
}

export default {
    async getUserFromDatabase(userId: number): Promise<User> {
        const database = await setUpDatabaseConnection();
        const userJson = await database.collection('userPreference').findOne({userId: userId});
        return User.fromJson(userJson);
    },
    async getPendingUsers(thisUser: User): Promise<object[]> {
        const database = await setUpDatabaseConnection();
        const cursor = await database.collection('pendingUsers').find({$and: [{partnerSex: thisUser.sex}, {sex: thisUser.partnerSex}]});
        let pendingList: object[] = [];
        let hasValue = true;
        while (hasValue) {
            let document = await cursor.next();
            if (document === null) hasValue = false;
            else pendingList.push(document);
        }
        return pendingList;
    },
    async addUserToDatabase(isPending, user: User) {
        let collection: string;
        collection = isPending ? "pendingUsers" : "userPreference";
        const database = await setUpDatabaseConnection();
        await database.collection(collection).insertOne(user.toJson(), (error, response) => {
            if (error) throw error;
        });
        return null;
    },
    async updateUserData(user: User) {
        const database = await setUpDatabaseConnection();
        const saved = await database.collection('userPreference').findOne({userId: user.userId});
        database.collection('userPreference').updateOne({userId: user.userId}, {
            $set: {
                userId: user.userId,
                firstName: user.firstName == null ? saved.firstName : user.firstName,
                userName: user.userName == null ? saved.userName : user.userName,
                sex: user.sex == null ? saved.sex : user.sex,
                partnerSex: user.partnerSex == null ? saved.partnerSex : user.partnerSex,
            }
        }, (error, response) => {
            if (error) throw error;
        });
    },
    async deleteUserFromDatabase(isPending: boolean, userId: number) {
        let collection: string;
        collection = isPending ? "pendingUsers" : "userPreference";
        const database = await setUpDatabaseConnection();
        database.collection(collection).deleteOne({userId: userId}, (error, response) => {
            if (error) throw error;
        });
    },

    /** MatchedUsers **/

    async getMatchedUsers(userId: number): Promise<MatchedUsers> {
        const database = await setUpDatabaseConnection();
        const matchedJson = await database.collection('matchedUsers').findOne({$or: [{userOneId: userId}, {userTwoId: userId}]});
        return MatchedUsers.fromJson(matchedJson);
    },
    async registerMatchedUsers(matchedUsers: MatchedUsers) {
        const database = await setUpDatabaseConnection();
        await database.collection('matchedUsers').insertOne(matchedUsers.toJson(), (error, response) => {
            if (error) throw error;
        });
    },
    async updateMatched(matched: MatchedUsers) {
        const database = await setUpDatabaseConnection();
        database.collection('matchedUsers').updateOne({$or: [{userOneId: matched.userOneId}, {userOneId: matched.userTwoId}]}, {
            $set: {
                userOneId: matched.userOneId,
                userTwoId: matched.userTwoId,
                partnerHasLeft: matched.partnerHasLeft
            }
        }, (error, response) => {
            if (error) throw error;
        });
    },
    async deleteMatchedUsers(userOneId: number) {
        const database = await setUpDatabaseConnection();
        await database.collection('matchedUsers').deleteOne({$or: [{userOneId: userOneId}, {userTwoId: userOneId}]}, (error, response) => {
            if (error) throw error;
        });
    },
    async hasPartnerLeft(matched: MatchedUsers): Promise<boolean> {
        const database = await setUpDatabaseConnection();
        const json = await database.collection('matchedUsers').findOne({$or: [{userOneId: matched.userOneId}, {userOneId: matched.userTwoId}]});
        return json.partnerHasLeft;
    }


}