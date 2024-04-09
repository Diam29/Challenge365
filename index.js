require('dotenv').config()
const app = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env;

conn.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


