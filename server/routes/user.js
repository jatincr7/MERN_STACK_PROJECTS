import express from 'express';
const router = express.Router();
import {getUser,signIn,register} from '../controller/userController.js'

router.get('/', getUser);
router.post('/sign-up', register, () => {
})
router.post('/sign-in',signIn)


export  default router 