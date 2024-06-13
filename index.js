const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URI
const uri = 'mongodb+srv://gvyadav2012:Gourav20@cluster0.nacdwph.mongodb.net/Links';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

connectToDB();

// Redirect route
app.get('/hym24', async (req, res) => {
  try {
    const db = client.db('Link');
    const collection = db.collection('Links');
    const doc = await collection.findOne({ ln: 1 });
    console.log(doc)
    if (doc && doc.status === 1 && doc.redirectUrl) {
      res.redirect(doc.redirectUrl);
    } else {
      res.status(404).send('Redirect URL not found or status is not 1');
    }
  } catch (err) {
    console.error('Error fetching redirection URL from the database:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/5pam24', async (req, res) => {
    try {
      const db = client.db('Link');
      const collection = db.collection('Links');
      const doc = await collection.findOne({ ln: 2 });
      console.log(doc)
      if (doc && doc.status === 1 && doc.redirectUrl) {
        res.redirect(doc.redirectUrl);
      } else {
        res.status(404).send('Redirect URL not found or status is not 1');
      }
    } catch (err) {
      console.error('Error fetching redirection URL from the database:', err);
      res.status(500).send('Internal Server Error');
    }
  });


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
