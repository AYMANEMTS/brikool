const Client = require("../models/User")

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
        const {name,city} = req.body
        const {id} = req.params
        const image = req.file ? req.file.path : undefined;
        const actualClient = await Client.findById(id)
        if (!actualClient) {
            return res.status(404).json({error: 'Client not found'})
        }
        const updatedClient = await Client.findByIdAndUpdate(id, { name, city, image }, { new: true });
        return res.status(200).json(updatedClient);
    } catch (error) {
        return res.status(500).json({error: e})
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