
// @ts-check

class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locator for the Products title
    this.title = page.getByText('Products', { exact: true });
  }

  /**
   * Check whether the inventory page is loaded
   * @returns {Promise<boolean>}
   */
  async isLoaded() {
    try {
      await this.title.waitFor({
        state: 'visible',
        timeout: 10000
      });

      return true;
    } catch {
      return false;
    }
  }
}

module.exports = { InventoryPage };
