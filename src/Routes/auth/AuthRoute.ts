import express from 'express';
import { SignInController } from '../../controller/auth/signIn';
import { SignInSecurity } from '../../Security/SignIn/signIn_Security';
import { forgetPasswordRoute } from './forgetPasswordRoute';
import { signupRoute } from './signUpRoute';


export const authRoute = express.Router();
let signInController = new SignInController();

// Sub Routes 
authRoute.use('/signup', signupRoute);
authRoute.use('/forgetpassword', forgetPasswordRoute);

// Routes
authRoute.post('/signin', [
    new SignInSecurity().checkPoint(),
    signInController.signIn(),
]);

