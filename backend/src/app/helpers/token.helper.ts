import jwt from 'jsonwebtoken';

class TokenHelper {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.SECRET_KEY;
  }

  generateToken(payload: Object, expiresIn: string): string {
    const token: string = jwt.sign(payload, this.secretKey, { expiresIn });
    return token;
  }

  verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secretKey, (err, decoded) => {
        if (err) reject(err);

        resolve(decoded);
      });
    });
  }
}

export default new TokenHelper();
