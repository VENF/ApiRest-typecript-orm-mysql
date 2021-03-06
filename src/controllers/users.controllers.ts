import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import { User } from '../entity/User'

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
   const users = await getRepository(User).find();
   return res.status(200).json({
       users
   })
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
   const newUser = await getRepository(User).create(req.body);
   const user = await getRepository(User).save(newUser);
   return res.status(200).json({
       user
   })
 };

 export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).findOne(req.params.id);
    return res.status(200).json({
        user
    })
};
 
export const updateUser = async (req: Request, res: Response) => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).merge(user, req.body)
        const userUpdated = await getRepository(User).save(user)
        return res.status(200).json({
            userUpdated
        })
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(User).delete(req.params.id);
    return res.status(200).json({
        user
    })
};