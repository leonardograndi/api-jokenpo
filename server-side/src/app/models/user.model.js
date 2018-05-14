import mongoose from '../../database';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({

       nickname :   {
           type :   String,
        require :   true,
          trim  :   true,
    },
          email :   {
           type : String,
       required : false,
         unique : true,
           trim : true,
      lowercase : true
    },
       password : {
           type : String,
       required : false,
           trim : true,
         select : false
    },
          score : {
           type : Number,
       required : false
    },
           wins : {
           type : Number,
       required : false
    },
         losses : {
           type : Number,
       required : false
    }

});

UserSchema.pre('save', async function(next) {
    
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

export default User;