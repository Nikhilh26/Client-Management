const SibApiV3Sdk = require('@getbrevo/brevo');

const sendSurveyEmail = async (req, res) => {
    try {
        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        let apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = process.env.API_KEY;
        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = "Hello world";
        sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email Success</h1></body><h2>Visit codeforces.com</h2></html>";
        sendSmtpEmail.sender = { "name": "Nikhil H", "email": "nikhilharisinghani26@gmail.com" };
        sendSmtpEmail.to = [{ "email": "harisinghaninikhil@gmail.com", "name": "Jane Doe" }];
        sendSmtpEmail.headers = { "Hello": "1234" };
        sendSmtpEmail.params = { "parameter": "My param value", "subject": "New Subject" };

        apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
            // console.log('API called successfully. Returned data: ' + JSON.stringify(data));

        }, function (error) {
            console.error(error);
        });

        return res.json({
            success: true
        });

    } catch (error) {
        return res.json({
            message: error,
            success: false
        })
    }
}

const handleEmailResponse = async (req, res) => {

}

const getSurveyStatus = async (req, res) => {

}
module.exports = { sendSurveyEmail, handleEmailResponse, getSurveyStatus };
// sendSmtpEmail.cc = [{ "email": "example2@example2.com", "name": "Janice Doe" }];
// sendSmtpEmail.bcc = [{ "name": "John Doe", "email": "example@example.com" }];
// sendSmtpEmail.replyTo = { "email": "replyto@domain.com", "name": "John Doe" };
