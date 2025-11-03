# TODO: Add Backend API for Permanent Data Storage

## Step 1: Set up Backend Directory and Package.json
- Create `backend/` directory
- Create `backend/package.json` with dependencies: express, mongoose, cors, dotenv

## Step 2: Set up MongoDB Connection
- Guide user to set up MongoDB Atlas (free tier) and get connection string
- Create `backend/.env` file for environment variables
- Create `backend/server.js` with Express setup and MongoDB connection

## Step 3: Define Mongoose Models
- Create `backend/models/Product.js` schema
- Create `backend/models/Sale.js` schema

## Step 4: Create API Routes
- Create `backend/routes/products.js` with CRUD endpoints
- Create `backend/routes/sales.js` with CRUD endpoints

## Step 5: Update Frontend Context
- Modify `src/context/InventoryContext.jsx` to use fetch API instead of local state
- Add loading and error states

## Step 6: Seed Initial Data
- Add script to seed initial products into database

## Step 7: Test and Run
- Install backend dependencies
- Run backend server
- Test API endpoints
- Verify frontend works with backend
- Check data persistence on refresh

## Completed Steps:
- [x] Step 1: Set up Backend Directory and Package.json
- [x] Step 2: Set up MongoDB Connection
- [x] Step 3: Define Mongoose Models
- [x] Step 4: Create API Routes
- [x] Step 5: Update Frontend Context
- [x] Step 6: Seed Initial Data

## Remaining Steps:
- [x] Step 7: Test and Run
  - [x] Guide user to set up MongoDB Atlas and get connection string
  - [x] Update .env with actual MongoDB URI
  - [x] Run backend seed script
  - [x] Start backend server
  - [x] Test API endpoints
  - [x] Verify frontend persistence
