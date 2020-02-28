module.exports = {
    getMember: function (message, toFind = '') {    // найти пользователя
        toFind = toFind.toLowerCase(); 

        let target = message.guild.members.get(toFind); 

        if (!target && message.mentions.members)  // задан как @user
            target = message.mentions.members.first();

        if (!target && toFind) {    // если пользователь до сих пор не определен, но есть toFind, то
            target = message.guild.members.find(member => { 
                return member.displayName.toLowerCase().includes(toFind) || 
                member.user.tag.toLowerCase().includes(toFind); // поиск по тегу
            });
        }

        if (!target) // выбирается автор сообщения
            target = message.member; 
        
        return target; // возвращаемое значение представляет с собой GuildMember - обьект из discord.js
    },

    formatDate: function (date) {
        return new Intl.DateTimeFormat('en-US').format(date);  
    }
}