const { Email } = require("../db/models");

const sendSurveyEmail = async (req, res) => {
    try {
        console.log(req.userId);

        const now = new Date();
        const epochTime = Math.floor(now.getTime() / 1000);

        let tempStorage = req.body.data.map((ele) => {
            return {
                userId: req.body.userId, // Assuming userId is in the request body
                clientId: ele.clientId,
                sentAt: epochTime,
                replied: false,
                // responses will be added later
            };
        });

        const response = await Email.insertMany(tempStorage)
        //console.log(response);

        // send email logic handle error also
        return res.json({
            message: 'Check status for updates',
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: 'something went woring'
        })
    }

}

const handleEmailResponse = async (req, res) => {
    try {
        const submissionId = req.params.submissionId;
        const responses = req.body.responses;
        // console.log(responses);
        // console.log(submissionId);

        const updatedEmail = await Email.findByIdAndUpdate(
            submissionId,
            { $set: { responses: responses, replied: true } },
            { new: true }
        );

        if (!updatedEmail) {
            return res.status(400).json({
                success: false,
                message: 'Entry Not Found. Please make sure you have not changed anything in the URL. If the problem still persists, contact the owner.'
            });
        }

        // console.log('Email updated with new responses:', updatedEmail);

        return res.status(200).json({
            success: true,
            message: 'Response stored successfully. Thank you for filling the form.'
        });

    } catch (error) {
        console.error('Error updating email:', error);
        return res.status(501).json({
            success: false,
            message: 'Server went down. Please try again after some time.'
        });
    }
}

// to be tested
const getSurveyStatus = async (req, res) => {
    try {
        const userId = req.userId;
        const unrepliedEmails = await Email.find({ replied: false, userId });

        const getMaxField = await Email.aggregate([
            {
                $match: {
                    userId
                }
            }, {
                $group: {
                    _id: null,
                    maxSentAt: { $max: "$sentAt" }
                }
            }
        ])
        const maxValue = getMaxField[0].maxSentAt;
        const recentEmails = await Email.aggregate([
            {
                $match: {
                    userId,
                    sentAt: maxValue
                }
            }
        ])

        // console.log(recentEmails);
        const combinedEmails = [...unrepliedEmails, ...recentEmails];

        const uniqueEmailsMap = new Map();

        combinedEmails.forEach(email => {
            if (!uniqueEmailsMap.has(email._id.toString())) {
                uniqueEmailsMap.set(email._id.toString(), email);
            }
        });

        const uniqueEmails = Array.from(uniqueEmailsMap.values());

        res.status(200).json({
            success: true,
            uniqueEmails
        });
    } catch (error) {
        console.log(error)
        return res.json({
            success: false
        })
    }
}

const getLatestSurveyData = async (req, res) => {
    // for calculation -> use aggregation pipeline from above and then calculate
}

const hasResponded = async (req, res) => {
    try {
        const submissionId = req.params.submissionId;

        const updatedEmail = await Email.findById(submissionId)

        if (!updatedEmail) {
            return res.status(400).json({
                success: false,
                message: 'Entry Not Found. Please make sure you have not changed anything in the URL. If the problem still persists, contact the owner.'
            });
        }

        // console.log('Email updated with new responses:', updatedEmail);

        return res.status(200).json({
            success: true,
            replied: updatedEmail.replied,
            message: 'Response stored successfully. Thank you for filling the form.'
        });

    } catch (error) {
        console.error('Error updating email:', error);
        return res.status(501).json({
            success: false,
            message: 'Server went down. Please try again after some time.'
        });
    }
}
module.exports = { sendSurveyEmail, handleEmailResponse, getSurveyStatus, getLatestSurveyData, hasResponded };
