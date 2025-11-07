// Script to fix existing applications by adding sessionUsername field
const { MongoClient } = require('mongodb');

async function fixApplications() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('fxg_applications');
    const collection = db.collection('applications');

    // Get all applications that don't have sessionUsername
    const applications = await collection.find({
      sessionUsername: { $exists: false }
    }).toArray();

    console.log(`Found ${applications.length} applications to fix`);

    // Update each application
    for (const app of applications) {
      const update = {
        $set: {
          sessionUsername: app.discordUsername,
          sessionEmail: app.email || null
        }
      };

      await collection.updateOne(
        { _id: app._id },
        update
      );

      console.log(`Fixed application ${app.id} - set sessionUsername to: ${app.discordUsername}`);
    }

    console.log('✅ All applications fixed!');
  } catch (error) {
    console.error('Error fixing applications:', error);
  } finally {
    await client.close();
  }
}

fixApplications();
