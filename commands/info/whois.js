const { getMember, formatDate } = require("..//../functions.js");
const { RichEmbed } = require("discord.js");

 // так как у юзеров мобильных платформ могут быть проблемы с отображением шаблонных литералов, используется common-tags
const { stripIndents } = require("common-tags"); 

module.exports = {
    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    desctription: "Returns user information",
    usage: "[username | id | mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join (""));  // запрашиваемый GuildMember

        //Member variables
        const joined = formatDate(member.joinedAt); // присоеденился на сервер
        const role = member.roles // роли пользователя
            .filter(r => r.id !== message.guild.id) // убрать системные роли
            .map(r => r) // преобразовать коллекцию в массив
            .join(", ") || "none"; // массив в строку
        
        //User variables
        const created = formatDate(member.user.createdAt); //дата присоединения на сервер

        const embed = new RichEmbed() // супер сообщение
            .setFooter(member.displayname, member.user.displayAvatarURL) 
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "000000" ? "ffffff" : member.displayHexColor)
            
            .addField('Member information', stripIndents`**> Displayname:** ${member.displayName}
            **> Joinded at:** ${joined}
            **> Roles:** ${role}`, true)

            .addField('User information', stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Created at:** ${created}`, true)

            .setTimestamp()

        if (member.user.presence.game) // если мембер играет добавляет поле с этой информацией
                embed.addField('Currently plaing', `**> Name:** ${member.user.presence.game.name}`);
        
        message.channel.send(embed);

    }
}