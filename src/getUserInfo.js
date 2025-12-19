const axios = require('axios');
module.exports = (session) => async (id) => {
    const form = new URLSearchParams({ fb_dtsg: session.fb_dtsg, queries: JSON.stringify({"o0":{"doc_id":"3311434315569265","query_params":{"id":id}}}) });
    const res = await axios.post('https://www.facebook.com/api/graphql/', form, { headers: { Cookie: session.cookies } });
    return res.data.o0.data.user;
};