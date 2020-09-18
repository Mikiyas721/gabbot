import Telegraf from "telegraf";
import config from "./config/config";
import * as Session from 'telegraf/session';
import * as Scene from 'telegraf/scenes/base';
import * as Stage from 'telegraf/stage';

import hears from './hears';
import command from './commands';
import callBack from './callbackQueryHandler';

const bot = new Telegraf(config.BOT_TOKEN);
const chattingScene = new Scene('chatScene');
const stage = new Stage();

stage.register(chattingScene);

bot.use(Session());
bot.use(stage.middleware());

command(bot,chattingScene);
hears(bot);
callBack(bot);

bot.launch();
