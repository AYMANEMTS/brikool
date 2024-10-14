const express = require('express');
const router = express.Router();
const checkValidation = require("../middlewares/checkValidation");
const protectedRoute = require("../middlewares/protectedRoute");
const {destroyJob,updateJob,storeJob,showJob,getJobs,addComment, addRating, changeStatus} = require('../controller/job.controller')
const {jobForm,addCommentValidation, ratingValidation} = require('../validators/jobValidation')
const upload = require('../multerConfig');


router.get('/',getJobs)
router.get('/:id',showJob)
router.post('/',upload.none(),protectedRoute,jobForm,checkValidation,storeJob)
router.put('/:id',upload.none(),protectedRoute,jobForm,checkValidation,updateJob)
router.delete('/:id',protectedRoute,destroyJob)
router.post('/:id/add-comment',upload.none(),protectedRoute,addCommentValidation,checkValidation,addComment)
router.post('/:id/add-rating',upload.none(),protectedRoute,ratingValidation,checkValidation,addRating)
router.post('/:id/change-status',upload.none(),protectedRoute,changeStatus)


module.exports = router