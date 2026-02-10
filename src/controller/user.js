const {createUser}=require('../services/user.js')

async function handleUserCollection(req,res){
    try{
        const data=await createUser()
        res.status(200).json({message:"Created"})
    }catch(error){
        res.status(500).json({message:"something went wrong"})
    }
}
module.exports={handleUserCollection}