// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  await expect(page).toHaveTitle('Vite + React');
});

test('Check h1 text', async ({ page }) => {
  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  const h1Text = await page.textContent('h1');
  expect(h1Text).toBe('Call REST API');
});

test('Check h1 text from test id', async ({ page }) => {
  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  const message_text = await page.getByTestId('message_text').textContent();
  expect(message_text).toBe('Call REST API');
});


test('Check p tag text', async ({ page }) => {
  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  
  await page.waitForSelector('p');
  const pText = await page.textContent('p');
  expect(pText).toBe('Hello World!');
});

test('Check p tag text from test id', async ({ page }) => {
  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  
  await page.waitForSelector('[data-testid="hello_text"]');
  const hello_text = await page.getByTestId('hello_text').textContent();
  expect(hello_text).toBe('Hello World!');
});

test('Mock API response', async ({ page }) => {
  // Intercept network requests
  await page.route('https://demo-backend-nodejs.vercel.app/**', route => {
    // Respond with a mock response
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Hello World with Mock' })
    });
  });

  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  await page.waitForSelector('[data-testid="hello_text"]');
  const hello_text = await page.getByTestId('hello_text').textContent();
  expect(hello_text).toBe('Hello World with Mock');
});