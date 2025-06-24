const express = require('express');
const router = express.Router();
const {FamilyTable} = require('../models/');


router.get("/", async(req,res) =>{
    const familyList = await FamilyTable.findAll();
    res.json(familyList);
});

router.post("/", async (req,res) =>{
    const familyTable = req.body;

    await FamilyTable.create(familyTable);
    res.json(familyTable);
})


module.exports = router