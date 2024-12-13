const  Users = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getUserFromToken = require("../utils/getUserFromToken");

const registerClient = async (req, res) => {
    try {
        const {name,email,password,city} = req.body;
        const client = await Users.create({name,email,password,city})
        const token = jwt.sign({ userId: client._id }, process.env.JWT_SECRET_KEY, {expiresIn: "30d"});
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({user:client,jwt: token})
    }catch (e) {
        res.status(500).json({error: e})
    }
}


const loginClient = async (req, res) => {
    const {t} = req;
    try {
        const client = await Users.findOne({ email: req.body.email });
        if (!client || (!await bcrypt.compare(req.body.password, client.password))) {
            return res.status(400).json({ message: t('incorrectEmailOrPassword') })
        }
        const token = jwt.sign({ userId: client._id }, process.env.JWT_SECRET_KEY, {expiresIn: "30d"});
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({user:client,jwt: token})
    }catch (e) {
        res.status(500).json({error: e})
    }
}

const logout = async (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "logout success"})
    }catch (e) {
        res.status(500).json({error: e})
    }
}

const authenticateToken = async (req, res) => {
    const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token expired or invalid" });
        }
        try {
            const user = await Users.findById(decoded.userId).select('-password');

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).send({ message: "Token has been checked successfully", user });
        } catch (error) {
            return res.status(500).json({ message: "Error fetching user", error });
        }
    });
};


const changePassword = async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body
        const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];
        const user = await getUserFromToken(token)
        if (!user) {
            return res.status(404).json({ error: req.t('user_not_found') });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: req.t('current_password_incorrect') });
        }
        user.password = newPassword
        await user.save()
        return res.status(200).json({ message: req.t('password_changed_successfully'),user });

    } catch (error) {
        res.status(500).json({error: e})
    }
}


const checkAuthAdmin = async (req, res) => {
    const token = req.cookies.jwt || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token expired or invalid" });
        }
        try {
            const user = await Users.findById(decoded.userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (!['admin', 'moderator'].includes(user.role)) {
                return res.status(403).json({ error: 'Insufficient role permissions' });
            }
            return res.status(200).send({ message: "Token has been checked successfully", user });
        } catch (error) {
            return res.status(500).json({ message: "Error fetching user", error });
        }
    });
};

module.exports = {registerClient,loginClient,logout,authenticateToken,changePassword,checkAuthAdmin};
