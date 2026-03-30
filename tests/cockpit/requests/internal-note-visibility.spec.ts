import { test, expect } from "../../fixtures/roles.fixture";
import { RequestChatPage } from "../../../pages/Cockpit/request/request-chat.page";
import { INTERNAL_NOTE_DATA } from "../../data/request.testdata";

test("Admin internal note should NOT be visible to user", async ({
  adminPage,
  userPage,
}) => {
 
  const adminChat = new RequestChatPage(adminPage);
  const userChat = new RequestChatPage(userPage);
  // 🔐 ADMIN SENDS INTERNAL NOTE
  await adminChat.navigateToCockpitRequest(INTERNAL_NOTE_DATA.requestId);

  await adminChat.sendInternalNote(INTERNAL_NOTE_DATA.adminMessages.internal);

  // 👤 USER VALIDATION
  await userPage.reload();
  await userPage.waitForLoadState("networkidle");

  await userChat.openSupportTickets();
  await userChat.searchRequest(INTERNAL_NOTE_DATA.requestTitle);
  await userChat.openRequest(INTERNAL_NOTE_DATA.requestTitle);

  await expect(
    userChat.messageBubble(INTERNAL_NOTE_DATA.adminMessages.internal),
  ).toHaveCount(0);
});

test("Admin internal note should NOT be visible to user after editing the note", async ({
  adminPage,
  userPage,
}) => {
 
  const adminChat = new RequestChatPage(adminPage);
  const userChat = new RequestChatPage(userPage);
  // 🔐 ADMIN SENDS INTERNAL NOTE
  await adminChat.navigateToCockpitRequest(INTERNAL_NOTE_DATA.requestId);

  const message = INTERNAL_NOTE_DATA.adminMessages
  await adminChat.openMessageMenu(message.internal);
  await adminChat.editMessage(message.editedinternal, message.internal);

  await adminChat.sendInternalNote(message.internal);

  // 👤 USER VALIDATION
  await userPage.reload();
  await userPage.waitForLoadState("networkidle");

  await userChat.openSupportTickets();
  await userChat.searchRequest(INTERNAL_NOTE_DATA.requestTitle);
  await userChat.openRequest(INTERNAL_NOTE_DATA.requestTitle);

  await expect(
    userChat.messageBubble(message.internal),
  ).toHaveCount(0);
});

