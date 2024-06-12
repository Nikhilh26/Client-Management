const { Email } = require("../db/models");

const sendSurveyEmail = async (req, res) => {
    try {
        console.log(req.userId);
        const userId = req.userId;
        const now = new Date();
        const epochTime = Math.floor(now.getTime() / 1000);

        let tempStorage = req.body.data.map((ele) => {
            return {
                userId, // Assuming userId is in the request body
                clientId: ele._id,
                sentAt: epochTime,
                replied: false,
                // responses will be added later
            };
        });

        const response = await Email.insertMany(tempStorage)
        //console.log(response);

        // send email logic handle error also -> update delivery status accordingly
        return res.status(200).json({
            message: 'Check status for updates',
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
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

// utils for getSurveyStatus
function convertEpochToReadableDate(epochTime) {
    const date = new Date(epochTime * 1000); // Convert to milliseconds

    // Extract date and time components
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    // const hours = date.getHours().toString().padStart(2, '0');
    // const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');

    // Format the date and time
    return `${month}-${day}`;
}

const getSurveyStatus = async (req, res) => {
    try {
        const userId = req.userId;
        const unrepliedEmails = await Email.find({ replied: false, userId })
            .populate({
                path: 'clientId',
                model: 'Client',
                select: 'email'
            });

        // to be extracted to another method
        const maxSentAtEmail = await Email.findOne({ userId })
            .sort({ sentAt: -1 })
            .limit(1);
        const maxValue = maxSentAtEmail.sentAt;

        const recentEmails = await Email.aggregate([
            {
                $match: {
                    userId,
                    sentAt: maxValue
                }
            }, {
                $lookup: {
                    from: 'clients',
                    localField: 'clientId',
                    foreignField: '_id',
                    as: 'clientData'
                }
            },
            {
                $unwind: '$clientData'
            },
            {
                $project: {
                    userId: 1,
                    sentAt: 1,
                    replied: 1,
                    responses: 1,
                    clientId: 1,
                    deliveryStatus: 1,
                    email: '$clientData.email'
                }
            }
        ])
        // to be extracted to another method
        const combinedEmails = [...unrepliedEmails, ...recentEmails];

        const uniqueEmailsMap = new Map();

        combinedEmails.forEach(email => {
            if (!uniqueEmailsMap.has(email._id.toString())) {
                uniqueEmailsMap.set(email._id.toString(), email);
            }
        });

        const respPayload = [];
        uniqueEmailsMap.forEach((value, key) => {
            const time = convertEpochToReadableDate(value.sentAt);
            let Sent = value.deliveryStatus;
            const id = value._id;
            const status = value.replied ? "Responded" : "Has not responded";

            Sent = Sent + " on " + time;


            if (typeof (value.clientId.email) !== "undefined") {
                respPayload.push({ Sent, email: value.clientId.email, id, status })
            } else {
                respPayload.push({ Sent, email: value.email, id, status });
            }
        })

        res.status(200).json({
            success: true,
            respPayload
        });
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false
        })
    }
}

const getLatestSurveyData = async (req, res) => {
    // for calculation -> use aggregation pipeline from above and then calculate
} // repsonse will be used for representation

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