import { Page, Locator } from "@playwright/test";

export class MarketplacePage {
  constructor(private page: Page) {}

  // ===============================
  // 🔐 ADMIN ACTIONS
  // ===============================
  async openMarketplacePolicy() {
    await this.page
      .getByRole("cell", { name: "COPILOT.MARKETPLACE MARKETPLACE" })
      .click();
  }

  async restrictMarketplace(index: number = 3) {
    await this.page.getByRole("button", { name: "Restrict" }).nth(index).click();
  }

  async allowMarketplace(index: number = 4) {
    await this.page.getByRole('button', { name: 'Allow' }).nth(index).click();
  }

  // ===============================
  // 👤 USER ACTIONS
  // ===============================
  async openMarketplace() {
    await this.page.getByRole("button", { name: "Marketplace" }).click();
  }

  noItemsMessage(): Locator {
    return this.page.locator("div").filter({
      hasText: /^No items available$/,
    });
  }
}