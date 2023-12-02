import crypto from "crypto";
import { base64UrlDecode } from "../Utils/Utils.js";

function verify(token, secret) {
  const [encodedHeader, encodedPayload, encodedExpiry, encodedSignature] = token.split('.');

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = base64UrlDecode(encodedSignature);
  
  const calculatedSignature = crypto.createHmac('sha256', secret).update(signatureInput).digest();
  if (!crypto.timingSafeEqual(signature, calculatedSignature)) {
    throw new Error('Invalid token signature');
  }

  const decodedExpiresIn = base64UrlDecode(encodedExpiry)?.toString()
  if (decodedExpiresIn && decodedExpiresIn < Math.floor(Date.now() / 1000)) {
        throw new Error('Token has expired');
  }

  const decodedPayload = JSON.parse(base64UrlDecode(encodedPayload).toString());
  return [decodedPayload,decodedExpiresIn];
}

export default verify;
