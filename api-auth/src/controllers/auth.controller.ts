import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não definido no arquivo .env");
}

//CADASTRO
export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({ message: "Preencha todos os campos." });
        return;
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({ message: "Usuário já existe!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword},
        })

        res.status(201).json ({ 
            message: "Usuário criado com sucesso!", user: {id: user.id, name: user.name, email: user.email}
        });
    } catch (error){
        res.status(500).json({ message: "Erro no servidor."})
    }
};

//LOGIN
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Preencha todos os campos."});
        return;
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user){
            res.status(401).json({ message: "Credenciais inválidas!"});
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Credenciais inválidas!"});
            return;
        }

        const token = jwt.sign({ userId: user.id}, JWT_SECRET, {expiresIn: "1h"});

        res.json({token});
    } catch (error){
        res.status(500).json({ message: "Erro no servidor."})
    }
};

// ROTA PROTEGIDA
export const profile = async (req: Request, res: Response) => {
    // @ts-ignore (adicionar userId no middleware)
    const userId = req.userId;

    try{
        const user = await prisma.user.findUnique({ where: { id: userId}});
        if (!user){
            res.status(404).json({ message: "Usuário não encontrado." });
            return;
        }

        res.json({ id: user.id, name: user.name, email: user.email});
    } catch (error){
        res.status(500).json({ message: "Erro no servidor." });
    }
}