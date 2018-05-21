import express from 'express';
import { findOne, createUser, authUser } from '../controllers';


const router = express.Router();

router.get ('/',        findOne    );
router.post('/',        createUser );
router.post('/auth',    authUser   );


module.exports = app => app.use('/user', router)

