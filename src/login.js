const axios = require('axios');
const cheerio = require('cheerio');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

module.exports = async function(email, password) {
    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar, withCredentials: true }));
    
    // Vào trang mbasic để lấy form login
    const res = await client.get('https://mbasic.facebook.com');
    const $ = cheerio.load(res.data);
    const action = $('form').attr('action');
    const formData = new URLSearchParams();
    
    $('input').each((i, el) => {
        const name = $(el).attr('name');
        const val = $(el).attr('value') || "";
        if (name === 'email') formData.append(name, email);
        else if (name === 'pass') formData.append(name, password);
        else formData.append(name, val);
    });

    await client.post(action, formData);
    const cookies = await jar.getCookieString('https://www.facebook.com');
    
    if (!cookies.includes('c_user')) throw new Error("Đăng nhập thất bại!");

    const home = await client.get('https://www.facebook.com', { headers: { Cookie: cookies } });
    const fb_dtsg = home.data.match(/["']token["']\s*,\s*["']([^"']+)["']/)[1];

    return { cookies, fb_dtsg, client };
};