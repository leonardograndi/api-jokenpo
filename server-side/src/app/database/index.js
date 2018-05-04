import mongoose from 'mongoose';
import { user, password, database } from './../config/auth';

// mongoose.connect('mongodb://alisson:00000000@ds044907.mlab.com:44907/jokenpostr');

mongoose.connect(`mongodb://${user}:${password}@ds044907.mlab.com:44907/${database}`);
mongoose.Promise = global.Promise;

module.exports = mongoose;

