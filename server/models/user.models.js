import mongoose from "mongoose";

const usermodel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
  },
});

const user = mongoose.model("user",usermodel);

export default user;
