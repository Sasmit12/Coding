const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    images: [{
      type: String,
    }],
    // Specific rating categories
    ratings: {
      quality: {
        type: Number,
        min: 1,
        max: 5,
      },
      freshness: {
        type: Number,
        min: 1,
        max: 5,
      },
      value: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    // Review status
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    // Review helpfulness tracking
    helpfulVotes: {
      type: Number,
      default: 0,
    },
    helpfulVoters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    // Farmer response
    farmerResponse: {
      content: String,
      timestamp: Date,
    },
    // Review verification
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
    // Review moderation
    moderationNotes: String,
    moderatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    moderationTimestamp: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ consumer: 1, createdAt: -1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ status: 1 });

// Compound index for unique review per order
reviewSchema.index({ product: 1, order: 1 }, { unique: true });

// Method to mark review as helpful
reviewSchema.methods.markHelpful = async function (userId) {
  if (!this.helpfulVoters.includes(userId)) {
    this.helpfulVoters.push(userId);
    this.helpfulVotes += 1;
    await this.save();
  }
};

// Method to unmark review as helpful
reviewSchema.methods.unmarkHelpful = async function (userId) {
  const index = this.helpfulVoters.indexOf(userId);
  if (index > -1) {
    this.helpfulVoters.splice(index, 1);
    this.helpfulVotes -= 1;
    await this.save();
  }
};

// Method to add farmer response
reviewSchema.methods.addFarmerResponse = async function (content) {
  this.farmerResponse = {
    content,
    timestamp: new Date(),
  };
  await this.save();
};

// Pre-save middleware to verify purchase
reviewSchema.pre('save', async function (next) {
  if (this.isNew) {
    const Order = mongoose.model('Order');
    const order = await Order.findOne({
      _id: this.order,
      consumer: this.consumer,
      status: 'delivered',
    });
    this.isVerifiedPurchase = !!order;
  }
  next();
});

// Static method to get average ratings for a product
reviewSchema.statics.getProductRatings = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: mongoose.Types.ObjectId(productId), status: 'approved' } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        qualityAvg: { $avg: '$ratings.quality' },
        freshnessAvg: { $avg: '$ratings.freshness' },
        valueAvg: { $avg: '$ratings.value' },
        ratingDistribution: {
          $push: {
            rating: '$rating',
            count: 1,
          },
        },
      },
    },
  ]);

  if (result.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      qualityAvg: 0,
      freshnessAvg: 0,
      valueAvg: 0,
      ratingDistribution: Array(5).fill(0),
    };
  }

  const distribution = Array(5).fill(0);
  result[0].ratingDistribution.forEach(({ rating, count }) => {
    distribution[rating - 1] = count;
  });

  return {
    averageRating: result[0].averageRating,
    totalReviews: result[0].totalReviews,
    qualityAvg: result[0].qualityAvg,
    freshnessAvg: result[0].freshnessAvg,
    valueAvg: result[0].valueAvg,
    ratingDistribution: distribution,
  };
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 