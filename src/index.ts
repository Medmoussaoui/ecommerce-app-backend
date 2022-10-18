import express from 'express';
import { authRoute } from './Routes/auth/AuthRoute';



const app = express();

/// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/// Routers
app.use('/auth', authRoute);



app.listen(8000, () => console.log('Server runing on port 8000 ...'));