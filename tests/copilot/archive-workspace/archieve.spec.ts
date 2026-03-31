import { test, expect } from "../../fixtures/roles.fixture";
import { ArchiveWorkspacePage } from "../../../pages/copilot/archive-worskspace.page";
import { ARCHIVE_WORKSPACE_DATA } from "../../data/copilot/archive-workspace.data";
import { CopilotPage } from "../../../pages/copilot/copilot.page";

test("User archives a workspace successfully", async ({ adminPage }) => {
  const archivePage = new ArchiveWorkspacePage(adminPage);
  const copilot = new CopilotPage(adminPage);

  await copilot.navigateToHomeMenu(ARCHIVE_WORKSPACE_DATA.space)


  // ==========================================
  // 🗑️ ARCHIVE WORKSPACE
  // ==========================================
  await expect(
    adminPage.getByRole("link", { name: `Open ${ARCHIVE_WORKSPACE_DATA.workspaceName}` })
  ).toBeVisible();

  await archivePage.openWorkspaceMenu();
  await archivePage.clickArchiveOption();

  await expect(archivePage.archiveDialog()).toContainText(
    ARCHIVE_WORKSPACE_DATA.expectedTexts.archiveDialog
  );

  await expect(
    adminPage.getByRole("button", { name: "Archive Workspace" })
  ).toBeVisible();

  await archivePage.confirmArchive();
  await copilot.navigateToHomeMenu(ARCHIVE_WORKSPACE_DATA.menuName);

  // ==========================================
  // 🎯 VALIDATION
  // ==========================================
  await expect(archivePage.successToast()).toBeVisible();
  await expect(archivePage.successToast()).toContainText(
    ARCHIVE_WORKSPACE_DATA.expectedTexts.archiveSuccess
  );

  // ==========================================
  // 📂 VERIFY IN ARCHIVED LIST
  // ==========================================
  await archivePage.openArchivedWorkspaces();
  await archivePage.searchArchiveWorkspaceItem(ARCHIVE_WORKSPACE_DATA.workspaceName);

 
await expect(adminPage.getByRole('heading', { name: 'Automation' })).toBeVisible();
  

});