const express = require('express');

const CandidateCtrl = require('../controllers/candidate-ctrl');

const router = express.Router();

router.post('/candidate', CandidateCtrl.registerCandidate);
router.put('/candidate/:id', CandidateCtrl.updateCandidate);
router.get('/candidates', CandidateCtrl.getCandidates);
router.get('/candidate/:id', CandidateCtrl.getCandidateById);
router.delete('/candidate/:id', CandidateCtrl.deleteCandidate);
module.exports = router;