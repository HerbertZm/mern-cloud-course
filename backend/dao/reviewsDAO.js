import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectID;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection('reviews');
    } catch (e) {
      console.error(`Unable to establish collection handles in reviewDAO: ${e}`);
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user.id,
        date,
        text: review,
        restaurantId: ObjectId(restaurantId),
      };

      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, user, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: user, _id: ObjectId(reviewId) },
        { $set: { text, date } },
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, user) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: ObjectId(reviewId),
        user_id: user,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
