const { RichEmbed } = require("discord.js"); //крутое сообщение
module.exports = { 
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete(); //удаление сообщения, если удаляемое

        if (args.length < 1)  // при остутсвии текста после команды 
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        // цвет сообщения
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#b8860b" : message.guild.me.displayHexColor;

        if (args[0].toLowerCase() === "embed") { // при embed после команды
            const embed = new RichEmbed () // крутое сообщение
                .setColor(roleColor) // цвет линии слева от сообщения
                .setDescription(args.slice(1).join(" ")) 
                .setTimestamp() //  дата
                .setAuthor(message.author.username, message.author.displayAvatarURL) // указать автора сообщения
                .setFooter(client.user.username, client.user.displayAvatarURL) //указать имя бота 
                .addField('one more test', `**> wta**`);

            message.channel.send(embed);  // запостить сообщение embed

        } else { // если embed после команды нет
            message.channel.send(args.join(" ")); 
        }
    }
}