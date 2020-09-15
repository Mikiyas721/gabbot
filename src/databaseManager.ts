import config from './config/config';
import Mongo from '../node_modules/mongodb';

export default {
    async getUserFromDatabase(userName: string) {
        const database = await Mongo.connect(config.DATABASE_URL, {useUnifiedTopology: true});
        const myDataBase = await database.db('GabBot');
        const userJson = await myDataBase.collection('userPreference').findOne({userName: userName});
        return User.fromJson(userJson);
    },
    async addUserToDatabase(user: User) {
        const database = await Mongo.connect(config.DATABASE_URL, {useUnifiedTopology: true});
        const myDataBase = await database.db('GabBot');
        await myDataBase.collection('userPreference').insertOne(user.toJson(), (error, response) => {
            if (error) throw error;
        });
        return null;
    },
    async updateUserToDatabase(user: User) {
        const database = await Mongo.connect(config.DATABASE_URL, {useUnifiedTopology: true});
        const myDataBase = await database.db('GabBot');
        myDataBase.collection('userPreference').updateOne({userId: user.userId}, {
            $set: user
        }, (error, response) => {
            if (error) throw error;
            database.close();
        });
        return null;
    },
    async deleteUserFromDatabase(userId: String) {
        const database = await Mongo.connect(config.DATABASE_URL, {useUnifiedTopology: true});
        const myDataBase = await database.db('GabBot');
        myDataBase.collection('userPreference').deleteOne({userId: userId}, (error, response) => {
            if (error) throw error;
            database.close();
            return response;
        });
        return null;
    }
}