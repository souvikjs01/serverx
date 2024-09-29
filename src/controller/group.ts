import { Request, Response } from "express";
import prisma from "../config/db.js";
import jwt from "jsonwebtoken"

export const createGroup = async (req: Request, res: Response) => {
    const { title, ownerId, memberIds } = req.body;
    if (!title || !ownerId || !Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({ error: 'Title, ownerId, and memberIds are required, and memberIds should be a non-empty array' });
    }  
    try {
        // Check if the owner exists
        const owner = await prisma.user.findUnique({
          where: { id: ownerId }
        });
    
        if (!owner) {
          return res.status(404).json({ error: 'Owner not found' });
        }
    
        // Check if all the provided memberIds exist
        const existingUsers = await prisma.user.findMany({
          where: { contactId: { in: memberIds } },
        });
    
        if (existingUsers.length !== memberIds.length) {
          return res.status(404).json({ error: 'One or more members were not found' });
        }
    
        // Create the group and connect members
        const newGroup = await prisma.groups.create({
          data: {
            title,
            ownerId,
            GroupMember: {
              create: existingUsers.map((user) => ({
                contact: {
                  connect: {
                    contactId: user.contactId, // Connect group members by contactId
                  },
                },
              })),
            },
          },
          include: {
            GroupMember: true, // Include group members in the response
          },
        });    
        return res.status(201).json(newGroup);
    } catch (error) {
      console.error('Error creating group:', error);
      return res.status(500).json({ error: 'An error occurred while creating the group' });
    }
}
  