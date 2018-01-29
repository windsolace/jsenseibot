const debug = require('debug')("jsensei");
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const KeigoMod = require('./keigo');

class GrammarMod{
	init(bot){
		debug("Grammar mod started");
		var keigoMod = new KeigoMod();

		bot.hears(/help me/i, (ctx) => {
			debug(ctx.message);
			ctx.message.text = "What do you need help with?";
			ctx.telegram.sendCopy(ctx.message.chat.id, ctx.message, Extra.markup(keigoMod.getKeigoMenu()));
		});

		//Responses
		keigoMod.initActions(bot);
	}

}
module.exports = GrammarMod;