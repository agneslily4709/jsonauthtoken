import sign from "./Modules/sign.js";
import verify from "./Modules/verify.js";

const payload = { userId: 123 };
const secret = 'secret-key';
const expiresIn = '15s';

const token = sign(payload, secret,{expiresIn:expiresIn});
console.log('Generated token with expiration time:', token);

setTimeout(()=>{
        try {
                const decoded = verify(token, secret);
                console.log('Decoded token:', decoded);
        } catch (error) {
                console.error('Token verification failed:', error.message);
        }
}, 5000)