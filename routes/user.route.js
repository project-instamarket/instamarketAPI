import { Router } from 'express';

// controllers
import UserCtrl from '../controllers/user.controller';


const router = Router();

router.route('/media')
  .get(UserCtrl.fetchUserMedia);

export default router;
