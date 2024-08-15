"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = RequestController;
function RequestController(request, response) {
    const body = request.body;
    console.log("hey ... i see you!");
    response.json(body);
}
