import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import * as bcrypt from 'bcryptjs';
import User from '../models/User.js';
const authRouter = new Router();
authRouter.post('/registration', [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'incorrect password').isLength({ min: 3, max: 12 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ message: 'Incorrect response', errors });
        }
        const { email, password } = req.body;
        const candidate = User.findOne({ email });
        if (candidate) {
            return res.status(400).json(`User with ${email} already exist`);
        }
        const hashedPassword = await bcrypt.hash({ password }, 15);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        return res.json({ message: 'User created' });
    }
    catch (e) {
        console.error(e);
    }
});
export default authRouter;
//# sourceMappingURL=auth.routes.js.map