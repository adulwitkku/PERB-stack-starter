import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const TEST_EMAIL = `todo-e2e-${Date.now()}@example.com`;
const TEST_PASSWORD = 'TestPassword123!';
const STORAGE_STATE_PATH = path.join(__dirname, '.auth-todo-e2e.json');

// Setup: register + login once, save session for all tests
base.describe('Todo CRUD (E2E via V2 Hexagonal API)', () => {
  base.describe.configure({ mode: 'serial' });

  base.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Register
    await page.goto('/en/auth/sign-up');
    await page.getByLabel('name').fill('Todo E2E User');
    await page.getByLabel('email').fill(TEST_EMAIL);
    await page.getByLabel('password').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: /create an account/i }).click();
    await page.waitForTimeout(3000);

    // Login
    await page.goto('/en/auth/sign-in');
    await page.getByLabel('email').fill(TEST_EMAIL);
    await page.getByLabel('password').fill(TEST_PASSWORD);
    await page.getByRole('button', { name: /login/i }).click();
    await page.waitForURL(/(?!.*sign-in)/, { timeout: 10000 });

    // Save authenticated state
    await context.storageState({ path: STORAGE_STATE_PATH });
    await context.close();
  });

  base.afterAll(async () => {
    if (fs.existsSync(STORAGE_STATE_PATH)) fs.unlinkSync(STORAGE_STATE_PATH);
  });

  // Create a test fixture that reuses the stored session
  const test = base.extend({
    context: async ({ browser }, use) => {
      const context = await browser.newContext({ storageState: STORAGE_STATE_PATH });
      await use(context);
      await context.close();
    },
    page: async ({ context }, use) => {
      const page = await context.newPage();
      await page.goto('/en/todo');
      await page.waitForLoadState('networkidle');
      await use(page);
      await page.close();
    },
  });

  test('should display the todo list page', async ({ page }) => {
    await expect(page.getByText('My Todos')).toBeVisible({ timeout: 5000 });
  });

  test('should add a new todo', async ({ page }) => {
    const title = `E2E Test Todo ${Date.now()}`;

    await page.getByPlaceholder('What needs to be done?').fill(title);
    await page.locator("form button[type='submit']").click();

    await expect(page.getByText(title)).toBeVisible({ timeout: 5000 });
  });

  test('should toggle a todo complete', async ({ page }) => {
    const title = `Toggle Test ${Date.now()}`;
    await page.getByPlaceholder('What needs to be done?').fill(title);
    await page.locator("form button[type='submit']").click();
    await expect(page.getByText(title)).toBeVisible({ timeout: 5000 });

    const row = page.getByRole('row').filter({ hasText: title });
    await row.getByRole('checkbox').click();

    await expect(row.getByText(title)).toHaveClass(/line-through/, { timeout: 3000 });
  });

  test('should delete a todo', async ({ page }) => {
    const title = `Delete Test ${Date.now()}`;
    await page.getByPlaceholder('What needs to be done?').fill(title);
    await page.locator("form button[type='submit']").click();
    await expect(page.getByText(title)).toBeVisible({ timeout: 5000 });

    const row = page.getByRole('row').filter({ hasText: title });
    await row.getByRole('button').click();

    await expect(page.getByText(title)).not.toBeVisible({ timeout: 3000 });
  });

  test('should verify API calls go to /api/v2/todo', async ({ page }) => {
    const apiCalls: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/') && req.url().includes('/todo')) {
        apiCalls.push(req.url());
      }
    });

    // Trigger a fresh fetch by reloading
    await page.reload();
    await page.waitForLoadState('networkidle');

    expect(apiCalls.length).toBeGreaterThan(0);
    for (const url of apiCalls) {
      expect(url).toContain('/api/v2/todo');
      expect(url).not.toMatch(/\/api\/v1\/todo/);
    }
  });
});
