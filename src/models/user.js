const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    }
},
{ timestamps: true }
);

// 🔐 Hash password before save
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        next();
    } catch (err) {
        next(err);
    }
});

// 🔐 Compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// 🔐 Remove sensitive data when sending JSON
userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

// 🔄 Static method for login (clean pattern)
userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email }).select('+password');
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid email or password');

    return user;
};

module.exports = mongoose.model('User', userSchema);