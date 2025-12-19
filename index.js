const login = require('./src/login');
const makeListen = require('./src/listen');
const makeSend = require('./src/sendMessage');
const makeInfo = require('./src/getUserInfo');

module.exports = async function(credentials) {
    try {
        const session = await login(credentials.email, credentials.password);
        return {
            listen: makeListen(session),
            sendMessage: makeSend(session),
            getUserInfo: makeInfo(session)
        };
    } catch (e) {
        console.error("[fcavietkhuat] Lỗi:", e.message);
    }
};