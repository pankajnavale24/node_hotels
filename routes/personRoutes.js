const express = require('express');
const router = express.Router();
const person = require('../models/person');

router.get('/',async (req,res)=>{
    try{
        const data = await person.find();
        console.log('data geted');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});

    }
});

router.post('/', async (req,res)=>{
    try{
    const data= req.body;
    //asssume that reqest body contains persons data
    const newPerson = new person(data);
    //crate a new person document using a mogoddb person model
    const response= await newPerson.save(); 
    //save the new person to the database
    console.log('data posted');
    res.status(200).json(response);
    }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
    }
});

router.put('/:id', async(req,res)=>{
    try {
        const personId = req.params.id;
        //extract the id from url parameter
        const updatePersonData = req.body;
        const response = await person.findByIdAndUpdate(personId,updatePersonData,{
            new : true, //retuen updated document
            runValidators : true // run mongoose validations
        })
        if(!response){
        return res.status(400).json({error :"response not found"});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
        }
});

router.delete('/:id', async(req,res)=>{
    try {
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId)

        if(!response){
        return res.status(400).json({error :"response not found"});
        }
        console.log('data deleted');
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
        }
});


router.get('/:workType', async (req,res)=>{
    try {
        const workType = req.params.workType;
        if(workType =='chef'||workType=='waiter'||workType =='manager'){
        const response = await person.find({work: workType});
        console.log("response fetched");
        console.log("data of manager/chef/waiter geted");
        res.status(200).json(response);
        }else{
            console.log("data not found")
            res.status(404).json({error:"internal server error"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"});
    }
});

module.exports = router;