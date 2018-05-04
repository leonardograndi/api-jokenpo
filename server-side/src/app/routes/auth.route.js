import express from 'express';
// import { findOne } from '../controllers';

const router = express.Router();

// router.post('/', findOne);

module.exports = app => app.use('/auth', router)
