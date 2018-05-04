import express    from  'express';
import bodyParser from  'body-parser';
import logger     from  'morgan';

const app    = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

require('./app/routes/index').default(app);

export default app;