module.exports = (sequelize, DataTypes) => {

    const HouseComp = sequelize.define("HouseComp",{

        HouseCompID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "HouseCompID" ,
        },

        FamilyID: {
            type: DataTypes.INTEGER,
            field: "FamilyID" ,
            references: {
                model: "FamilyTable",
                key: "FamilyID",
            }
        },

        NumChildren:{
            type: DataTypes.INTEGER,
        },

        NumSeniors:{
            type: DataTypes.INTEGER,
        },

        NumPWD:{
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps:false,
        tableName: "HouseComp"
    },
    );

    HouseComp.associate = (models) => {
    HouseComp.belongsTo(models.FamilyTable, {
      foreignKey: "FamilyID",
      as: "family",
    })
  }

    return HouseComp; 
}