import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    image:{type:String,required:true},
    title:{type:String,required:true},
    shortDescription:{type:String,required:true},
    description:{type:String,required:true},
},{ timestamps: true })


blogSchema.index({ createdAt: -1 });

const Blog = mongoose.model('Blog',blogSchema)

export default Blog;