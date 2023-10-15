const isHttps = process.env.IS_HTTPS

module.exports = {
    httpOnly: true,
    secure: isHttps,
    maxAge: 1 * 60 * 60 * 1000,
    sameSite: "None"
}