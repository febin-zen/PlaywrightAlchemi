


export const CREATE_SPACE_DATA = {
  spaceName: "Create and Delete Workspace",
  description: "Create and Delete Workspace Workspace",

  expectedTexts: {
    header: "Create a new space",
    subText:
      "Give your idea a home. Set up a workspace where AI agents collaborate with you.",
    welcome: "Welcome to AlchemiStudio!",
    successMessage: "Workspace Create and Delete Workspace created successfully!",
  },
};

export const DELETE_WORKSPACE_DATA = {
  workspaceName: "Create and Delete Workspace",

  expectedTexts: {
    modalTitle: "Delete Workspace Permanently",
    confirmationText: (name: string) =>
      `Are you sure you want to permanently delete ${name}?  This will make the workspace active again and accessible to all members.`,
    warning1: "This action cannot be undone.",
    warning2: "All data in this workspace will be lost forever.",
    suggestion:
      "Consider archiving instead if you may need this workspace later.",
    successMessage: 'Workspace deleted permanently',
  },
};