const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const publicKey = process.env.PEM_KEY.replace(/\\n/gm, '\n')
// console.log(publicKey);

const validateToken = async (req, res, next) => {

    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, decoded) => {

        if (err) {
            res.status(401);
            console.log("Error in jwt Validation @middleware/authMiddleware");
            console.log(err);

            return res.json({
                success: false,
                message: "Stale/Invalid Tokens.LogIn Again"
            });
        }
        // console.log(req.body);
        // console.log(decoded);
        req.userId = decoded.sub;
        next();
    })
}

module.exports = { publicKey, validateToken };