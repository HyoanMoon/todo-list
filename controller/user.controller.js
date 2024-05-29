const User = require("../model/user");
const bcrypt = require('bcryptjs');
const userController = {};

userController.createUser = async (req,res) => {

    try {
        const {name,email,password} = req.body;  
        const user = await User.findOne({email})  //여기서 User는 mongoose.model("User",userSchema);
        if(user) {
            throw new Error('Email is already in use')
        }
        const salt = bcrypt.genSaltSync(10); // 몇번 암호화 할건지!
        const hash = bcrypt.hashSync(password, salt); 
        const uewUser = new User({name,email,password:hash});
        await uewUser.save();
        res.status(200).json({status:'Sign up success!'});

    } catch(err) {
        res.status(400).json({status:'Fail..', message: err.message});
    }
};

userController.loginWithEmail = async (req,res) => {
    try{

        const {email,password} = req.body;
        const user = await User.findOne({email},"-createdAt -updatedAt -__v");
        if(user){
          const isMatch =  bcrypt.compareSync(password, user.password); 
          if(isMatch){
            const token = user.generateToken();
            return res.status(200).json({status:'Login OK success!', user , token });
          } 
        }
        throw new Error(`Incorrect password for ${email}. Try again.`)
        


    } catch(err){
        res.status(400).json({status:'Fail..', message: err.message})
    }
};

userController.getUser = async (req,res) => {
    try{
        const {userId} = req; 
        const user = await User.findById(userId, "-updatedAt -__v");
        if(!user) {
            throw new Error("Cannot find User.")

        }
        res.status(200).json({status:'User id OK!', user })


    }catch(err) {
        res.status(400).json({status:'Fail..!', message: err.message})
        
    }

};

module.exports = userController;