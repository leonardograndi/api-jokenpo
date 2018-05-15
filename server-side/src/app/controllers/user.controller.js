import User from '../models/user.model';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.json';


export async function findOne(req, res, next) {

    const { user } = req.body;

    try {
        
        const user = await User.findOne({ email });
        
        return res.status(200).send(user);

    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'Authenticate failed.' });        
    }
        
};

export async function createUser(req, res, next) {

    const { email } = req.body

    console.log(req.body);

    try {
        
        //Verificando se já existe um email cadastrado.
        if(await User.findOne({ email })) {
            return res.status(400).send({ error: 'Este email já é cadastrado, por favor tente outro.' });
        }
            
        const user = await User.create(req.body);
        
        user.password = undefined;

        return res.status(200).send(user);

    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'Create user failed' });        
    }
        
};

export async function authUser(req, res, next) {

    const { email, password } = req.body;
  
    try {
        
        if (!email || !password) {
            return res.status(400).send({ error: 'Invalid Parameters' });
        }

        const user = await User.findOne({ email }).select('+password');

        //Verify if user exists
        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }

        //Compare password crypto
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Password invalid.' });
        }
           
        //Clear return password request
        user.password = undefined;

        //Generated token access.
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        return res.status(200).send({ user, token });

    } catch (error) {
        return res.status(400).send({error: 'Authentication failed.' });
    }

} 
