const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UserSchema = mongoose.Schema( {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    city: { type: String, required: false },
    googleId: { type: String, required: false },
    secret: { type: String, required: false },
    role: { type: String, default: "client" },
    status: {
        type: String,
        enum: ['verified', 'inverified', 'suspended'],
        default: 'inverified' 
    },
    permissions: { type: [String], default: [], required: false },
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
    next()
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
