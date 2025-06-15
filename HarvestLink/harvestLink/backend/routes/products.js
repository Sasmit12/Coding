const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const productController = require('../controllers/product.controller');
const {
  createProductValidation,
  updateProductValidation,
  updateAvailabilityValidation,
  getProductsValidation,
  getProductByIdValidation,
  deleteProductValidation,
} = require('../middleware/product.validation');

// Public routes
router.get('/', getProductsValidation, productController.getProducts);
router.get('/:id', getProductByIdValidation, productController.getProductById);

// Protected routes
router.use(authenticate);

// Farmer routes
router.post(
  '/',
  authorize(['farmer', 'admin']),
  createProductValidation,
  productController.createProduct
);

router.patch(
  '/:id',
  authorize(['farmer', 'admin']),
  updateProductValidation,
  productController.updateProduct
);

router.patch(
  '/:id/availability',
  authorize(['farmer', 'admin']),
  updateAvailabilityValidation,
  productController.updateAvailability
);

router.delete(
  '/:id',
  authorize(['farmer', 'admin']),
  deleteProductValidation,
  productController.deleteProduct
);

module.exports = router; 