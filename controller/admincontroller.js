const admin = require('../model/adminschema')
const jwt = require('jsonwebtoken')

const createToken = (_id) => 
{
    jwt.sign({_id},process.env.SECRETE,{expiresIn : '2d'})
}
const login = async (req,res) => 
{
    const {email,password} = req.body
    
    try
    {
        const User = await admin.login(email,password)
        const token = createToken(User._id)
        res.status(200).json({email,token})
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }

}

const signup = async(req,res) => 
{
    const {email,password} = req.body

    try{
        const User = await admin.signup(email,password)
        const token = createToken(User._id)
        res.status(200).json({email,token})
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
}

module.exports = {login,signup}