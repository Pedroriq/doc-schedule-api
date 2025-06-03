import { Repository } from "typeorm";
import { Request, Response, NextFunction } from "express";

export function checkExistsEmail(repo: Repository<any>){
    return async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email
        
        if (!email) {
            res.status(400).json({message: "Email is necessary"})
            return
        }

        const existingEmail = await repo.findOneBy({email})

        if (existingEmail) {
            res.status(409).json({message: "Email already exists"})
            return
        }

        next()
    }
}