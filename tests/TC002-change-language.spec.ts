import { test, expect } from '@playwright/test';

test.describe('Language Toggle', () => {
  test('should change language from English to Thai', async ({ page }) => {
    await page.goto('/en');

    // Verify we're on English page
    await expect(page).toHaveURL(/\/en/);

    // Click language toggle button
    const languageButton = page.getByRole('button', { name: 'Change language' });
    await languageButton.click();

    // Select Thai language
    await page.getByRole('menuitem', { name: '🇹🇭 ไทย' }).click();

    // Verify URL changed to Thai locale
    await expect(page).toHaveURL(/\/th/);

    // Verify text changed to Thai (Sign In button should show "ลงชื่อเข้าใช้")
    await expect(page.getByRole('link', { name: 'ลงชื่อเข้าใช้' })).toBeVisible();
  });
});
