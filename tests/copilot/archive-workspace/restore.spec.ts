import { test, expect } from "../../fixtures/roles.fixture";
import { ArchiveWorkspacePage } from "../../../pages/copilot/archive-worskspace.page";
import { ARCHIVE_WORKSPACE_DATA } from "../../data/copilot/archive-workspace.data";

test("User restores an archived workspace successfully", async ({ adminPage }) => {
  const archivePage = new ArchiveWorkspacePage(adminPage);

  // ==========================================
  // 📂 OPEN ARCHIVED WORKSPACES
  // ==========================================
  await archivePage.openArchivedWorkspaces();

  await expect(
    adminPage.getByRole("heading", { name: ARCHIVE_WORKSPACE_DATA.workspaceName })
  ).toBeVisible();

 

  // ==========================================
  // ♻️ RESTORE WORKSPACE
  // ==========================================
  await archivePage.clickRestore();

  await expect(archivePage.restoreDialog()).toBeVisible();

  await expect(adminPage.getByRole('paragraph')).toContainText(`Are you sure you want to restore "${ARCHIVE_WORKSPACE_DATA.workspaceName} "? This will make the workspace active again and accessible to all members.`);

  await archivePage.confirmRestore();

  // ==========================================
  // 🎯 VALIDATION
  // ==========================================
  await expect(archivePage.successToast()).toBeVisible();
  await expect(archivePage.successToast()).toContainText(
    ARCHIVE_WORKSPACE_DATA.expectedTexts.restoreSuccess
  );
});