require('dotenv').config();
const app = require('./app');
const { PORT = 8000 } = process.env;
const connectDB = require('./db/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('DB successfully connected...');
        app.listen(PORT, () => 
            console.log(`Listening on Port ${PORT}!`));
    } catch (error) {
        console.log(error);
    }
};

start();


