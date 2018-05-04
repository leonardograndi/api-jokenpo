import mongoose from '../database/index';

const UserSchema = new mongoose.Schema({

       nickname :   {
           type :   String,
        require :   true,
          trim  :   true,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;