const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  'postgres',
  'postgres.zwrbxuvhhfbtswsebcwy',
  'MNCkRR67TDqj2RRR',
  {
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    dialect: 'postgres',
    port: 5432,
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.FamilyTable = require('./FamilyTable')(sequelize,Sequelize.DataTypes);



async function initialize() {
  try {
    // First test the connection
    await sequelize.authenticate();
    console.log('✓ Database connection established');

    // Then sync models (only in development)
    await sequelize.sync({ alter: false });
    console.log('✓ Models synchronized');

    // Test insert using FamilyTable (not User)
    //const testFamily = await db.FamilyTable.create({
    //  Name: 'Eric',
    //  Address: 'Manila',
    //  Contact: '123456789'
    //});
    //console.log('✓ Test family created:', testFamily.FamilyID);

    // Verify the table exists in database


  } catch (error) {
    console.error('! Initialization failed:', error);
    process.exit(1); // Exit if initialization fails
  }
}

initialize();

module.exports = db;
