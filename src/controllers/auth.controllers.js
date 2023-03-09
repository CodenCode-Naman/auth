const services=require("../services/auth.service.js")

const registerUser = async (req, res) => {
    try{
        const { username, password } = req.body
        const result = await services.postUserService(username, password)
        res.status(201).send(result)
    }catch(e){
        res.status(404).send(e.message)
    }
}

const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body
        const result = await services.postLoginService(username, password)
        res.status(201).send(result)
    }catch(e){
        res.status(404).send(e.message)
    }
}

const validateToken = async (req, res) => {
    try{
        const { token } = req.body
        console.log(token)
        const result = await services.postTokenValidationService(token)
        res.status(201).send(result)
    }catch(e){
        res.status(404).send(e.message)
    }
}
module.exports = { registerUser, loginUser, validateToken}