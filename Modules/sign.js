import crypto from "crypto";
import { base64UrlEncode, parseExpiration } from "../Utils/Utils.js";

function sign(payload, secret, options = { expiresIn: null }) {
  const header = { alg: 'HS256', typ: 'JWT' };
  let expiryInput = null;

  if (options.expiresIn) {
    expiryInput = Math.floor(Date.now() / 1000) + parseExpiration(options.expiresIn);
  }

  const encodedHeader = base64UrlEncode(Buffer.from(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(Buffer.from(JSON.stringify(payload)));
  const encodedExpiry = expiryInput ? base64UrlEncode(Buffer.from(JSON.stringify(expiryInput))) : "";

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac('sha256', secret).update(signatureInput).digest('base64');

    return `${encodedHeader}.${encodedPayload}.${encodedExpiry}.${base64UrlEncode(signature)}`;
}

export default sign;
