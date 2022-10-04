import express from 'express';
import { authRoute } from './Routes/authRoute';


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Router 
app.use('/auth', authRoute);


app.listen(8000, () => console.log('Server runing on port 8000 ...'));