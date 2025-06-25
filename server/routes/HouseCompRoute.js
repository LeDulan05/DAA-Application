 const express = require('express');
 const router = express.Router();
 const {HouseComp} = require('../models/');


 router.get("/:FamilyID", async(req,res) =>{
     const familyID = await req.params.FamilyID;
     const HouseComps = await HouseComp.findAll({where: {FamilyID : familyID}
    });
     res.json(HouseComps);
 }); 


 router.post("/", async(req,res) =>{
     const housecomp = req.body;
     const createdHouseComp = await HouseComp.create(housecomp);
     res.json(createdHouseComp);
    });
     
 module.exports = router