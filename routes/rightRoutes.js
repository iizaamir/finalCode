const express= require('express');
const rightController = require('./../controllers/rightController');
const router = express.Router();//we create a new router,to connect this new router to application using middlewar.

router.route('/').get(rightController.getAllRights).post(rightController.createRight);
router.route('/:id').get(rightController.getRight);
// .patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;