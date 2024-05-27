import jwt from "jsonwebtoken"

export class ActionJwt {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    createToken(payload, expiresIn = '30d') {
        console.log(payload);
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secretKey, { expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    }

    decodeToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}

