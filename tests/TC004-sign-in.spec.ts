import { expect, test } from '@playwright/test';

test.describe('Sign In', () => {
  test('should show error with wrong password', async ({ page }) => {
    await page.goto('/en/auth/sign-in');

    // Fill in the sign in form with wrong password
    await page.getByLabel('email').fill('test@example.com');
    await page.getByLabel('password').fill('WrongPassword123!');

    // Click sign in button
    await page.getByRole('button', { name: /login/i }).click();

    // Expect error toast about invalid credentials
    await expect(page.getByText(/invalid|incorrect|wrong|not found/i)).toBeVisible({
      timeout: 10000,
    });
  });

  test('should show error with non-existent email', async ({ page }) => {
    await page.goto('/en/auth/sign-in');

    // Fill in the sign in form with non-existent email
    const nonExistentEmail = `nonexistent${Date.now()}@example.com`;
    await page.getByLabel('email').fill(nonExistentEmail);
    await page.getByLabel('password').fill('SomePassword123!');

    // Click sign in button
    await page.getByRole('button', { name: /login/i }).click();

    // Expect error toast
    await expect(page.getByText(/invalid|incorrect|not found|doesn't exist/i)).toBeVisible({
      timeout: 10000,
    });
  });

  test('should navigate to sign up page', async ({ page }) => {
    await page.goto('/en/auth/sign-in');

    // Click on "sign up" link (it's a button styled as a link inside a Link component)
    await page.getByRole('button', { name: /sign up/i }).click();

    // Verify navigation to sign up page
    await expect(page).toHaveURL(/\/auth\/sign-up/);

    // Verify the sign up page title is visible (it's in a CardTitle, not an h1)
    await expect(page.getByText('sign up').first()).toBeVisible();
  });
});
