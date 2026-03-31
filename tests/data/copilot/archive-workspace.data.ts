export const ARCHIVE_WORKSPACE_DATA = {
 space: "Spaces",
 menuName: "Archived Workspaces",
  workspaceName: "Automation",

  expectedTexts: {
    archiveDialog: "Automation",
    archiveSuccess: "workspace archived successfully",
    restoreDialog: "Restore Workspace",
    restoreConfirm: (name: string) =>
      `Are you sure you want to restore "${name}"?`,
    restoreSuccess: "Workspace restored successfully",
  },
};