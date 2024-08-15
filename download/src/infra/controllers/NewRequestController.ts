import { Request, Response } from "express";

export function RequestController(request: Request, response: Response) {
    const body = request.body;
    console.log("hey ... i see you!")

    response.json(body)
}