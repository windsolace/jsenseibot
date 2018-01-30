const debug = require('debug')("jsensei");
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

const KeigoMod = require('./keigo');

const KEY_KEIGO = "keigo";

const grammarMenu = Markup.inlineKeyboard([
    Markup.callbackButton("敬語", KEY_KEIGO),
]);
class GrammarMod{
	init(bot){
		debug("Grammar mod started");
		var keigoMod = new KeigoMod();

		bot.command("helpgrammar", (ctx) => {
			ctx.message.text = "What do you need help with?";
            ctx.telegram.sendCopy(ctx.message.chat.id, ctx.message, Extra.markup(grammarMenu));
		});

        bot.action(KEY_KEIGO, (ctx) => {
            let previousMsg = ctx.update.callback_query;
            ctx.telegram.deleteMessage(previousMsg.from.id, previousMsg.message.message_id).then(resp => {
                ctx.reply("Which type?",Extra.markup(keigoMod.getKeigoMenu()));
            });
            
        });

		//Responses
		keigoMod.initActions(bot);
	}

}
module.exports = GrammarMod;