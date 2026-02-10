//prisma import
async function createUser(){
    const data=prisma.user.create({
        data: data
    })
}
module.exports={createUser}
