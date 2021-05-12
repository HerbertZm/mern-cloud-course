// eslint-disable-next-line import/extensions
import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewController {
  static async apiPostReview(req, res) {
    console.log('holi');
    try {
      const { restaurantId } = req.body;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.boyd.user_id,
      };
      const date = new Date();

      // eslint-disable-next-line no-unused-vars
      const reviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        userInfo,
        review,
        date,
      );

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res) {
    try {
      const { reviewId } = req.body;
      const { text } = req.body;
      const user = req.user.user_id;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        text,
        date,
      );

      const { error } = reviewResponse;

      if (error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          'Unable to update review - user may not be original poster',
        );
      }

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res) {
    try {
      const reviewId = req.query.id;
      const user = req.body.user_id;

      // eslint-disable-next-line no-unused-vars
      const reviewResponse = await ReviewsDAO.deleteReview(
        reviewId,
        user,
      );

      res.json({ status: 'success' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
