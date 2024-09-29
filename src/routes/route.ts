import { Router } from "express"
import { login, signup, users } from "../controller/user.js";
import { createContact } from "../controller/contact.js";
import { createGroup } from "../controller/group.js";
// import { createGroup } from "../controller/group.js";


const router = Router();
// auth
router.post("/signup", signup);
router.post("/signin", login);
router.get('/bulk', users);

// create contact 
router.post("/contact", createContact);

// create group:
router.post("/group", createGroup);

export default router