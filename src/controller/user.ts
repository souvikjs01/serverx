import { Request, Response } from "express";
import prisma from "../config/db.js";
import jwt from "jsonwebtoken"
interface SignUpBody {
    name: string;
    email: string;
    password: string;
    contactId: string;
}
interface LoginBody {
    email: string;
    password: string;
}
export const signup = async (req: Request, res: Response) => {
    try {
        const body: SignUpBody = req.body
        let user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                contactId: body.contactId
            }
        })
        
        return res.json({
            msg: 'Signed up successfully!',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })        
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const body: LoginBody = req.body       
        let findUser = await prisma.user.findUnique({
            where: {
                password: body.password,
                email: body.email
            }
        })        
        if(!findUser){
            return res.status(404).json({
                message: "User not found"
            })
        }
        let jwtPayload = {
            email: body.email,
            id: findUser.id
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
            expiresIn: "20d"
        })
        return res.json({
            msg: 'Logged in successfully!',
            user: findUser,
            token: token,
        })
    } catch (error) {
        console.log(error);        
        return res.status(500).json({
            msg: "Internal server error"
        })        
    }
}


export const users = async (req: Request, res: Response) => {
    try {      
        let bulk = await prisma.user.findMany();        
        if(!bulk){
            return res.status(404).json({
                message: "No user found"
            })
        }
        return res.json({
            data: bulk,
        })
    } catch (error) {
        console.log(error);        
        return res.status(500).json({
            msg: "Internal server error"
        })        
    }
}

