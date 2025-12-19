const mqtt = require('mqtt');

module.exports = function(session) {
    return function(callback) {
        const mqttClient = mqtt.connect('wss://edge-chat.facebook.com/chat', {
            headers: { "Cookie": session.cookies, "User-Agent": "Mozilla/5.0" },
            protocolVersion: 3
        });

        mqttClient.on('connect', () => {
            mqttClient.subscribe('/t_ms');
            console.log("[fcavietkhuat] Kết nối MQTT thành công!");
        });

        mqttClient.on('message', (topic, payload) => {
            try {
                const data = JSON.parse(payload.toString());
                // Chuẩn hóa dữ liệu sự kiện cho người dùng
                const event = {
                    type: data.type === "message" ? "message" : "event",
                    senderID: data.senderID || data.author,
                    body: data.body || "",
                    threadID: data.threadID || data.thread_fbid,
                    logMessageType: data.logMessageType || null,
                    logMessageData: data.logMessageData || {}
                };
                callback(null, event);
            } catch (e) {}
        });
    };
};