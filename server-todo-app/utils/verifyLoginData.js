const allowedCharacters = /^[a-zA-Z0-9]+$/

module.exports = (username, password) => {

    if ((username.length < 6 || username.length > 20) || (password.length < 8 || password.length > 20)) {
        return false
    }
    if (!allowedCharacters.test(username) || !allowedCharacters.test(password)) {
        return false
    }
    
    return true
}