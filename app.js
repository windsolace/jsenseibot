const debug = require('debug')("jsensei");
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const Telegraf = require('telegraf');

//My modules
const JTranslate = require('./translate');
const GrammarMod = require('./modules/grammar');

const scheduleUrl = "https://goo.gl/3aNohw";
const katakanaUrl = "https://goo.gl/3QK9TG";
const hiraganaUrl = "https://goo.gl/Q3kQ5p";

const bot = new Telegraf(process.env.BOT_TOKEN, {username: 'jsenseitestbot'});

//start debugging
const name = 'jsensei';
debug('boot %s',name);

bot.start((ctx) => {
	console.log('started:', ctx.from.id)
	return ctx.reply('Welcome!')
});

//bot hears "translate-" or "Translate-"
bot.hears(/\b([Tt]ranslate)\b-/, (ctx) => {
	var message = ctx.message.text;
	debug("====================================");
	debug("Received message '" + message + "'");
	var translateSvc = new JTranslate();
	translateSvc.translate(message).then(response => {
		ctx.reply(response);
		debug("====================================");
	});
});
bot.hears(/hi/i, (ctx) => ctx.reply("I'm awake, i'm awake!"));
bot.hears('bad bot', (ctx) => ctx.reply("I'm sorry"));
bot.hears('good bot', (ctx) => ctx.reply("Thanks! <3"));

var grammarMod = new GrammarMod();
grammarMod.init(bot);


//Return image of current schedule
bot.command('getschedule', (ctx) => ctx.replyWithPhoto(scheduleUrl));
bot.command('showkatakana', (ctx)=> ctx.replyWithPhoto(katakanaUrl));
bot.command('showhiragana', (ctx)=> ctx.replyWithPhoto(hiraganaUrl));


// bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy!'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.startPolling();

