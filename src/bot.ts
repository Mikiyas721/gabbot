import Telegraf from "telegraf";
import config from "./config/config";
import * as Session from 'telegraf/session';
import * as Scene from 'telegraf/scenes/base';
import * as Stage from 'telegraf/stage';

import hears from './hears';
import command from './commands';
import callBack from './callbackQueryHandler';
import chatScene from "./chatScene";

const bot = new Telegraf(config.BOT_TOKEN);
const chatRoom = new Scene('chatRoom');
const stage = new Stage();
const session = Session()

stage.register(chatRoom);

bot.use(session);
bot.use(stage.middleware());

command(bot);
hears(bot);
callBack(bot);
chatScene(chatRoom, session);

bot.launch();
