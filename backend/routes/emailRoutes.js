const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");
const { sendSurveyEmail, handleEmailResponse, getSurveyStatus, hasResponded } = require("../controllers/emailContollers");
const emailRouter = express.Router();

emailRouter.post('/submit/:submissionId', handleEmailResponse); // handled
emailRouter.get('/responded/:submissionId', hasResponded); // handled


emailRouter.use(validateToken);
// Protected Routes
emailRouter.get('/status', getSurveyStatus);
emailRouter.post('/', sendSurveyEmail);
// emailRouter.get('/', getLatestSurveyData); to be include with get data

module.exports = emailRouter;