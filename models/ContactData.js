import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name:{type:String},
    number:{type:String},
    district:{type:String},
    state:{type:String},
    message:{type:String},
     status: {
      type: String,
      enum: ["pending", "resolve"], 
      default: "pending"
    },
},{ timestamps: true })

contactSchema.index({ createdAt: -1 });
const ContactData = mongoose.model("ContactData",contactSchema)

export default ContactData;
