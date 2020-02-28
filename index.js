const { Client, Collection } = require("discord.js"); // обьявление бота 
const { config } = require("dotenv"); // обьявление коллекции

const client = new Client({ // ввод бота
    disableEveryone: true // 
});

client.commands = new Collection(); // команды и псевдонимы
client.aliases = new Collection(); 

["command"].forEach(handler => {           // подключение в index.js всех обработчиков
    require(`./handler/${handler}`)(client); // подача бота на параметр и запуск функции
}); 

config({
    path: __dirname + "/.env"           
});

client.on ("ready", () => { // Запуск бота
    console.log(`I'm online! My name is ${client.user.username}`);  

    client.user.setPresence({  // статус
        status: "online",
        game: {
            name: "for you",
            type: "WATCHING"
        }
    });
});

client.on("message", async message => { //Сообщение
    const prefix = "_"; // назначение префикса

    if (message.author.bot) return; //если автор бот 
    if (!message.guild) return; //если сообщение не на сервере
    if (!message.content.startsWith(prefix)) return; //если сообщение не начинается с префикса

    // иногда в discord.js происходит сбой, и message.member оказывается пустым 
    if (!message.member) message.member = await message.guild.fetchMember(message)// получение member еще раз при пустом message.member

    const args = message.content.slice(prefix.length).trim().split(/ +/g); 
    const cmd = args.shift().toLowerCase(); // отделяем команду

    if (cmd.length === 0) return; 

    let command = client.commands.get(cmd); // поиск команды
    if (!command) command = client.commands.get(client.aliases.get(cmd)); //если такой команды не находится, поиск по ключу в псевдонимах

    if (command) command.run(client, message, args); //run
});

client.login(process.env.TOKEN); 