
const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

// Import test data from JSON file
const users = require('../data/users.json');

// Loop through each user and create a separate test
users.forEach((user) => {

  test(`Login test - ${user.username} - Expected: ${user.expected}`, async ({ page }) => {

    // Create Page Object instances
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Open the login page
    await loginPage.goto();

    // Login using JSON data
    await loginPage.login(user.username, user.password);

    // Verify the expected result
    if (user.expected === 'success') {

      // Check whether inventory page is loaded
      await expect.poll(() => inventoryPage.isLoaded()).toBe(true);

    } else if (user.expected === 'error') {

      // Check whether an error message is displayed
      const errorMessage = await loginPage.getErrorMessage();

      expect(errorMessage).toBeTruthy();
      expect(errorMessage.length).toBeGreaterThan(0);

    }

  });

});
