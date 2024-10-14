const Job = require('../models/Job')
const mongoose = require('mongoose');


const getJobs = async (req,res) => {
    try {
        const jobs = await Job.find({})
            .populate("category").populate("userId").sort({createdAt: -1})
            // .populate("reviews.userId").populate("comments.userId")
        return res.status(200).json(jobs)
    }catch (e) {
        return res.status(500).json({error:e})
    }
}

const showJob = async (req,res) => {
    try {
        const jobId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: 'Invalid job ID' });
        }
        const job = await Job.findById(jobId)
        .populate("userId").populate("category").populate("comments.userId").sort({createdAt: -1})
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        const jobObject = job.toObject();
        jobObject.averageRating = job.averageRating; 
        return res.status(200).json({ job: jobObject });

        } catch (e) {
        return res.status(500).json({ error: 'Server error' });
    }
}

const storeJob = async (req,res) => {
    try {
        const { userId, description, contacts, category } = req.body;
        if (!contacts || !contacts.appel) {
            return res.status(400).json({ message: "Appel is required." });
        }
        const newJob = new Job({
            userId,
            description,
            contacts: {
                appel: contacts.appel,
                whatssap: contacts.whatssap || "",
                email: contacts.email || "",
                linkedin: contacts.linkedin || ""
            },
            category
        });
        await newJob.save();
        return res.status(201).json(newJob);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while creating the job." });
    }
}

const updateJob = async (req,res) => {
    try {
        const {id} = req.params
        const {category,description,contacts} = req.body
        const updatedJob = await Job.findByIdAndUpdate(id,{category,description,contacts},{new:true})
        return res.status(200).json({job:updatedJob})
    }catch (e) {
        return res.status(500).json({error:e})
    }
}

const destroyJob = async (req,res) => {
    try {
        await Job.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Job deleted successfully"})
    }catch (e) {
        return res.status(500).json({error:e})
    }
}

const addComment = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }
            const newComment = {
                userId: req.body.userId, 
                comment: req.body.comment
            };
            job.comments.push(newComment);
            await job.save();
            return res.status(200).json({ message: 'Comment added successfully', job });
    } catch (error) {
        return res.status(500).json({error:e})
    }
}

const addRating = async (req, res) => {
    const { id } = req.params;
    const { userId, rating } = req.body;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        const existingRating = job.ratings.find((r) => r.userId.toString() === userId);
        if (existingRating) {
            existingRating.rating = rating;
        } else {
            job.ratings.push({ userId, rating });
        }
        await job.save();
        return res.status(200).json({ message: 'Rating added/updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error submitting rating' });
    }
};

const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.status === "suspended") {
            return res.status(402).json({ message: 'you dont have right to make this action' });
        }
        const newStatus = job.status === 'active' ? "inactive" : job.status === 'inactive' ? "active" : job.status;
        job.status = newStatus;
        await job.save();
        return res.status(200).json({ message: 'Status changed successfully' });
        
    }catch (err) {
        return res.status(500).json({ error: 'Error changing status' });
    }
}

module.exports = {getJobs,showJob,storeJob,updateJob,destroyJob,addComment,addRating,changeStatus}