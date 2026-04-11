// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Number of salt rounds for hashing (higher = more secure but slower)
const SALT_ROUNDS = 12;

// Define the user schema
const userSchema = new mongoose.Schema(
{
    // User's name
    name: {
        type: String,
        required: true,        // must be provided
        trim: true,            // removes extra spaces
        minlength: 2,
        maxlength: 50
    },

    // User's email
    email: {
        type: String,
        required: true,
        unique: true,          // no duplicate emails allowed
        lowercase: true,       // converts email to lowercase
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // regex validation
        index: true            // improves query performance
    },

    // User's password
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false          // excludes password from queries by default
    }
},
{ 
    timestamps: true          // adds createdAt and updatedAt automatically
}
);

// 🔐 Middleware: Hash password before saving user
userSchema.pre('save', async function(next) {
    try {
        // Only hash if password is newly created or modified
        if (!this.isModified('password')) return next();

        // Hash the password
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);

        next();
    } catch (err) {
        next(err);
    }
});

// 🔐 Instance method: Compare entered password with stored hash
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// 🔐 Remove sensitive data when converting to JSON (e.g., sending response)
userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password; // remove password field
    return obj;
};

// 🔄 Static method: Login logic (find user + verify password)
userSchema.statics.findByCredentials = async function(email, password) {

    // Find user and explicitly include password
    const user = await this.findOne({ email }).select('+password');

    if (!user) throw new Error('Invalid email or password');

    // Compare entered password with stored hash
    const isMatch = await user.comparePassword(password);

    if (!isMatch) throw new Error('Invalid email or password');

    return user;
};

// Export the model
module.exports = mongoose.model('User', userSchema);