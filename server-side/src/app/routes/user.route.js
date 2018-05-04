import express from 'express';
import { findOne, createUser } from '../controllers';


const router = express.Router();

router.get ('/', findOne    );
router.post('/', createUser );


module.exports = app => app.use('/user', router)