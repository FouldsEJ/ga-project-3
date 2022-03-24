import express from 'express';
import placesController from '../controllers/placesController.js';
import usersController from '../controllers/usersController.js';

const router = express.Router();

router
  .route('/places')
  .get(placesController.getAllPlaces)
  .post(placesController.createPlace);

router.route('/places/:id').get(placesController.getPlaceById);

router.route('/register').post(usersController.registerUser);
router.route('/login').post(usersController.loginUser);

export default router;
