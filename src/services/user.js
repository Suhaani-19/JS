const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 
 * @param {Object} userData - The user data to be stored (must match Prisma User model)
 * @returns {Promise<Object>} - The created user record
 */
async function createUser(userData) {
    try {
        // Create a new user entry in the database
        const data = await prisma.user.create({
            data: userData
        });

        // Return the created user data
        return data;
    } catch (error) {
        console.error("Error creating user:", error);

        throw error;
    }
}



module.exports = { createUser };
