const { body, param, query } = require('express-validator');

// Validation middleware for creating a product
exports.createProductValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name must be between 3 and 100 characters'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Product description must be between 10 and 1000 characters'),

  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be greater than 0'),

  body('unit')
    .trim()
    .notEmpty()
    .withMessage('Unit is required')
    .isIn(['kg', 'g', 'lb', 'oz', 'piece', 'dozen', 'bunch', 'bag'])
    .withMessage('Invalid unit'),

  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),

  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['vegetables', 'fruits', 'dairy', 'meat', 'eggs', 'honey', 'grains', 'other'])
    .withMessage('Invalid category'),

  body('tags')
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      if (!tags.every(tag => typeof tag === 'string' && tag.length >= 2)) {
        throw new Error('Each tag must be a string with at least 2 characters');
      }
      return true;
    }),

  body('images')
    .isArray()
    .withMessage('Images must be an array')
    .custom((images) => {
      if (!images.every(image => typeof image === 'string' && image.startsWith('http'))) {
        throw new Error('Each image must be a valid URL');
      }
      return true;
    }),

  body('is_available')
    .optional()
    .isBoolean()
    .withMessage('is_available must be a boolean'),
];

// Validation middleware for updating a product
exports.updateProductValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid product ID'),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Product description must be between 10 and 1000 characters'),

  body('price')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Price must be greater than 0'),

  body('unit')
    .optional()
    .trim()
    .isIn(['kg', 'g', 'lb', 'oz', 'piece', 'dozen', 'bunch', 'bag'])
    .withMessage('Invalid unit'),

  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),

  body('category')
    .optional()
    .trim()
    .isIn(['vegetables', 'fruits', 'dairy', 'meat', 'eggs', 'honey', 'grains', 'other'])
    .withMessage('Invalid category'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      if (!tags.every(tag => typeof tag === 'string' && tag.length >= 2)) {
        throw new Error('Each tag must be a string with at least 2 characters');
      }
      return true;
    }),

  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array')
    .custom((images) => {
      if (!images.every(image => typeof image === 'string' && image.startsWith('http'))) {
        throw new Error('Each image must be a valid URL');
      }
      return true;
    }),

  body('is_available')
    .optional()
    .isBoolean()
    .withMessage('is_available must be a boolean'),
];

// Validation middleware for updating product availability
exports.updateAvailabilityValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid product ID'),

  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),

  body('is_available')
    .optional()
    .isBoolean()
    .withMessage('is_available must be a boolean'),

  body()
    .custom((body) => {
      const { quantity, is_available } = body;
      if (!quantity && !is_available) {
        throw new Error('At least one of quantity or is_available must be provided');
      }
      return true;
    }),
];

// Validation middleware for getting products with filters
exports.getProductsValidation = [
  query('category')
    .optional()
    .trim()
    .isIn(['vegetables', 'fruits', 'dairy', 'meat', 'eggs', 'honey', 'grains', 'other'])
    .withMessage('Invalid category'),

  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a non-negative number'),

  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a non-negative number')
    .custom((maxPrice, { req }) => {
      const minPrice = parseFloat(req.query.minPrice);
      if (minPrice && parseFloat(maxPrice) < minPrice) {
        throw new Error('Maximum price must be greater than minimum price');
      }
      return true;
    }),

  query('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a comma-separated string'),

  query('search')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Search term must be at least 2 characters long'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

// Validation middleware for getting a single product
exports.getProductByIdValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid product ID'),
];

// Validation middleware for deleting a product
exports.deleteProductValidation = [
  param('id')
    .isUUID()
    .withMessage('Invalid product ID'),
]; 