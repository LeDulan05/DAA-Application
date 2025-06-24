module.exports = (sequelize, DataTypes) => {

    const FamilyTable = sequelize.define("FamilyTable",{

        FamilyID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "FamilyID" ,
        },

        Name: {
            type: DataTypes.STRING,
        },

        Address: {
            type: DataTypes.STRING,
        },

        Contact: {
            type: DataTypes.STRING,
        }

    },
    {
        timestamps:false,
        tableName: "FamilyTable"
    },
    );

    return FamilyTable; 
}