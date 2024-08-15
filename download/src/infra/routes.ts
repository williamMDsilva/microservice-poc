
import express, { response } from 'express';
import { RequestController } from './controllers/NewRequestController';

const routes = express.Router()
export default routes.post('/request', RequestController) 