#!/bin/bash

# project setup script

echo "🚀 Starting project setup..."

# Step 1: Check for existing backend .env file
ENV_FILE="./backend/.env"



# Step 2: Install root dev dependencies
echo "📦 Installing root dependencies (concurrently)..."
npm install --save-dev concurrently

# Step 3: Set up the backend
echo "💻 Setting up the backend..."
cd backend

# Create backend .env if it doesn't exist
if [ ! -f .env ]; then
    echo "DATABASE_URL=your_db_url_here" >> .env
    echo "PORT=5000" >> .env
    echo "JWT_SECRET=your_secret_key_here" >> .env
    echo "JWT_EXPIRATION_TIME=1d" >> .env
    echo "EXPIRE_OTP_TIME=120000" >> .env
else
    echo "✅ .env already exists in backend."
fi

# Install backend dependencies
npm install

# Step 4: Set up the frontend
echo "⚛️ Setting up the frontend..."
pwd

cd ..
pwd
cd frontend
pwd
# Create frontend .env if it doesn't exist
if [ ! -f .env ]; then
    echo "API_URL=https://localhost:5000/api" > .env
else
    echo "✅ .env already exists in frontend."
fi

npm install

# Step 5: Return to root
cd ..

# Final instructions
echo "✅ Setup complete!"
echo "🔑 Default admin created:"
echo "   Email: admin@oneReview.com"
echo "   Password: admin123"
echo "💡 To start development, run: npm run dev"
# echo "💡 To start production, run: npm run prod"