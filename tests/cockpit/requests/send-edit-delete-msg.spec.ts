import { test, expect } from "../../fixtures/roles.fixture";
import { RequestChatPage } from "../../../pages/Cockpit/request/request-chat.page";
import { SEND_EDIT_MSG } from "../../data/request.testdata"

test.describe("Request Messaging - Admin & User", () => {

  test("TC01 - Admin sends message and user verifies after refresh", async ({ adminPage, userPage }) => {

    const admin = new RequestChatPage(adminPage);
    const user = new RequestChatPage(userPage);
    const data = SEND_EDIT_MSG;

    // ADMIN SEND MESSAGE
    await admin.navigateToCockpitRequest(data.requestId);
    
    await admin.openRequest(data.requestTitle);

    await admin.sendMessage(data.adminMessages.send);

    // USER REFRESH FLOW
    await user.refreshUserTicket(data.requestTitle);

    await user.verifyMessageVisible(data.adminMessages.send);

  });


  test("TC02 - User sends message and admin verifies after refresh", async ({ adminPage, userPage }) => {

    const admin = new RequestChatPage(adminPage);
    const user = new RequestChatPage(userPage);
    const data = SEND_EDIT_MSG;

    // USER SEND MESSAGE
    await user.openSupportTickets();
    await user.searchTicket(data.requestTitle);
    await user.openTicket(data.requestTitle);

    await user.sendMessage(data.userMessages.send);

    // ADMIN REFRESH
     await admin.navigateToCockpitRequest(data.requestId);
    await admin.openRequest(data.requestTitle);
    await admin.refreshAdminRequest();
    await admin.verifyMessageVisible(data.userMessages.send);

  });


  test("TC03 - Admin edits message and user verifies", async ({ adminPage, userPage }) => {

    const admin = new RequestChatPage(adminPage);
    const user = new RequestChatPage(userPage);
    const data = SEND_EDIT_MSG;

    // ADMIN EDIT MESSAGE
    await admin.navigateToCockpitRequest(data.requestId);
    await admin.openRequest(data.requestTitle);

    await admin.openMessageMenu(data.adminMessages.send);
    await admin.editMessage(data.adminMessages.edit, data.adminMessages.send);

    // USER REFRESH
    
    await user.openSupportTickets();
    await user.searchTicket(data.requestTitle);
    await user.openTicket(data.requestTitle);

    await user.verifyMessageVisible(data.adminMessages.edit);

  });


  test("TC04 - User edits message and admin verifies", async ({ adminPage, userPage }) => {

    const admin = new RequestChatPage(adminPage);
    const user = new RequestChatPage(userPage);
    const data = SEND_EDIT_MSG;

    // USER EDIT MESSAGE
    await user.openSupportTickets();
    await user.searchTicket(data.requestTitle);
    await user.openTicket(data.requestTitle);

    await user.openMessageMenu(data.userMessages.send);
    await user.editMessage(data.userMessages.edit, data.userMessages.send);

    // ADMIN REFRESH
    await admin.refreshAdminRequest();
     await admin.navigateToCockpitRequest(data.requestId);
    await admin.openRequest(data.requestTitle);

    await admin.verifyMessageVisible(data.userMessages.edit);

  });


  test("TC05 - Admin deletes message and user verifies deletion", async ({ adminPage, userPage }) => {

    const admin = new RequestChatPage(adminPage);
    const user = new RequestChatPage(userPage);
    const data = SEND_EDIT_MSG;

    // ADMIN DELETE MESSAGE
    await admin.navigateToCockpitRequest(data.requestId);
    await admin.openRequest(data.requestTitle);

    await admin.openMessageMenu(data.adminMessages.edit);
    await admin.deleteMessage();

    // USER REFRESH
    await user.refreshUserTicket(data.requestTitle);

    await expect(userPage.getByText(data.adminMessages.edit)).toBeHidden();

  });

});