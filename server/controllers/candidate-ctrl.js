const Candidate = require('../models/candidate-model');
const bcrypt = require("bcryptjs");


registerCandidate = (req, res)=>{
    const body = req.body;
    if(!body){
        return res.status(400).json({success:false, error:'No candidate provided'});
    }

    const candidate = new Candidate(body);
    if(!candidate){
        return res.status(400).json({success:false, error:err});
    }

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(body.password, salt, (err, hash)=>{
            if(err){
                return res.status(400).json({success:false, error:err});
            }else{
                candidate.password = hash;
                candidate
                .save()
                .then(()=>{
                    return res.status(201).json({
                        success:true,
                        id: candidate._id,
                        //message:'candidate created'
                    });
                }).catch((err)=>{
                    if(err.code == 11000){
                        return res.status(400).json({success:false, error:'dupe in use'});
                    }else{
                        return res.status(400).json({success:false, error:err});
                    }
                });
            }
        });
    });
};


authenticateCandidate = (req, res)=>{
    const body = req.body;
    if(!body){
        return res.status(400).json({success:false, error:'No candidate provided'});
    }

    Candidate.find({userName: body.userName})
    .exec()
    .then((candidates)=>{
        if(!candidates){
            return res.status(400).json({success:false, error:'No such candidate'});
        }else{
            bcrypt.compare(body.password, candidates[0].password)
            .then((res)=>{
                if(res===true){
                    candidates[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent: body.userAgent});
                    Candidate.update(
                        {userName: candidates[0].userName},
                        {$set: {loginHistory: candidates[0].loginHistory}},
                        {multi: false}
                    ).exec()
                    .then(()=>{
                        return res.status(201).json(candidates[0]);
                    }).catch((err)=>{
                        return res.status(400).json({success:false, error:'verification error'});
                    });
                }else{
                    return res.status(400).json({success:false, error:'password error'});
                }
            });
        }
    }).catch(()=>{
        return res.status(400).json({success:false, error:'Unable to find candidate'});
    });
};

updateCandidate = async (req, res)=>{
    const body = req.body;
    if(!body){
        return res.status(400).json({success: false, error: 'You must provide a body to update'});
    }

    Candidate.findOne({ _id: req.params.id }, (err, candidate)=>{
        if(err){
            return res.status(404).json({err, message: 'candidate not found!'});
        }

        candidate.firstName = body.firstName;
        candidate.lastName = body.lastName;
        candidate.skillSet = body.skillSet;
        candidate.jobExpSet = body.jobExpSet;
        candidate.interestSet = body.interestSet;

        candidate.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: candidate._id,
                message: 'candidate updated!'
            });
        })
        .catch((error) => {
            return res.status(404).json({error, message: 'candidate not updated!'});
        });
    });
};

getCandidates = async (req, res)=>{
    await Candidate.find({}, (err, candidates)=>{
        if(err){
            return res.status(400).json({success: false, error: err});
        }
        if(!candidates.length){
            return res.status(404).json({success: false, error: `candidate not found`});
        }
        return res.status(200).json({success: true, data: candidates });
    }).catch(err=>console.log(err));
};

getCandidateById = async (req, res)=>{
    await Candidate.find({}, (err, candidates)=>{
        if(err){
            return res.status(400).json({success: false, error: err});
        }
        if(!candidates.length){return res.status(404).json({success: false, error: `Movie not found`});}

        return res.status(200).json({
            success: true, data: movies
        });
    }).catch(err => console.log(err));
};

deleteCandidate = async (req, res)=>{
    await Candidate.findOneAndDelete({_id:erq.params.id}, (err, candidate)=>{
        if(err){
            return res.status(400).json({success:false, error:err});
        }
        if(!candidate){
            return res.status(404).json({success:false, error:'Candidate not found'});
        }

        return res.status(200).json({
            success: true,
            data: candidate
        });
    }).catch(err=>console.log(err));
};

module.exports = {
    registerCandidate,
    authenticateCandidate,
    updateCandidate,
    getCandidates,
    getCandidateById,
    deleteCandidate
};