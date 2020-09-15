import Telegraf from "telegraf";
import config from "./config/config";
import hears from './hears';
import command from './commands';

const bot = new Telegraf(config.BOT_TOKEN);



command(bot);
hears(bot);
bot.launch();
