const Post = require('../model/post');

exports.createPost = async(req, res)=>{
    try {
        const newPostData ={
            caption:req.body.caption,
            image:{
                //Todo
                public_id:"req.body.public_id",
                url:"req.body.url"
            },
            owner:req.user._id
        }
        const newPost = await Post.create(newPostData);
        res.status(201).json({
            success:true,
            post:newPost
        })
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        })
        
    }
}