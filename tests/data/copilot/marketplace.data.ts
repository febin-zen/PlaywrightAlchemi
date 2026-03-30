


export const CREATE_SPACE_DATA = {
  spaceName: "Automation",
  description: "automation Workspace",

  expectedTexts: {
    header: "Create a new space",
    subText:
      "Give your idea a home. Set up a workspace where AI agents collaborate with you.",
    welcome: "Welcome to AlchemiStudio!",
    successMessage: "Workspace Automation created successfully!",
  },
};

export const DELETE_WORKSPACE_DATA = {
  workspaceName: "Automation",

  expectedTexts: {
    modalTitle: "Delete Workspace Permanently",
    confirmationText: (name: string) =>
      `Are you sure you want to permanently delete ${name}?`,
    warning1: "This action cannot be undone.",
    warning2: "All data in this workspace will be lost forever.",
    suggestion:
      "Consider archiving instead if you may need this workspace later.",
    successMessage: "Workspace deleted permanently",
  },
};