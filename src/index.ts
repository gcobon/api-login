import { Response } from 'express';
import { Request } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from './routes/index';
const PORT = process.env.PORT || 3000;

createConnection()
  .then(async () => {
    // create express app
    const app = express();

    // middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    // register express routes from defined application routes
    app.use('/api', routes);

    app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'welcome to my api' });
    });
    // setup express app here
    // ...

    // start express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
