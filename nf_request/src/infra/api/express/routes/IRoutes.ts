import { Request, Response } from "express";

export type Method = "get" | "post"

export const Method = {
    GET: "get" as Method,
    POST: "post" as Method,
} as const;

export interface Route {
    getHandler(): (request: Request, response: Response) => Promise<void>;
    getPath(): string;
    getMethod(): Method;
}