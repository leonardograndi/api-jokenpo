import User from '../models/user';

exports.findOne = async (req, res, next) => {

    const { email } = req.body;

    try {
        
        const user = await User.findOne({ email });
        
        return res.send(200).send(user);

    } catch (error) {
        console.log(error);
        return res.send(404).send({ message: 'User not found' });        
    }
        
};

exports.createUser = async (req, res, next) => {

    const { nickname } = req.body;

    try {
        
        const user = await User.create({ nickname });
        
        return res.status(200).send(user);

    } catch (error) {
        console.log(error);
        return res.send(404).send({ message: 'User not found' });        
    }
        
};


