function base64UrlEncode(data) {
        let base64 = data.toString('base64');
        base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        return base64;
}
      
function base64UrlDecode(str) {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        return Buffer.from(base64, 'base64');
}
      
function parseExpiration(expiresIn) {
        if (expiresIn === null) return 0
        const unit = expiresIn.charAt(expiresIn.length - 1);
        const value = parseInt(expiresIn.slice(0, -1), 10);
        
        switch (unit) {
        case 's':
                return value;
        case 'm':
                return value * 60;
        case 'h':
                return value * 60 * 60;
        case 'd':
                return value * 24 * 60 * 60;
        default:
                throw new Error('Invalid expiresIn format');
        }
}

export {base64UrlEncode,base64UrlDecode,parseExpiration}