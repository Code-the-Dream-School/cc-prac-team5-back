require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 8000
const connectDB = require('./db/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('DB successfully connected...');
        app.listen(port, () => 
            console.log(`Listening on Port ${port}!`));
    } catch (error) {
        console.log(error);
    }
};

start();


