export const checkApi = (req,res) => {
        res.send("Hello, Backend is working")
}


import sign from "../Modules/sign.js";
export const login = (req,res) => {
        const payload = { userId: 123,name:"Lily" };
        const secret = 'secret-key';
        const expiresIn = '1h';
        
        try {
                const token = sign(payload, secret,{expiresIn:expiresIn});
                res.set("Auth-token",token)
                res.status(201).json({message:"login success"})
        } catch (error) {
                res.status(404).json({error:error})
        }
}

import verify from "../Modules/verify.js";
export const details = (req,res) => {
        const secret = 'secret-key';
        try {
                const token = req.body.token
                const [decodedPayload,decodedExpiry] = verify(token, secret);
                res.status(203).json({user:decodedPayload})
        } catch (error) {
                res.status(404).json({error:error.message})
        }
}

export const logout = (req,res) => {
        const secret = 'secret-key';
        try {
                const token = req.body.token
                let [_,decodedExpiry] = verify(token, secret);
                console.log(decodedExpiry,new Date(parseInt(decodedExpiry)));
                decodedExpiry = Date.now()
                console.log(decodedExpiry,new Date(parseInt(decodedExpiry)));
                res.status(202).json({message:"Logout successful",bb})
        } catch (error) {
                res.status(404).json({error:error.message})
        }
}