const { chromium } = require('playwright');
const fs = require('fs');

const SESSION_FILE = 'session.json';
const EMAIL = 'tisha.prakash@cmr.edu.in';
const PASSWORD = 'BQ9VVGUC';
const BASE_URL = 'https://hiring.idenhq.com';

(async () => {
    const browser = await chromium.launch({ headless: false });
    let context;

    if (fs.existsSync(SESSION_FILE)) {
        console.log("✅ Using existing session.");
        context = await browser.newContext({ storageState: SESSION_FILE });
    } else {
        console.log("🔐 No session found. Logging in...");
        context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${BASE_URL}/login`);

        await page.waitForSelector('input[name="email"]', { timeout: 5000 });
        await page.fill('input[name="email"]', EMAIL);
        await page.fill('input[name="password"]', PASSWORD);
        await page.click('button[type="submit"]');

        await page.waitForURL('**/dashboard', { timeout: 10000 });
        console.log("✅ Logged in! Current Page:", page.url());

        await context.storageState({ path: SESSION_FILE });
    }

    const page = await context.newPage();
    await page.goto(`${BASE_URL}/challenge`);
    console.log("✅ Navigated to challenge page:", page.url());

    // Ensure the table exists before extracting
    await page.waitForSelector('tbody tr', { timeout: 10000 });

    // Extract product data
    const products = await page.evaluate(() => {
        const rows = document.querySelectorAll('tbody tr');  
        return Array.from(rows).map(row => {
            const columns = row.querySelectorAll('td');
            return {
                id: columns[0]?.innerText.trim(),
                sku: columns[1]?.innerText.trim(),
                category: columns[2]?.innerText.trim(),
                stock: columns[3]?.innerText.trim(),
                manufacturer: columns[4]?.innerText.trim(),
                warranty: columns[5]?.innerText.trim(),
                size: columns[6]?.innerText.trim(),
                price: columns[7]?.innerText.trim(),
                item: columns[8]?.innerText.trim()
            };
        });
    });

    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    console.log(`✅ Extracted ${products.length} products and saved to products.json.`);

    await browser.close();
})();
