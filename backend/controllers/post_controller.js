const posts = require('../model/post');

exports.createPost = async(req, res)=>{
    try {
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        })
        
    }
}