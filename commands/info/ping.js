module.exports = { // блок на экспорт
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {        
        const msg = await message.channel.send("🏓 pinging..."); //msg - отправляет сообщение
        msg.edit(`🏓 Pong\nLatency is ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency is ${Math.round(client.ping)}ms`);
        // msg.edit редактирует отправленное сообщение
    }
}