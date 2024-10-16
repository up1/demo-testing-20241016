import { test, expect } from '@playwright/test';

test('Hello page', async ({ page }) => {
  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  
  await expect(page).toHaveScreenshot();
});