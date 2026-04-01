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

  
   async accountLevelAccess(access: string, index: number ) {
    await this.page.getByRole('button', { name: access }).nth(index).click();
  }

  async openAgentsSection() {
    await this.page
      .getByRole("cell", { name: "COPILOT.MARKETPLACE.AGENTS" })
      .click();
  }

  async expandAgentsRow(sectionName: string) {
    await this.page
      .getByRole("row", { name: sectionName })
      .getByRole("button")
      .click();
  }

  agentRow(agentName: string): Locator {
    return this.page.getByRole("row", {
      name: new RegExp(agentName, "i"),
    });
  }

  async selectAgent(agentName: string) {
    await this.agentRow(agentName).getByRole("cell").nth(1).click();
  }

  async restrict(agentName: string) {
    await this.agentRow(agentName).getByRole("button").nth(1).click();
  }

  async allow(agentName: string) {
    await this.agentRow(agentName).getByRole('button').first().click();
  }

  

  async closeModal() {
    await this.page.getByRole("button", { name: "Close", exact: true }).click();
  }

  // ===============================
  // 👤 USER ACTIONS
  // ===============================
  

  noItemsMessage(): Locator {
    return this.page.locator("div").filter({
      hasText: /^No items available$/,
    });
  }

   async openMarketplace() {
    await this.page.getByRole("button", { name: "Marketplace", exact: true }).click();
  }

  async searchAgent(agentName: string) {
    const searchBox = this.page.getByRole("textbox", {
      name: "Search marketplace...",
    });

    await searchBox.click();
    await searchBox.fill(agentName);
  }

  noResultsText(): Locator {
    return this.page.getByText("No items match your filtersClear filters");
  }

  emptyState(): Locator {
    return this.page.locator("#welcome-tour");
  }
}