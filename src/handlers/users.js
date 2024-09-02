import prisma from "../db.js";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth.js";

export const createUser = async (req,res) => {
    let user = {};
    if(!req.body.roleAccess){
        user = await prisma.user.create({
            data : {
                name : req.body.username,
                password : await hashPassword(req.body.password),
                email : req.body.email
            }
        });
    }else{
        user = await prisma.user.create({
            data : {
                name : req.body.username,
                password : await hashPassword(req.body.password),
                email : req.body.email,
                role : req.body.roleAccess
            }
        });
    }

    res.status(200).json({
        "status" : "Account successfully created",
        "status_code" : 200,
        "user_id" : user.id
    });
}

export const loginUser = async (req,res) => {
    const user = await prisma.user.findUnique({
        where : {
            name : req.body.username
        }
    });

    if(!user){
        res.status(401).json({
            "status" : "Incorrect username/password provided. Please retry",
            "status_code" : 401
        });
        return;
    }

    const isvalid = comparePasswords(req.body.password, user.password);
    if(!isvalid){
        res.status(401).json({
            "status" : "Incorrect username/password provided. Please retry",
            "status_code" : 401
        });
        return;
    }
    const token = createJWT(user);
    res.status(200).json({
        "status" : "Login successful",
        "status_code" : 200,
        "user_id" : user.id,
        "token" : token
    });
}
