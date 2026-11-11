
// @ts-check

/**
 * LoginPage class handles all login page actions
 */
class LoginPage {
  /**
   * Constructor
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Open the Sauce Demo login page
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Login using username and password
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Get error message if displayed
   * @returns {Promise<string | null>}
   */
  async getErrorMessage() {
    if (await this.errorMessage.isVisible()) {
      return (await this.errorMessage.textContent())?.trim() ?? '';
    }

    return null;
  }
}

// Export LoginPage class
module.exports = { LoginPage };
