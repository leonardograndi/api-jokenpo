import mongoose from 'mongoose';
import { user, password, database } from '../config/auth.json';

// mongoose.connect('mongodb://localhost:27017/jokenpostr');


// mongoose.connect('mongodb://192.168.1.3:64710/jokenpostr');


mongoose.connect(`mongodb://${user}:${password}@ds044907.mlab.com:44907/${database}`);
mongoose.Promise = global.Promise;

module.exports = mongoose;

