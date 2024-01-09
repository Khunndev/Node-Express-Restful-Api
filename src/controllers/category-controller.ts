import { Request, Response } from "express";

export function index(_:Request,res:Response) {
    return res.status(200).json({ message: "Category Index" });
}
type Category ={
    name: string;
}
export function create(req:Request,res:Response) {
    const {name} = req.body as Category;
    return res.status(201).json({ data: name });
}

export function show(req:Request,res:Response) {
    const {id} = req.params;
    return res.status(200).json({ data: id });
}
export function update(req:Request,res:Response) {
    const {id} = req.params;
    const {name} = req.body;
    return res.status(200).json({ update: id, name });
}

export function remove(req:Request,res:Response) {
    const {id} = req.params;
    return res.status(200).json({ delete: id });
}

export function search(req:Request,res:Response) {
    const {name} = req.params;
    return res.status(200).json({ search: name });
}