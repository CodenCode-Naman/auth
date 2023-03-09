const utils = require("../utils/auth.util.js")
const jwt = require("jsonwebtoken")
const {auth}=require("../../db/models")
const crypto = require("crypto")
const postUserService = async (username, password) => {
    const hashedPassword=crypto.createHash("sha1").update(password).digest("hex")
    await auth.create({"username":username, "password":hashedPassword})
    return {username: username, success: true}
}

const postLoginService = async (username, password) => {
    const hashedPassword=crypto.createHash("sha1").update(password).digest("hex")
    const user = { username: username, password: hashedPassword}
    const userData=await auth.findAll({where:user})
    if(userData.length==0) throw new Error("Invalid username or password")
    const accessToken = utils.generateAccessToken({ username: username })
    utils.putTokenInRedis(accessToken, username)
    return await {token: accessToken}
}

const postTokenValidationService = async (token) => {
    console.log(token)
    console.log("xyz")
    if(!token)
    {
        throw new Error("Error! Token was not provided.")
    }
    //Decoding the token
    console.log("abcd")
    const checkInRedis=await utils.checkTokenInRedis(token)
    console.log(checkInRedis)
    const decodedToken = jwt.verify(token,"1a2b3c4e5dqwertyuioplkjhgf")
    return await {success:true, username:decodedToken.username}
} 
module.exports = { postUserService, postLoginService, postTokenValidationService}