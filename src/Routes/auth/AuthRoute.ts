import express from 'express';
import { SignInController } from '../../controller/signIn/SignInController';
import { forgetPasswordRoute } from './ForgetPasswordRoute';
import { signupRoute } from './SignUpRoute';


export const authRoute = express.Router();
let signInController = new SignInController();

// === Sub Routes === //
authRoute.use('/signup', signupRoute);
authRoute.use('/forgetpassword', forgetPasswordRoute)
authRoute.post('/signin', (req, res) => signInController.signIn(req, res));
