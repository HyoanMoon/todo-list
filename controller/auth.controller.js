const authController = {};
const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config() // node.js에서 .env 파일을 읽어오는 방식
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const blacklistedTokens = [];

authController.authenticate = (req,res,next) => {
    try{
        const tokenString = req.headers.authorization // 
        if (!tokenString) {
            throw new Error("invalide token")
        } 
        const token =tokenString.replace("Bearer ","")

        jwt.verify(token, JWT_SECRET_KEY, (error,payload)=> {
            if(error){
                throw new Error("invalide token")
            }
            req.userId = payload._id; // 요청에 userId (payload._id)를 붙여서 다음 함수에 보내는것
            
        });
        next();

    }catch(error){

        res.status(400).json({status:'Fail..', message: error.message})

    }
}

authController.logout = (req,res) => {
    try{
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            throw new Error("Invalid token");
        }
        const token = tokenString.replace("Bearer ", "");

        blacklistedTokens.push(token);

        res.status(200).json({ status: '성공', message: '로그아웃 성공' });

    } catch(error){
        res.status(400).json({status:'Fail..', message: error.message})
    }
}



module.exports = authController;

// Middleware!!!!
// 