import Telegraf from "telegraf";
import LocalSession = require('telegraf-session-local');
import * as Session from 'telegraf/session';
import * as Scene from 'telegraf/scenes/base';
import * as Stage from 'telegraf/stage';

import config from "./config/config";
import hears from './hears';
import command from './commands';
import chatScene from "./chatScene";

const bot = new Telegraf(config.BOT_TOKEN);
const chatRoom = new Scene('chatRoom');
const stage = new Stage();
const session = new LocalSession();

stage.register(chatRoom);

bot.use(session);
bot.use(stage.middleware());

command(bot, session);
hears(bot);
chatScene(chatRoom, session);

bot.launch();

