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
        while(hasValue){
            let document = await cursor.next();
            if(document===null) hasValue = false;
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

    async getMatchedUser(userId: number): Promise<MatchedUsers> {
        const database = await setUpDatabaseConnection();
        const matchedJson = await database.collection('matchedUsers').findOne({$or:[{firstUserId: userId},{secondUserId: userId}]});
        return MatchedUsers.fromJson(matchedJson);
    },
    async registerMatchedUsers(matchedUsers: MatchedUsers) {
        const database = await setUpDatabaseConnection();
        await database.collection('matchedUsers').insertOne(matchedUsers.toJson(), (error, response) => {
            if (error) throw error;
        });
    },
    async updateMatched(confirm: MatchedUsers) {
        const database = await setUpDatabaseConnection();
        database.collection('matchedUsers').updateOne({firstUserId: confirm.firstUserId}, {
            $set: {
                firstUserId: confirm.firstUserId,
                secondUserId: confirm.secondUserId,
            }
        }, (error, response) => {
            if (error) throw error;
        });
    },
    async deleteMatchedUsers(firstUserId: number) {
        const database = await setUpDatabaseConnection();
        await database.collection('matchedUsers').deleteOne({firstUserId: firstUserId}, (error, response) => {
            if (error) throw error;
        });
    },


}