const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 
 * @param {Object} userData model)
 * @returns {Promise<Object>} - The created user record
 */
async function createUser(userData) {
    try {
        const data = await prisma.user.create({
            data: userData
        });

        return data;
    } catch (error) {
        console.error("Error creating user:", error);

        throw error;
    }
}



module.exports = { createUser };
