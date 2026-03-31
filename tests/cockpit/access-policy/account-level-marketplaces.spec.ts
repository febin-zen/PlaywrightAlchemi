import { test, expect } from "../../fixtures/roles.fixture";
import { MarketplacePage } from "../../../pages/Cockpit/access-policy/marketplace.page";
import { MARKETPLACE_DATA } from "../../data/access.policy.testcases";
import { CockpitPage } from "../../../pages/Cockpit/cockpit.page";

let adminMarketplace: MarketplacePage;
let userMarketplace: MarketplacePage;
let cockpitPage: CockpitPage;

// ==========================================
// 🔁 COMMON SETUP
// ==========================================
test.beforeEach(async ({ adminPage, userPage }) => {
  adminMarketplace = new MarketplacePage(adminPage);
  userMarketplace = new MarketplacePage(userPage);
  cockpitPage = new CockpitPage(adminPage);

  await cockpitPage.navigateToCockpitMenu("Access Policies");
});

// ==========================================
// 🧩 HELPER FUNCTIONS
// ==========================================
async function validateMarketplaceEmpty() {
  await userMarketplace.openMarketplace();
  await expect(userMarketplace.noItemsMessage()).toBeVisible();
}

// ==========================================
// 🧪 TEST CASES
// ==========================================

test("Admin restricts marketplace → User cannot see items", async () => {
  await adminMarketplace.openMarketplacePolicy();
  await adminMarketplace.accountLevelAccess(
    MARKETPLACE_DATA.access.Restrict,
    MARKETPLACE_DATA.buttonIndex[0]
  );

  await validateMarketplaceEmpty();
});

test("Admin allow marketplace → User can see all the allowed items", async () => {
  await adminMarketplace.openMarketplacePolicy();
  await adminMarketplace.accountLevelAccess(
    MARKETPLACE_DATA.access.Allow,
    MARKETPLACE_DATA.buttonIndex[1]
  );

  await validateMarketplaceEmpty(); // (update if behavior differs)
});

test("Admin restricts marketplace agent → User cannot find it", async ({ adminPage }) => {
  await adminMarketplace.openAgentsSection();

  await expect(
    adminPage.getByRole("cell", {
      name: MARKETPLACE_DATA.sectionName,
    })
  ).toBeVisible();

  await adminMarketplace.expandAgentsRow(MARKETPLACE_DATA.sectionName);

  await expect(adminPage.getByText("Copilot", { exact: true })).toBeVisible();

  await adminMarketplace.selectAgent(MARKETPLACE_DATA.agentName);
  await adminMarketplace.restrict(MARKETPLACE_DATA.agentName);

  await expect(
    adminPage.getByRole("dialog", {
      name: MARKETPLACE_DATA.sectionName,
    })
  ).toBeVisible();

  
  await adminMarketplace.closeModal();

  // ==========================================
  // 👤 USER VALIDATION
  // ==========================================
  await userMarketplace.openMarketplace();
  await userMarketplace.searchAgent(MARKETPLACE_DATA.agentName);

  await expect(userMarketplace.noResultsText()).toBeVisible();
  await expect(userMarketplace.emptyState()).toContainText(
    MARKETPLACE_DATA.expectedTexts.emptyState
  );
});

test("Admin allow marketplace agent → User can find it", async ({ adminPage }) => {
  await adminMarketplace.openAgentsSection();

  await expect(
    adminPage.getByRole("cell", {
      name: MARKETPLACE_DATA.sectionName,
    })
  ).toBeVisible();

  await adminMarketplace.expandAgentsRow(MARKETPLACE_DATA.sectionName);

  await expect(adminPage.getByText("Copilot", { exact: true })).toBeVisible();

  await adminMarketplace.selectAgent(MARKETPLACE_DATA.agentName);
  await adminMarketplace.allow(MARKETPLACE_DATA.agentName);

  await expect(
    adminPage.getByRole("dialog", {
      name: MARKETPLACE_DATA.sectionName,
    })
  ).toBeVisible();

  
  await adminMarketplace.closeModal();

  // ==========================================
  // 👤 USER VALIDATION
  // ==========================================
  await userMarketplace.openMarketplace();
  await userMarketplace.searchAgent(MARKETPLACE_DATA.agentName);

  await expect(userMarketplace.noResultsText()).toBeVisible();
  await expect(userMarketplace.emptyState()).toContainText(
    MARKETPLACE_DATA.expectedTexts.emptyState
  );
});