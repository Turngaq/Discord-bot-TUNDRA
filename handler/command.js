const { readdirSync } = require("fs"); //  FileStream

const ascii = require("ascii-table");  // table generation

const table = new ascii().setHeading("Command", "Load status"); // два столбца

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => { // для каждой поддиректории "commands"
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(".js")); // записываю в сommands имена файлов js 

         // беру каждую строку из commands
        for (let file of commands) {
            let pull = require (`../commands/${dir}/${file}`); // подключаю

             // если у файла есть заданое name записываю в коллекцию(index.js:8)
            if (pull.name) {
                client.commands.set(pull.name, pull); //Key: Command, Value: File(.js) 
                table.addRow(file, '✅'); // также добавляю в таблицу для визализации
            } else {
                table.addRow(file, '❌ -> missing something??'); 
                continue;
            }

             // если есть псевдонимы записываю их в коллекцию псевдонимов (index.js:9)
            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }

        console.log(table.toString());
    });
}