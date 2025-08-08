const crypto = require('crypto'); 
const jwt = require('jsonwebtoken');

require("dotenv").config();
const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_KEY;
const JWT_SECRET = process.env.SECRATE_KEY;
class Responsehelper {
    static respond(status, success, data, message, res) {
        const response = { success };

        if (data) {
            response.data = data;
        }

        if (message) {
            response.message = message;
        }

        return res.status(status).json(response);
    }

    static encrypt(text) {
        // Check if key is set and has the correct length
        if (!key) {
            throw new Error('ENCRYPTION_KEY environment variable is not set');
        }
        if (key.length !== 32) {
            throw new Error('ENCRYPTION_KEY must be exactly 32 bytes long');
        }

        const iv = crypto.randomBytes(16);

        let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'utf-8'), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return iv.toString('hex') + ':' + encrypted;
    }

    static Genratewebtoken = (data) =>{
        const payload = {
            id : data.id,
            username : data.name,
            email : data.email
        }

        return jwt.sign(payload, JWT_SECRET , {
            expiresIn : '30m'
        });
    };

    static validateemail(email){
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         return emailRegex.test(email);
    }

    static calculateTokenExpiration() {
        // Calculate the expiration time for the verification token (e.g., 30 minutes from now)
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 30);
        return expirationTime;
    }
}


module.exports = Responsehelper;