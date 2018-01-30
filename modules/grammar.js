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
		var firstMsgId = ""; //required to modify the msg
		var chatId = ""; //required to modify the msg

		//Modules
		var keigoMod = new KeigoMod();

		bot.command("helpgrammar", (ctx, next) => {
			ctx.message.text = "What do you need help with?";
			chatId = ctx.message.chat.id;
            ctx.telegram.sendCopy(ctx.message.chat.id, ctx.message, Extra.markup(grammarMenu)).then((promise)=>{
            	firstMsgId = promise.message_id;
            });
		});

        bot.action(KEY_KEIGO, (ctx) => {
        	// debug(ctx.update.callback_query);
            ctx.telegram.editMessageText(chatId, firstMsgId, "", "Which type?", Extra.markup(keigoMod.getKeigoMenu())).then(()=>{
            	//auto delete msg after 10 seconds
            	setTimeout(()=>{
            		ctx.telegram.deleteMessage(chatId, firstMsgId).then().catch(e=>{debug(e)});
            	}, 10000);
            });
        });

		//Responses
		keigoMod.initActions(bot);
	}

	specialfunction(input){
		debug("special");
		debug(input);
	}

}
module.exports = GrammarMod;