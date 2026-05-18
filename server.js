// import express from 'express';
// import pg from 'pg';
// import dotenv from 'dotenv';

// // Load the environment variables from the .env.local file
// dotenv.config({ path: '.env.local' });

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(express.json());

// // Set up the PostgreSQL connection pool using DATABASE_URL
// const { Pool } = pg;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false // Required for Neon serverless postgres
//   }
// });

// // Test Route to Query Database
// app.get('/api/test-db', async (req, res) => {
//   try {
//     // Run a query to test the connection
//     const result = await pool.query('SELECT NOW();');
//     res.json({
//       success: true,
//       message: "Successfully connected to your Neon Database!",
//       timestamp: result.rows[0].now
//     });
//   } catch (error) {
//     console.error("Database connection error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Node.js server running locally at http://localhost:${port}`);
// });
// ============================================

// import express from 'express';
// import pg from 'pg';
// import dotenv from 'dotenv';

// // Load the environment variables from the .env.local file
// dotenv.config({ path: '.env.local' });

// const app = express();
// const port = process.env.PORT || 3001;

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Set up the PostgreSQL connection pool using DATABASE_URL from .env.local
// const { Pool } = pg;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false // Required for Neon serverless postgres
//   }
// });

// // 1. Base Root Route (Fixes the "Cannot GET /" screen)
// app.get('/', (req, res) => {
//   res.send(`
//     <div style="font-family: sans-serif; padding: 40px; text-align: center; background: #f9f9f9; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
//       <h1 style="color: #333;">🚀 Node.js Backend Running Successfully!</h1>
//       <p style="color: #666; font-size: 18px;">Your Express server is up and listening on port ${port}.</p>
//       <div style="margin-top: 20px;">
//         <a href="/api/test-db" style="display: inline-block; background: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
//           Test Database Connection →
//         </a>
//       </div>
//     </div>
//   `);
// });

// // 2. Test Route to Query Database
// app.get('/api/test-db', async (req, res) => {
//   try {
//     // Run a quick query to test the connection
//     const result = await pool.query('SELECT NOW();');
//     res.json({
//       success: true,
//       message: "Successfully connected to your Neon Database!",
//       timestamp: result.rows[0].now
//     });
//   } catch (error) {
//     console.error("Database connection error:", error);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to query the database",
//       details: error.message 
//     });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Node.js server running locally at http://localhost:${port}`);
// });

// ====================================

// import express from 'express';
// import pg from 'pg';
// import dotenv from 'dotenv';

// // Load all updated environment variables from .env.local
// dotenv.config({ path: '.env.local' });

// const app = express();
// const port = process.env.PORT || 3001;

// // Middleware to process JSON request payloads
// app.use(express.json());

// // Set up the PostgreSQL connection pool using your updated DATABASE_URL
// const { Pool } = pg;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false // Necessary for serverless Neon database connection layers
//   }
// });

// // 1. Root Welcome Screen Route
// app.get('/', (req, res) => {
//   res.send(`
//     <div style="font-family: sans-serif; padding: 40px; text-align: center; background: #f9f9f9; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
//       <h1 style="color: #333;">🔗 Live Database Table API Connected!</h1>
//       <p style="color: #666; font-size: 18px;">Connected to database: <strong>${process.env.PGDATABASE || 'my-node-backend'}</strong></p>
//       <div style="margin-top: 20px;">
//         <a href="/api/contacts" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
//           Fetch Table Entries Data (GET) →
//         </a>
//       </div>
//     </div>
//   `);
// });

// // 2. GET API Route: Fetches and returns all data records from the users_contact table
// app.get('/api/contacts', async (req, res) => {
//   try {
//     // Queries the new layout table and organizes entries by newest submission date
//     const result = await pool.query('SELECT id, product_name, name, email, phone_number, message, created_at FROM users_contact ORDER BY created_at DESC;');
    
//     res.json({
//       success: true,
//       count: result.rowCount,
//       database: process.env.PGDATABASE || 'my-node-backend',
//       table: 'users_contact',
//       data: result.rows
//     });
//   } catch (error) {
//     console.error("Database Query Error:", error);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to fetch data from the users_contact table.",
//       details: error.message 
//     });
//   }
// });

// // 3. POST API Route: Insert records matching the explicit (product_name before name) order
// app.post('/api/contact', async (req, res) => {
//   const { product_name, name, email, phone_number, message } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ 
//       success: false, 
//       error: "The name and email properties are mandatory parameters." 
//     });
//   }

//   try {
//     const queryText = `
//       INSERT INTO users_contact (product_name, name, email, phone_number, message)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *;
//     `;
//     const values = [product_name || null, name, email, phone_number || null, message || null];
    
//     const result = await pool.query(queryText, values);

//     res.status(201).json({
//       success: true,
//       message: "Data securely captured inside users_contact table!",
//       record: result.rows[0]
//     });
//   } catch (error) {
//     console.error("Database Insert Error:", error);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to store record data within the database.",
//       details: error.message 
//     });
//   }
// });

// // Start listening execution
// app.listen(port, () => {
//   console.log(`Node server running locally at http://localhost:${port}`);
// });


// =========================


// import express from 'express';
// import pg from 'pg';
// import dotenv from 'dotenv';
// import cors from 'cors'; // Handles cross-origin requests from your form

// // Load all updated environment variables from .env.local
// dotenv.config({ path: '.env.local' });

// const app = express();
// const port = process.env.PORT || 3001;

// // Middlewares
// app.use(cors()); // Allows your storefront form to securely talk to this API
// app.use(express.json()); // Parses incoming JSON data payloads

// // Set up the PostgreSQL connection pool using your updated DATABASE_URL
// const { Pool } = pg;
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false // Necessary for serverless Neon database connection layers
//   }
// });

// // 1. Root Welcome Screen Route
// app.get('/', (req, res) => {
//   res.send(`
//     <div style="font-family: sans-serif; padding: 40px; text-align: center; background: #f9f9f9; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
//       <h1 style="color: #333;">🔗 Live Database Table API Connected!</h1>
//       <p style="color: #666; font-size: 18px;">Connected to database: <strong>${process.env.PGDATABASE || 'my-node-backend'}</strong></p>
//       <div style="margin-top: 20px;">
//         <a href="/api/contacts" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
//           Fetch Table Entries Data (GET) →
//         </a>
//       </div>
//     </div>
//   `);
// });

// // 2. GET API Route: Fetches and returns all data records from the users_contact table
// app.get('/api/contacts', async (req, res) => {
//   try {
//     // Queries the new layout table and organizes entries by newest submission date
//     const result = await pool.query('SELECT id, product_name, name, email, phone_number, message, created_at FROM users_contact ORDER BY created_at DESC;');
    
//     res.json({
//       success: true,
//       count: result.rowCount,
//       database: process.env.PGDATABASE || 'my-node-backend',
//       table: 'users_contact',
//       data: result.rows
//     });
//   } catch (error) {
//     console.error("Database Query Error:", error);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to fetch data from the users_contact table.",
//       details: error.message 
//     });
//   }
// });

// // 3. POST API Route: Insert records matching the explicit (product_name before name) order
// app.post('/api/contact', async (req, res) => {
//   const { product_name, name, email, phone_number, message } = req.body;

//   // Basic form field validation
//   if (!name || !email) {
//     return res.status(400).json({ 
//       success: false, 
//       error: "The name and email properties are mandatory parameters." 
//     });
//   }

//   try {
//     const queryText = `
//       INSERT INTO users_contact (product_name, name, email, phone_number, message)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *;
//     `;
//     const values = [product_name || null, name, email, phone_number || null, message || null];
    
//     const result = await pool.query(queryText, values);

//     res.status(201).json({
//       success: true,
//       message: "Data securely captured inside users_contact table!",
//       record: result.rows[0]
//     });
//   } catch (error) {
//     console.error("Database Insert Error:", error);
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to store record data within the database.",
//       details: error.message 
//     });
//   }
// });

// // Start listening execution
// app.listen(port, () => {
//   console.log(`Node server running locally at http://localhost:${port}`);
// });


// ==================================

import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: '.env.local' });

const app = express();

app.use(cors());
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 1,                         // ✅ Required for serverless
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center;">
      <h1>🔗 Live Database Table API Connected!</h1>
      <a href="/api/contacts">Fetch Contacts →</a>
    </div>
  `);
});

// GET contacts
app.get('/api/contacts', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, product_name, name, email, phone_number, message, created_at FROM users_contact ORDER BY created_at DESC;'
    );
    res.json({ success: true, count: result.rowCount, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release(); // ✅ Always release in serverless
  }
});

// POST contact
app.post('/api/contact', async (req, res) => {
  const { product_name, name, email, phone_number, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'name and email are required.' });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO users_contact (product_name, name, email, phone_number, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [product_name || null, name, email, phone_number || null, message || null]
    );
    res.status(201).json({ success: true, record: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
});

// ✅ KEY FIX: Export for Vercel instead of app.listen()
export default app;