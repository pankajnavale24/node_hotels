const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/',async (req,res)=>{
    try{
        const data = await MenuItem.find();
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
    const newMenuItem = new MenuItem(data);
    //crate a new person document using a mogoddb person model
    const response= await newMenuItem.save(); 
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
        const MenuItemId = req.params.id;
    const updateMenuItemData = req.body;
    const response = await MenuItem.findByIdAndUpdate(MenuItemId,updateMenuItemData,{
        new : true,
        runValidators:true
    })
    if(!response){
        return res.status(400).json({error : "response not found"});
    }
    console.log("data updated");
    res.status(200).json(response);
    } catch (err) {
        console.log(err)
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.delete('/:id', async (req,res)=>{
    try {
        const MenuItemId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(MenuItemId);
        if(!response){
            return res.status(400).json({eroor : "response not found "});
        }
        console.log("data deleted");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error : " internal server error"});
    }
});

router.get('/:tasteType', async (req,res)=>{
    try {
        const tasteType = req.params.tasteType;
        if(tasteType =='saour'||tasteType=='sweet'){
        const response = await MenuItem.find({taste: tasteType});
        console.log("response fetched");
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

//git commment for testing perpose