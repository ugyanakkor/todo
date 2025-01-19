import { expect, Locator, test } from '@playwright/test';

import { todos } from './mocks/todos.mock';

let todolist: Locator;
let todoItems: Locator;

test.beforeEach(async ({ page }) => {
  await page.goto('/todos');

  await page.evaluate((todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, todos);

  await page.reload();

  todolist = page.locator('[data-testid="todo-list"]');
  todoItems = todolist.locator('[data-testid="todo-item"]');
})

test('Check the todo list is available with the mocked 3 elements', async () => {
  expect(await todoItems.count()).toBe(3);
});

test('Remove 1 element from the list', async ({page}) => {
  const lastTodoLocator = todolist.locator('li:last-child');
  const deleteButton = lastTodoLocator.locator('[data-testid="delete"]');

  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Are you sure you want to delete this todo?');  // Optionally verify the message
    await dialog.accept();  // Click "OK" to confirm
  });

  await deleteButton.click();
  expect(await todoItems.count()).toBe(2);
});

test('Moke complete the first element from the list', async () => {
  const firstTodoLocator = todolist.locator('li:first-child');
  const doneButton = firstTodoLocator.locator('[data-testid="completion"]');
  await expect(doneButton).toHaveText('Done');

  await doneButton.click();
  await expect(doneButton).toHaveText('Undone');
});

test('Edit description of the second element of the list', async ({ page }) => {
  const secondTodoLocator = todolist.locator('li').nth(1);
  const editButton = secondTodoLocator.locator('[data-testid="edit"]');

  const modal = page.locator('dialog.modal');
  await editButton.click();
  await expect(modal).toBeVisible();

  const textarea = modal.locator('textarea');
  const descriptionLocator = secondTodoLocator.locator('[data-testid="description"]');
  await expect(descriptionLocator).toHaveText("reading book");

  const newText = 'Updated Todo Text';
  await textarea.fill(newText);

  const saveButton = modal.locator('[data-testid="save"]');
  await saveButton.click();
  await expect(descriptionLocator).toHaveText(newText);
});
