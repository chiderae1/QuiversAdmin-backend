const jwt = require('jsonwebtoken')
const admin = require('../model/adminschema')
const requireAuth = async(req,res,next) => {

    const { authorization } = req.body

    if(!authorization)
    {
        res.status(400).json({error:'Authorization token required'})
    }
    const token = authorization.split('')[1]
    try
    {
        const {_id} = jwt.verify(token,env.process.SECRETE)
        req.user = await admin.findOne({_id}).select('_id')
        next()   
    }
    catch(error)
    {
        res.status(400).json({error:error.message})
    }
    
}
 
module.exports = requireAuth