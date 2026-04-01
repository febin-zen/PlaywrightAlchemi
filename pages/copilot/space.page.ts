import { Page, Locator, expect } from "@playwright/test";

export class SpacePage {
  constructor(private page: Page) {}

  // ===============================
  // 🔹 ACTIONS
  // ===============================

  // creations.
 

  async openCreateSpaceModal() {
    await this.page.getByRole("button", { name: "Create Space" }).click();
  }

  async fillSpaceDetails(name: string, description: string) {
    await this.page.getByRole("textbox", { name: "Space Name *" }).fill(name);
    await this.page.getByRole("textbox", { name: "Description" }).fill(description);
  }

  async submit() {
    await this.page.getByRole("button", { name: "Create Space" }).click();
  }

  // ===============================
  // 🔹 LOCATORS (for assertions)
  // ===============================
  modal(): Locator {
    return this.page.locator(".fixed.inset-0.z-50");
  }

  header(): Locator {
    return this.page.getByLabel("Create a new space").locator("h2");
  }

  subText(): Locator {
    return this.page.getByLabel("Create a new space");
  }

  welcomeTitle(): Locator {
    return this.page.getByLabel("Create a new space").locator("h3");
  }

  form(): Locator {
    return this.page.locator("form");
  }

  // deletion function

  async openDeleteMenu() {
    await this.page
      .locator(".flex.justify-end > button:nth-child(2)")
      .first()
      .click();
  }

  async clickDeleteOption() {
    await this.page.getByRole("button", { name: "Delete" }).click();
  }

  async confirmPermanentDelete() {
    await this.page.getByRole("button", { name: "Delete Permanently" }).click();
  }

  // ===============================
  // 🔹 LOCATORS
  // ===============================
  deleteButton(): Locator {
    return this.page.locator(".flex.justify-end > button:nth-child(2)").first();
  }

  deleteModal(): Locator {
    return this.page.getByRole("alertdialog", {
      name: "Delete Workspace Permanently",
    });
  }

  modalContent(): Locator {
    return this.page.getByLabel("Delete Workspace Permanently");
  }

  warningList(): Locator {
    return this.page.getByRole("list");
  }

  successMessage(): Locator {
    return this.page.getByRole("listitem");
  }
}


