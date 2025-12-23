import mongoose from "mongoose";

const popUpSchema = new mongoose.Schema({
    image:{type:String,required:true},
    link:{type:String,required:true}
},{ timestamps: true })

popUpSchema.index({ createdAt: -1 });
const Popup = mongoose.model('Popup',popUpSchema)

export default Popup
