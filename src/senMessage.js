const axios = require('axios');
const utils = require('./utils');
module.exports = (session) => async (tid, msg) => {
    const data = new URLSearchParams({ fb_dtsg: session.fb_dtsg, body: msg, specific_to_list: [`fbid:${tid}`] });
    return axios.post('https://www.facebook.com/messaging/send/', data, { headers: utils.getHeaders(session.cookies) });
};