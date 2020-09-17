import config from './config/config';
import User from './model/user';
import {MongoClient} from "mongodb";

export default {
    async getUserFromDatabase(userId: number) {
        const database = await MongoClient.connect(config.DATABASE_URL, {useUnifiedTopology: true});
        const myDataBase = await database.db('GabBot');
        const userJson = await myDataBase.collection('userPreference').findOne({userId: userId});
        return User.fromJson(userJson);
    },
    async addUserToDatabase(user: User) {
        const database = await MongoClient.connect(config.DATABASE_URL, {useUnifiedTopology: true});
        const myDataBase = await database.db('GabBot');
        await myDataBase.collection('userPreference').insertOne(user.toJson(), (error, response) => {
            if (error) throw error;
        });
        return null;
    },
    async updateUserData(user: User) {
        const database = await MongoClient.connect(config.DATABASE_URL, {useUnifiedTopology: true});
        const myDataBase = await database.db('GabBot');
        const saved = await myDataBase.collection('userPreference').findOne({userId: user.userId});
        myDataBase.collection('userPreference').updateOne({userId: user.userId}, {
            $set: {
                userId: user.userId,
                firstName: user.firstName==null?saved.firstName:user.firstName,
                userName: user.userName==null?saved.userName:user.userName,
                sex: user.sex==null?saved.sex:user.sex,
                partnerSex: user.partnerSex==null?saved.partnerSex:user.partnerSex,
            }
        }, (error, response) => {
            if (error) throw error;
            database.close();
        });
        return null;
    },
    async deleteUserFromDatabase(userId: String) {
        const database = await MongoClient.connect(config.DATABASE_URL, {useUnifiedTopology: true});
        const myDataBase = await database.db('GabBot');
        myDataBase.collection('userPreference').deleteOne({userId: userId}, (error, response) => {
            if (error) throw error;
            database.close();
            return response;
        });
        return null;
    }
}