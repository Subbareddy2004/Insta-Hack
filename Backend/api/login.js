const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:dTB2MaVFnpO8@ep-ancient-fire-a5moogd9.us-east-2.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
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
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
