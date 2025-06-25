 const express = require('express');
 const router = express.Router();
 const {HouseComp} = require('../models/');


 router.get("/:FamilyID", async(req,res) =>{
     const familyID = await req.params.FamilyID;
     const HouseComps = await HouseComp.findAll({where: {FamilyID : familyID}
    });
     res.json(HouseComps);
 }); 


 router.get("/", async(req,res) =>{
     const housecomp = req.body;
     await HouseComp.create(housecomp);
     res.json(housecomp);
    });
     
 module.exports = router