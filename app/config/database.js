const mongoose = require('mongoose');

const uri = "mongodb+srv://rockycrack11:nAbbg1nyp4I7akIs@cluster0.h6sa7w0.mongodb.net/tpEspectaculos?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
    serverApi: { 
        version: '1', 
        strict: true, 
        deprecationErrors: true 
    }
};

async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("✅ Conexión exitosa a MongoDB Atlas");
    } catch (err) {
        console.error("❌ Error conectando a MongoDB Atlas:", err);
        process.exit(1);
    }
}

run().catch(console.dir);

module.exports = mongoose;
