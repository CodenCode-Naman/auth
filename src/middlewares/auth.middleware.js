const joi=require("joi")

//schemas 
const credentialsSchema=joi.object({
    username:joi.string().min(3).max(30).required(),
    password:joi.string().min(3).max(30).required()
})
const tokenSchema=joi.object({
    token:joi.string().required()
})

//validators
const credentialsValidator=(req,res,next)=>{
    const {error}=credentialsSchema.validate(req.body)
    if(error){
        return res.status(400).json({"message":error.message})
    }
    next()
}
const tokenValidator=(req,res,next)=>{
    const {error}=tokenSchema.validate(req.body)
    if(error){
        return res.status(400).json({"message":error.message})
    }
    next()
}

module.exports={credentialsValidator, tokenValidator}