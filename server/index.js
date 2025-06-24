const express = require('express')
const app = express()

const db = require('./models')

//ROUTERS
const familyTableRoute = require('./routes/FamilyTableRoute')
app.use("/FamilyTableRoute", familyTableRoute)



db.sequelize.sync().then(()=>{
    app.listen(3001, () =>{
        console.log("Server running on port 3001");
    });
});



