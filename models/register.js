const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const empolyeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required:true
      },
    },
  ],
});



empolyeeSchema.method.generateAuthToken = async function () {
    try {//.toString()
        const token = jwt.sign({_id:this._id},"mynameismuhammadfaizerazadipixels")
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        console.log(token)
        return token

    } catch (error) {
        res.send("the error part"+error)
        console.log("the error part"+error)
    }
};

empolyeeSchema.pre("save", async function (next) {
  
    if (this.isModified("password")) {
    
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        
        console.log(`the current password is ${this.password}`);
    this.confirmpassword = undefined; //await bcrypt.hash(this.password, 10)
  }
  next();
});
