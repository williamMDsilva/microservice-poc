"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NewRequestController_1 = require("./controllers/NewRequestController");
const routes = express_1.default.Router();
exports.default = routes.post('/request', NewRequestController_1.RequestController);
