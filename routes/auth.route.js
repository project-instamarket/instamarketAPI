import { Router } from 'express';
import ExpressJoi from 'express-joi-validator';

// controllers
import AuthCtrl from '../controllers/auth.controller';

// schemas
import { authSchema } from '../schemas/auth.schema';


const router = Router();

router.route('/')
  .get((req, res) => res.send(req.query))
  .post(ExpressJoi(authSchema), AuthCtrl.authenticate);

export default router;
