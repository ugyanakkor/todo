import { expect, test } from '@playwright/test';
import { Locator } from 'playwright-core';

let descriptionField: Locator;
let submitButton: Locator;
let errorMessage: Locator;
const minleghtDescription = "Description must be at least 3 characters long.";

test.beforeEach(async ({ page }) => {
  await page.goto('/add-todo');
  descriptionField = await page.locator('[data-testid="description"]');
  submitButton = await page.locator('[data-testid="submit"]');
  errorMessage = await page.locator('[data-testid="error"]');
})

test('Check the minlength validator', async() => {
  await descriptionField.fill('Hi');

  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText(minleghtDescription);

  await expect(submitButton).toBeDisabled();
});

test('Add new todo', async({ page }) => {
  const description = 'Write integration test';
  await descriptionField.fill(description);

  await expect(errorMessage).not.toContainText(minleghtDescription);
  await submitButton.click();

  await page.goto('/todos');

  const newTodo = page.locator('[data-testid="todo-item"]');
  await expect(newTodo).toContainText(description);
});
