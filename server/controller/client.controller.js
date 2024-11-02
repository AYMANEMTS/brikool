const Client = require("../models/User")
const getUserFromToken = require('../utils/getUserIdFromToken');

const getClients = async (req,res) => {
    try {
        const client = await Client.find({})
        res.status(200).json(client)
    }catch (e) {
        res.status(500).json({error: e})
    }
}

const storeClient = async (req, res) => {
    try {
        const client = await Client.create(req.body)
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

const destroyClient = async (req,res) => {
    try {
        await Client.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Client deleted successfully'})
    }catch (e) {
        res.status(500).json({error: e})
    }
}

module.exports = {getClients, updateClient, destroyClient, showClient,storeClient}