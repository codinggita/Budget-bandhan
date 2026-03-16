import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import {
  createWedding,
  getWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding,
  calculateBudget
} from '../controllers/weddingController.js';

const router = express.Router();

// Apply protect to all routes
router.use(protect);

// Calculate budget route - THIS MUST COME BEFORE /:id
router.post('/calculate', calculateBudget);

// CRUD routes
router.route('/')
  .get(getWeddings)
  .post(createWedding);

router.route('/:id')
  .get(getWeddingById)
  .put(updateWedding)
  .delete(deleteWedding);

export default router;