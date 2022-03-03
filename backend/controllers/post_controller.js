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

//create like and unlike controller
exports.likeAndUnlikePost = async(req, res)=>{
    console.log(req.params)
    console.log(req.user._id)
    try {
        const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(404).json({
            success:false,
            message:"Post no found"
        })
    }

    //unlike condition
    if(post.likes.includes(req.user._id)){
        // const index = post.likes.indexOf(req.user._id);

        // post.likes.splice(index, 1);
        post.likes.pull(req.user._id)

        await post.save();
        
        return res.status(200).json({
            success:true,
            message:"Post Unliked"
        })
    }else{
        //created like
    post.likes.push(req.user._id);
    await post.save();
    return res.status(200).json({
        success:true,
        message:"Post Liked"
    })

    }

    

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    
    }
}