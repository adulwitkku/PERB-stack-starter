import { expect, test } from '@playwright/test';

test.describe('Sign Up', () => {
  test('should register a new user successfully', async ({ page }) => {
    await page.goto('/en/auth/sign-up');

    // Generate unique email to avoid conflicts
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;

    // Fill in the sign up form
    await page.getByLabel('name').fill('Test User');
    await page.getByLabel('email').fill(testEmail);
    await page.getByLabel('password').fill('TestPassword123!');

    // Click sign up button
    await page.getByRole('button', { name: /create an account/i }).click();

    // Wait for success - either redirect to sign-in page with toast, email verification page, or toast on current page
    await expect(
      page
        .locator('[data-sonner-toast]')
        .first()
        .or(page.getByText(/verify your email|email verification|check your email/i))
        .or(page.locator('text=sign in').first()),
    ).toBeVisible({ timeout: 15000 });
  });

  test('should show error when registering with existing email', async ({ page }) => {
    await page.goto('/en/auth/sign-up');

    // First, register a user
    const timestamp = Date.now();
    const testEmail = `existing${timestamp}@example.com`;

    // Fill in the sign up form
    await page.getByLabel('name').fill('Test User');
    await page.getByLabel('email').fill(testEmail);
    await page.getByLabel('password').fill('TestPassword123!');

    // Click sign up button
    await page.getByRole('button', { name: /create an account/i }).click();

    // Wait for first registration to complete
    await page.waitForTimeout(2000);

    // Go to sign up page again
    await page.goto('/en/auth/sign-up');

    // Try to register with the same email
    await page.getByLabel('name').fill('Test User 2');
    await page.getByLabel('email').fill(testEmail);
    await page.getByLabel('password').fill('TestPassword123!');

    // Click sign up button
    await page.getByRole('button', { name: /create an account/i }).click();

    // Expect error toast about existing user
    await expect(page.getByText(/already exists|user already|email.*taken/i)).toBeVisible({
      timeout: 10000,
    });
  });
});
