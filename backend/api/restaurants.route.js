import express from 'express';
// eslint-disable-next-line import/extensions
import RestaurantsController from './restaurants.controller.js';
// eslint-disable-next-line import/extensions
import ReviewController from './review.controller.js';

const router = express.Router();

router.route('/').get(RestaurantsController.apiGetRestaurants);
router
  .route('/review')
  .post(ReviewController.apiPostReview)
  .put(ReviewController.apiUpdateReview)
  .delete(ReviewController.apiDeleteReview);

export default router;
