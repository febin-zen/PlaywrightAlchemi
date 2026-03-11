import { expect, Locator, Page } from "@playwright/test";

export class AccessPoliciesPage {
  private readonly cockpitBtn: Locator;
  private readonly accessPoliciesLink: Locator;
  private readonly editEntityItemsDialog: Locator;
  private readonly accountAgentPopupTableRows: Locator;
  private readonly accesspoliciesSyncFromCatalogBtn: Locator;
  private readonly editEntityItemsDialogCloseBtn: Locator;

  //    await page.getByRole('button', { name: 'Close' }).click();
  //   await page.getByRole('button', { name: 'Sync from Catalog' }).click();
  constructor(private readonly page: Page) {
    this.cockpitBtn = this.page.getByRole("button", { name: "Cockpit" });
    this.accessPoliciesLink = this.page.getByRole("link", {
      name: "Access Policies",
    });
    this.editEntityItemsDialog = this.page.getByRole("dialog", {
      name: "Edit Entity Items",
    });
    this.accountAgentPopupTableRows =
      this.editEntityItemsDialog.locator("tbody tr");
    this.accesspoliciesSyncFromCatalogBtn = page.getByRole("button", {
      name: "Sync from Catalog",
    });
    this.editEntityItemsDialogCloseBtn = this.page.getByRole("button", {
      name: "Close",
    });
  }

  async navigateToAccessPolicies(): Promise<void> {
    await this.cockpitBtn.click();
    await this.accessPoliciesLink.click();
    await expect(
      this.page.getByRole("heading", { name: "Access Policies" }),
    ).toBeVisible();
  }

  private accountAgentCatalogRow(): Locator {
    return this.page
      .locator("tr")
      .filter({
        has: this.page.locator("span.text-orange-700", { hasText: "Agents" }),
      })
      .filter({
        has: this.page.locator("span", { hasText: "ACCOUNT_CATALOG" }),
      });
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  private accountAgentPopupRowsByName(agentName: string): Locator {
    const exactName = new RegExp(`^\\s*${this.escapeRegExp(agentName)}\\s*$`);
    return this.accountAgentPopupTableRows.filter({
      has: this.page.locator("td:nth-child(1)", { hasText: exactName }),
    });
  }

  async clickSecondTdSvgForAccountAgentCatalog(): Promise<void> {
    const row = this.accountAgentCatalogRow().first();
    await expect(row).toBeVisible();

    const secondTdSvg = row.locator("td").nth(1).locator("svg").first();
    await expect(secondTdSvg).toBeVisible();
    await secondTdSvg.click();
    await expect(this.editEntityItemsDialog).toBeVisible();
  }

  async expectAccountAgentPresentInPopupTable(
    agentName: string,
  ): Promise<void> {
    const matchedRows = this.accountAgentPopupRowsByName(agentName);
    await expect(
      matchedRows.first(),
      `Expected agent \"${agentName}\" to be present in popup table`,
    ).toBeVisible();
  }

  async expectAccountAgentNotPresentInPopupTable(
    agentName: string,
  ): Promise<void> {
    const matchedRows = this.accountAgentPopupRowsByName(agentName);
    await expect(
      matchedRows,
      `Expected agent \"${agentName}\" to be absent from popup table`,
    ).toHaveCount(0);
  }
  async clickSyncFromCatalog(): Promise<void> {
    await this.accesspoliciesSyncFromCatalogBtn.click();
  }
  async closeEditEntityItemsDialog(): Promise<void> {
    await this.editEntityItemsDialogCloseBtn.click();
  }

  async reloadPage(): Promise<void> {
    await this.page.reload();
    await this.page.waitForLoadState("networkidle");
    await this.page.locator("tbody tr").first().waitFor();
  }
}
