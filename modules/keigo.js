const debug = require('debug')("jsensei");
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const KEY_SONKEIGO = "sonkeigo";
const KEY_KENJYOUGO = "kenjyougo";

const songkeikenjyouChart = "https://goo.gl/sxWycB";

const keigoMenu = Markup.inlineKeyboard([
	Markup.callbackButton("尊敬語", KEY_SONKEIGO),
	Markup.callbackButton("謙譲語", KEY_KENJYOUGO)
]);

class KeigoMod{
	initActions(bot){
		bot.action(KEY_SONKEIGO, (ctx)=> ctx.replyWithPhoto(this.getSKKJChart()));
		bot.action(KEY_KENJYOUGO, (ctx)=> ctx.replyWithPhoto(this.getSKKJChart()));
	}

	getKeigoMenu(){
		return keigoMenu;
	}

	/**
	 * Get sonkeigo + kenjyougo chart
	 */
	getSKKJChart(ctx){
		return songkeikenjyouChart;
	}

}
module.exports = KeigoMod;