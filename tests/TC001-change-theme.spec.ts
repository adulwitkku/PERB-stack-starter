import { expect, test } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should change theme from light to dark and back', async ({ page }) => {
    await page.goto('/en');

    // Click theme toggle button
    const themeButton = page.getByRole('button', { name: 'Toggle theme' });
    await themeButton.click();

    // Select Dark theme
    await page.getByRole('menuitem', { name: 'Dark' }).click();

    // Verify dark class is added to html element
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Open theme menu again
    await themeButton.click();

    // Select Light theme
    await page.getByRole('menuitem', { name: 'Light' }).click();

    // Verify dark class is removed
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
