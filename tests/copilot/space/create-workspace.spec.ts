import { test, expect } from "../../fixtures/roles.fixture";
import {CopilotPage} from "../../../pages/copilot/copilot.page"
import { SpacePage } from "../../../pages/copilot/space.page";
import { CREATE_SPACE_DATA, DELETE_WORKSPACE_DATA} from "../../data/copilot/space.data";
import { describe } from "node:test";


// verify create workspace

test("verify creates a new space successfully", async ({ adminPage }) => {
  const createSpace = new SpacePage(adminPage);
  const copilot = new CopilotPage(adminPage);    // test(1,2)
  // ==========================================
  // 🚀 OPEN MODAL
  // ==========================================

  await copilot.navigateToHomeMenu("Spaces");

  await createSpace.openCreateSpaceModal();

  await expect(createSpace.modal()).toBeVisible();
  await expect(createSpace.header()).toContainText(
    CREATE_SPACE_DATA.expectedTexts.header
  );
  await expect(createSpace.subText()).toContainText(
    CREATE_SPACE_DATA.expectedTexts.subText
  );
  await expect(createSpace.welcomeTitle()).toContainText(
    CREATE_SPACE_DATA.expectedTexts.welcome
  );

  await expect(createSpace.form()).toContainText("Space Name *");
  await expect(createSpace.form()).toContainText("Description");

  // ==========================================
  // ✍️ FILL FORM
  // ==========================================
  await createSpace.fillSpaceDetails(
    CREATE_SPACE_DATA.spaceName,
    CREATE_SPACE_DATA.description
  );

  // ==========================================
  // ✅ SUBMIT
  // ==========================================
  await createSpace.submit();

  // ==========================================
  // 🎯 VALIDATION
  // ==========================================

  await expect(createSpace.successMessage()).toBeVisible();
  await expect(createSpace.successMessage()).toContainText(
    CREATE_SPACE_DATA.expectedTexts.successMessage
  );
});

// verify delete workspace

test("User deletes workspace permanently", async ({ adminPage }) => {
  const space = new SpacePage(adminPage);

   const copilot = new CopilotPage(adminPage);    // test(1,2)
  // ==========================================
  // 🚀 OPEN MODAL
  // ==========================================

  await copilot.navigateToHomeMenu("Spaces");

  

  // ==========================================
  // 🗑️ OPEN DELETE OPTION
  // ==========================================
  await expect(space.deleteButton()).toBeVisible();
  await space.openDeleteMenu();

  await expect(
    adminPage.getByRole("button", { name: "Delete" })
  ).toBeVisible();

  await space.clickDeleteOption();

  // ==========================================
  // ⚠️ VALIDATE DELETE MODAL
  // ==========================================
  await expect(space.deleteModal()).toBeVisible();

  await expect(adminPage.getByRole("heading")).toContainText(
    DELETE_WORKSPACE_DATA.expectedTexts.modalTitle
  );

  await expect(space.modalContent()).toContainText(
    DELETE_WORKSPACE_DATA.expectedTexts.confirmationText(
      DELETE_WORKSPACE_DATA.workspaceName
    )
  );

  await expect(space.warningList()).toContainText(
    DELETE_WORKSPACE_DATA.expectedTexts.warning1
  );

  await expect(space.warningList()).toContainText(
    DELETE_WORKSPACE_DATA.expectedTexts.warning2
  );

  await expect(space.modalContent()).toContainText(
    DELETE_WORKSPACE_DATA.expectedTexts.suggestion
  );

  await expect(
    adminPage.getByRole("button", { name: "Cancel" })
  ).toBeVisible();

  await expect(
    adminPage.getByRole("button", { name: "Delete Permanently" })
  ).toBeVisible();

  // ==========================================
  // ✅ CONFIRM DELETE
  // ==========================================
  await space.confirmPermanentDelete();

  // ==========================================
  // 🎯 VALIDATION
  // ==========================================
  await expect(space.successMessage()).toBeVisible();
  await expect(space.successMessage()).toContainText(
    DELETE_WORKSPACE_DATA.expectedTexts.successMessage
  );
  
});

