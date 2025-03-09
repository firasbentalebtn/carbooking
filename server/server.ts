import { Server } from './node_modules/@types/connect/index.d';
import http from 'http';
import {app} from './app';
import cors from 'cors';
const server = http.createServer(app);
app.use(cors({ origin: '*' }));

//create server
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});