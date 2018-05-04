import User from '../models/user.model';

export async function findOne(req, res, next) {

    const { email } = req.body;

    try {
        
        const user = await User.findOne({ email });
        
        return res.status(200).send(user);

    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'User not found' });        
    }
        
};

export async function createUser(req, res, next) {

    const { email } = req.body

    try {
        
        //Verificando se já existe um email cadastrado.
        if(await User.findOne({ email })) {
            return res.status(400).send({ error: 'Este email já é cadastrado, por favor tente outro.' });
        }
            
        const user = await User.create(req.body);
        
        return res.status(200).send(user);

    } catch (error) {
        console.log(error);
        return res.status(404).send({ message: 'User not found' });        
    }
        
};


