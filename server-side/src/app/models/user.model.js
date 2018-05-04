import mongoose from '../../database';

const UserSchema = new mongoose.Schema({

       nickname :   {
           type :   String,
        require :   true,
          trim  :   true,
    },
    //       email :   {
    //        type : String,
    //    required : true,
    //      unique : true,
    //        trim : true,
    //   lowercase : true
    // },
    //    password : {
    //        type : String,
    //    required : false,
    //        trim : true,
    //      select : false
    // },
    //       score : {
    //        type : Number,
    //    required : false
    // },
    //        wins : {
    //        type : Number,
    //    required : false
    // },
    //      losses : {
    //        type : Number,
    //    required : false
    // }

});

const User = mongoose.model('User', UserSchema);

export default User;