import { Page, Locator, expect } from "@playwright/test";

export class RequestChatPage {
  constructor(private page: Page) {}

  // ===============================
  // 🔹 ADMIN SIDE
  // ===============================
  async navigateToCockpitRequest(requestId: string) {
    await this.page.goto(`/cockpit/requests/${requestId}`);
    await this.page.waitForLoadState("networkidle");
  }

  private messageInput(): Locator {
    return this.page.getByRole("textbox", {
      name: "Type your message... — Press",
    });
  }

  async sendMessage(message: string) {
    await this.messageInput().fill(message);

    await this.page
      .getByRole("button", {
        name: "Send (Ctrl+↵)",
      })
      .click();
  }

  async openMessageMenu(message: string) {
    await this.page
      .locator("div")
      .filter({ hasText: new RegExp(`You.*${message}`, "i") })
      .last()
      .getByRole("button")
      .click();
  }

  async editMessage(newMessage: string, oldMessage: string) {
    await this.page.getByRole("menuitem", { name: "Edit" }).click();

    // const editor = this.page.getByRole("textbox", {
    //   name: oldMessage
    // });
    // const editor = this.page.locator('[contenteditable="true"]');
    // await this.page.getByText('Sending message from Admin').press('ControlOrMeta+a');
    await this.page.getByText(oldMessage).fill(newMessage);
  
  
    // await editor.press('ControlOrMeta+a');
    // await editor.fill(newMessage);
    // Type new message

    await this.page.getByRole("button", { name: /Save/ }).click();
  }

  async deleteMessage() {
    await this.page.getByRole("menuitem", { name: "Delete" }).click();

    await this.page.getByRole("button", { name: "Confirm Delete" }).click();
  }

  async verifyMessageVisible(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async sendInternalNote(message: string) {
    await this.messageInput().fill(message);

    // 🔥 Change to Internal Note
    await this.page.getByRole("combobox").click();

    await this.page
      .getByRole("option", {
        name: "Internal Note",
      })
      .click();

    await this.page
      .getByRole("button", {
        name: "Send (Ctrl+↵)",
      })
      .click();
  }

  // 🔥 STRICT MODE SAFE MESSAGE LOCATOR
  messageBubble(text: string): Locator {
    return this.page
      .locator("p") // only paragraph messages
      .filter({ hasText: text })
      .first();
  }

  async refreshAdminRequest() {
    await this.page.reload();
  }

  // ===============================
  // 🔹 USER SIDE
  // ===============================
  async openSupportTickets() {
    await this.page
      .getByRole("button", {
        name: "Support Tickets",
      })
      .click();
  }

  async openRequest(title: string) {
    await this.page.getByRole("heading", { name: title }).click();
    // await this.page.waitForLoadState('networkidle');
  }

  async replyToLatestMessage(replyText: string) {
    // Open reply menu (assumes last message has reply option)
    await this.page
      .locator("div")
      .filter({ hasText: replyText })
      .locator("button")
      .first()
      .click({ force: true });

    await this.page.getByRole("menuitem", { name: "Reply" }).click();

    await this.page
      .getByRole("textbox", {
        name: "Write your reply...",
      })
      .fill(replyText);

    await this.page
      .getByRole("button", {
        name: "Send Reply (Ctrl+↵)",
      })
      .click();
  }
  // counting the msg for internal note and user message

  messageCount(text: string) {
    return this.page.locator("p").filter({ hasText: text });
  }

  async searchRequest(subject: string) {
    await this.page.getByRole("textbox", { name: "Search tickets..." }).click();
    await this.page
      .getByRole("textbox", { name: "Search tickets..." })
      .fill(subject);
  }

  async searchTicket(title: string) {
    const search = this.page.getByRole("textbox", {
      name: "Search tickets...",
    });

    await search.fill(title);
  }

  async openTicket(title: string) {
    await this.page.getByText(title).first().click();
  }

  async refreshUserTicket(title: string) {
    await this.page.reload();

    await this.openSupportTickets();

    await this.searchTicket(title);

    await this.openTicket(title);
  }
}
