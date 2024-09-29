import { Request, Response } from "express";
import prisma from "../config/db.js";
import jwt from "jsonwebtoken"
// create contact:
export const createContact = async (req: Request, res: Response) => {
    const { contactId } = req.body;
    try {
        const isValid = await prisma.user.findUnique({
            where: {
                contactId: contactId
            }
        })
        if(!isValid) {
            return res.status(404).json({
                msg: "Invalid contactId"
            })
        }
        const contact = await prisma.contact.create({
            data: {
                contactId: contactId,
            },
            
        });
        res.json(contact);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add contact.' });
    }
};