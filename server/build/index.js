import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import authRouter from "./routes/auth.routes.js";
const PORT = config.get('serverPort');
const DB_URL = config.get('dbURL');
const app = express();
app.use(express.json());
app.use('/api/auth/', authRouter);
const startApp = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => {
            console.log(`Server started at port:${PORT}`);
        });
    }
    catch (e) {
        console.error(e);
    }
};
startApp();
//# sourceMappingURL=index.js.map