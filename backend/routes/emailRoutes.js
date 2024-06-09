const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const { sendSurveyEmail, handleEmailResponse, getSurveyStatus } = require("../controllers/emailContollers");
const emailRouter = express.Router();

emailRouter.post('/submit/:submissionId', handleEmailResponse);

emailRouter.use(validateToken);
// Protected Routes
emailRouter.post('/send', sendSurveyEmail);
emailRouter.get('/status', getSurveyStatus);

module.exports = emailRouter;