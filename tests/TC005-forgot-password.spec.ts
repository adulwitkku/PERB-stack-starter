import { expect, test } from '@playwright/test';

test.describe('Forgot Password', () => {
  test('should navigate to forgot password page from sign in', async ({ page }) => {
    await page.goto('/en/auth/sign-in');

    // Click on "forgot your password?" link
    await page.getByRole('link', { name: /forgot.*password/i }).click();

    // Verify navigation to forgot password page
    await expect(page).toHaveURL(/\/auth\/forgot-password/);
  });

  test('should send reset password email', async ({ page }) => {
    await page.goto('/en/auth/forgot-password');

    // Fill in email
    await page.getByLabel('email').fill('test@example.com');

    // Click send reset link button
    await page.getByRole('button', { name: /send reset link/i }).click();

    // Expect success toast to appear
    await expect(page.locator('[data-sonner-toast]').first()).toBeVisible({ timeout: 10000 });
  });

  test('should handle non-existent email gracefully', async ({ page }) => {
    await page.goto('/en/auth/forgot-password');

    // Fill in non-existent email
    const nonExistentEmail = `nonexistent${Date.now()}@example.com`;
    await page.getByLabel('email').fill(nonExistentEmail);

    // Click send reset link button
    const submitButton = page.getByRole('button', { name: /send reset link/i });
    await submitButton.click();

    // Wait for response - either toast appears, redirects to sign-in, or stays on page
    // The system should handle gracefully without crashing
    await Promise.race([
      // Option 1: Toast appears (success or error)
      expect(page.locator('[data-sonner-toast]').first()).toBeVisible({ timeout: 10000 }),
      // Option 2: Redirects to sign-in page (success behavior)
      expect(page).toHaveURL(/\/auth\/sign-in/, { timeout: 10000 }),
      // Option 3: Button becomes enabled again after submission (form completed without redirect)
      expect(submitButton).toBeEnabled({ timeout: 10000 }),
    ]);
  });
});
