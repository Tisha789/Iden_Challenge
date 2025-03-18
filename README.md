# Iden_Challenge
This Playwright-based web scraper automates data extraction from an inventory system. It logs in, navigates through sections, scrapes product details, handles pagination, and saves data in JSON format. It also supports session management for seamless authentication.

✅ Features:
1. Automated login with session storage
2. Extracts product details (ID, name, price, stock)
3. Handles pagination dynamically
4. Chrome & Playwright Chromium support
5. Saves data in a structured JSON format

🔧 Tech Stack:
1. Node.js
2. Playwright
3. JavaScript
   
Setup Instructions:

1️⃣ Install Dependencies:

npm install playwright fs

2️⃣ Install Playwright Browsers (if not installed):

npx playwright install

3️⃣ Run the Script:

node scraper.js
