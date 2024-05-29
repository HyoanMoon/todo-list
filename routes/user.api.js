const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

//1. 회원가입
router.post("/", userController.createUser);

router.post("/login", userController.loginWithEmail);

//토근을 통해 유저 id를 빼내고 => 그 아이디로 유저 객체 찾아서 보내주기!!!!! ???? => 다시 공부..
router.get("/me", authController.authenticate, userController.getUser); 

router.post("/logout", authController.logout)






module.exports = router;