import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(authHeader === null || authHeader === undefined){
        return res.status(401).json({
            status: 401,
            msg: "unauthorized"
        })
    }
    const token = authHeader.split(' ')[1]
    // verify the token:
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if(err){
            return res.status(401).json({
                status: 401,
                msg: "unauthorized"
            })
        }
        // @ts-ignore
        req.user = user
        next();
    })
}

export default authMiddleware;