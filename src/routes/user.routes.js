const express=require("express")
const router=express.router
const {handleUserCollection}=require("../controller/user.js")
//create four router for users

router.post('/create',handleUserCollection)