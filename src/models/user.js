const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// mongo db
const SALT_ROUNDS = 12
// bycrpt
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
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // regex validation
        index: true            
    },


    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false          
    }
},
{ 
    timestamps: true         
}
);
// user
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);

        next();
    } catch (err) {
        next(err);
    }
});
// methods
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password; 
    return obj;
};
userSchema.statics.findByCredentials = async function(email, password) {

    const user = await this.findOne({ email }).select('+password');

    if (!user) throw new Error('Invalid email or password');


    const isMatch = await user.comparePassword(password);

    if (!isMatch) throw new Error('Invalid email or password');

    return user;
};

module.exports = mongoose.model('User', userSchema);