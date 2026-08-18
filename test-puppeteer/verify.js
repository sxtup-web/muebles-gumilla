import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  let configRequests = 0;
  let configStatus = [];
  let localeRequests = 0;
  let localeStatus = [];
  let consoleErrors = [];
  
  page.on('request', request => {
    const url = request.url();
    if (url.includes('config.yml')) {
      configRequests++;
    }
    if (url.includes('dist/esm/es/index.js') || url.includes('decap-cms-locales-es')) {
      localeRequests++;
    }
  });

  page.on('response', response => {
    if (response.status() === 404) {
      consoleErrors.push('404 for: ' + response.url());
    }
    const url = response.url();
    if (url.includes('config.yml')) {
      configStatus.push(response.status());
    }
    if (url.includes('decap-cms-locales-es') || url.includes('dist/esm/es/index.js')) {
      localeStatus.push(response.status());
    }
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  
  page.on('pageerror', error => {
    consoleErrors.push(error.message);
  });
  
  await page.goto('http://localhost:35291/admin/index.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot.png' });
  
  console.log('--- TEST RESULTS ---');
  console.log(`CONFIG REQUESTS: ${configRequests} (Statuses: ${configStatus.join(', ')})`);
  console.log(`LOCALE REQUESTS: ${localeRequests} (Statuses: ${localeStatus.join(', ')})`);
  console.log(`CONSOLE ERRORS: ${consoleErrors.length}`);
  consoleErrors.forEach(err => console.log('  - ' + err));
  
  await browser.close();
})();
