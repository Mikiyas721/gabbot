import config from './config/config';
import User from './model/user';
import Confirmation from "./model/confirm";
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
    async addUserToDatabase(isPending, user: User) {
        let collection: string;
        collection = isPending ? "pendingUser" : "userPreference";
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
            database.close();
        });
    },
    async deleteUserFromDatabase(isPending: string, userId: String) {
        let collection: string;
        collection = isPending ? "pendingUser" : "userPreference";
        const database = await setUpDatabaseConnection();
        database.collection(collection).deleteOne({userId: userId}, (error, response) => {
            if (error) throw error;
            database.close();
            return response;
        });
    },

    /** Confirmation **/

    async getConfirmationFromDatabase(senderId: number): Promise<Confirmation> {
        const database = await setUpDatabaseConnection();
        const confirmationJson = await database.collection('confirmationDetails').findOne({senderId: senderId});
        return Confirmation.fromJson(confirmationJson);
    },
    async registerConfirmationRequest(confirm: Confirmation) {
        const database = await setUpDatabaseConnection();
        await database.collection('confirmationDetails').insertOne(confirm.toJson(), (error, response) => {
            if (error) throw error;
        });
    },
    async updateConfirmation(confirm: Confirmation) {
        const database = await setUpDatabaseConnection();
        database.collection('confirmationDetails').updateOne({senderId: confirm.senderId}, {
            $set: {
                senderId: confirm.senderId,
                receiverId: confirm.receiverId,
                isConfirmed: confirm.isConfirmed,
            }
        }, (error, response) => {
            if (error) throw error;
            database.close();
        });
    },
    async deleteConfirmationRequest(senderId: number) {
        const database = await setUpDatabaseConnection();
        await database.collection('confirmationDetails').deleteOne({senderId: senderId}, (error, response) => {
            if (error) throw error;
            database.close();
        });
    },

    /** Looking for partner **/


}