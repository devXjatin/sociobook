const Post = require('../model/post');
const User = require('../model/user')
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
        const post = await Post.create(newPostData);
        const user = await User.findById(req.user._id);
        console.log(post._id);
        user.posts.push(post._id);
        await user.save();
        res.status(201).json({
            success:true,
            post
        })
        
    } catch (err) {
        res.status(500).json({
            success:false,
            message:err.message
        })
        
    }
}