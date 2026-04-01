import { Page, Locator } from "@playwright/test";


// create and restore
export class ArchiveWorkspacePage {
  constructor(private page: Page) {}

  // ===============================
  // 🗑️ ARCHIVE ACTIONS
  // ===============================
  async openWorkspaceMenu() {
    await this.page
      .locator(".flex.justify-end > button:nth-child(2)")
      .first()
      .click();
  }

  async clickArchiveOption() {
    await this.page.getByRole("button", { name: "Archive", exact: true }).click();
  }

  async confirmArchive() {
    await this.page.getByRole("button", { name: "Archive Workspace" }).click();
  }

  // ===============================
  // ♻️ RESTORE ACTIONS
  // ===============================
  async openArchivedWorkspaces() {
    await this.page.getByRole("button", { name: "Archived Workspaces" }).click();
  }

  async clickRestore() {
    await this.page.getByRole("button", { name: "Restore" }).click();
  }

  async confirmRestore() {
    await this.page.getByRole("button", { name: "Restore Workspace" }).click();
  }

  

  // ===============================
  // 🔹 LOCATORS
  // ===============================
  archiveDialog(): Locator {
    return this.page.getByRole("dialog");
  }

  restoreDialog(): Locator {
    return this.page.getByRole("alertdialog", {
      name: "Restore Workspace",
    });
  }

  successToast(): Locator {
    return this.page.getByRole("listitem");
  }

  async searchArchiveWorkspaceItem(workspaceName: string){
     await this.page.getByRole('textbox', { name: 'Search archived workspaces...' }).click();
     await this.page.getByRole('textbox', { name: 'Search archived workspaces...' }).fill(workspaceName);
  }
  archivedWorkspaceItem(workspaceName: string): Locator {
    return this.page.getByText(new RegExp(workspaceName, "i"));
  }
}