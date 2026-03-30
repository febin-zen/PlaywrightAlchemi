import { expect, Locator, Page } from "@playwright/test";

export class CatalogPage {
  private readonly cockpitBtn: Locator;
  private readonly catalogLink: Locator;
  private readonly catalogRows: Locator;
  private readonly catalogTableRows: Locator;
  private readonly SyncFromAgentsBtn: Locator;
  private readonly saveChangeBtn: Locator;

  // await page.getByRole('button', { name: 'Save Changes' }).click();

  constructor(private readonly page: Page) {
    this.cockpitBtn = this.page.getByRole("button", { name: "Cockpit" });
    this.catalogLink = this.page.getByRole("link", { name: "Catalog" });
    this.catalogRows = this.page.locator(
      "div.flex.items-center.p-2.bg-gradient-to-r",
    );
    this.catalogTableRows = this.page.locator("tbody tr");
    this.SyncFromAgentsBtn = this.page.getByRole("button", {
      name: "Sync from Agents",
    });
    this.saveChangeBtn = this.page.getByRole("button", {
      name: "Save Changes",
    });
  }

  async navigateToCatalog(): Promise<void> {
    await this.cockpitBtn.click();
    await this.catalogLink.click();
    await expect(this.catalogRows.first()).toBeVisible();
  }
  async reloadPage(): Promise<void> {
    await this.page.reload();
    await this.page.waitForLoadState("networkidle");
  }

  private rowsContaining(text: string): Locator {
    return this.catalogRows.filter({ hasText: text });
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  private agentRowsByName(agentName: string): Locator {
    const exactName = new RegExp(`^\\s*${this.escapeRegExp(agentName)}\\s*$`);
    return this.catalogTableRows.filter({
      has: this.page.locator("td:nth-child(2)", { hasText: exactName }),
    });
  }

  async clickRowButtonByText(text: string): Promise<void> {
    const filteredRows = this.rowsContaining(text);
    await expect(filteredRows.first()).toBeVisible();
    await filteredRows.first().getByRole("button").click();
  }

  async expectAgentPresentInTable(agentName: string): Promise<void> {
    const matchedRows = this.agentRowsByName(agentName);
    await expect(
      matchedRows.first(),
      `Expected agent \"${agentName}\" to be present in table`,
    ).toBeVisible();
  }

  async expectAgentNotPresentInTable(agentName: string): Promise<void> {
    const matchedRows = this.agentRowsByName(agentName);
    await expect(
      matchedRows,
      `Expected agent \"${agentName}\" to be absent from table`,
    ).toHaveCount(0);
  }
  async unCheckAgent(agentName: string): Promise<void> {
    const matchedRows = this.agentRowsByName(agentName);
    await matchedRows.first().getByRole("checkbox").click();
    await expect(matchedRows.first()).toBeVisible();
  }
  async clickSyncFromAgents(): Promise<void> {
    await this.SyncFromAgentsBtn.click();
    await this.page.waitForLoadState("networkidle");
  }
  async clickSaveChanges(): Promise<void> {
    await this.saveChangeBtn.click();
  }
}
