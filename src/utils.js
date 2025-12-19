module.exports = {
    getHeaders: (cookie) => ({
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": "https://www.facebook.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Cookie": cookie
    }),
    parseJSON: (data) => {
        try {
            return JSON.parse(data.replace("for (;;);", ""));
        } catch (e) { return null; }
    }
};