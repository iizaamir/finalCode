const express= require('express');
const userController = require('./../controllers/userController');
const router = express.Router();//we create a new router,to connect this new router to application using middlewar.

router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;