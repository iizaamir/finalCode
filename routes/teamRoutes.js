const express= require('express');
const teamController = require('./../controllers/teamController');
const router = express.Router();//we create a new router,to connect this new router to application using middlewar.

router.route('/').get(teamController.getAllTeams).post(teamController.createTeam);
router.route('/:id').get(teamController.getTeam).patch(teamController.updateTeam).delete(teamController.deleteTeam);

module.exports = router;