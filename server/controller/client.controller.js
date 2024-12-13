const Client = require("../models/User")
const getUserFromToken = require('../utils/getUserFromToken');
const Job = require("../models/Job");

const storeClient = async (req, res) => {
    try {
        const {name,email,password,city,role,permissions} = req.body
        const image = req.file ? req.file.path : undefined;
        const client = await Client.create({name,email,password,city,role,permissions,image})
        res.status(200).json(client)
    }catch (e) {
        res.status(500).json({error: e})
    }
}

const showClient = async (req,res) => {
    try {
        const client = await Client.findById(req.params.id)
        if (!client) {
            res.status(404).json({error: 'Client not found'})
        }
        res.status(200).json(client)
    }catch (e) {
        res.status(500).json({error: e})
    }
}

const updateClient = async (req,res) => {
    try {
        const jwt = req.cookies['jwt'] || req.headers['authorization']?.split(' ')[1];
        const actualClient = await getUserFromToken(jwt)
        if (!actualClient) {
            return res.status(404).json({error: 'Client not found'})
        }
        const {name,city} = req.body
        const image = req.file ? req.file.path : undefined;
        actualClient.name = name;
        actualClient.city = city;
        if (image) actualClient.image = image;
        await actualClient.save();
        return res.status(200).json(actualClient);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
}

const destroyClient = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Client.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Client not found' });
        }
        await Job.deleteMany({ userId: id });
        res.status(200).json({ message: 'Client and associated jobs deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message || e });
    }
};
const getUserJobs = async (req, res) => {
    try {
        const jwt = req.cookies['jwt'] || req.headers['authorization']?.split(' ')[1];
        const user = await getUserFromToken(jwt)
        const userJobs = await Job.find({userId: user._id})
            .populate("category").populate("userId").populate("comments.userId").sort({createdAt: -1})

        res.status(200).json(userJobs)
    }catch (e) {
        res.status(500).json({error: e})
    }
}
module.exports = { updateClient, destroyClient, showClient,storeClient,getUserJobs}
