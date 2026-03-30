import { test, expect } from "../../fixtures/roles.fixture";
import { MarketplacePage } from "../../../pages/Cockpit/access-policy/marketplace.page"
import { MARKETPLACE_DATA } from "../../data/access.policy.testcases";
import { CockpitPage } from "../../../pages/Cockpit/cockpit.page";

test("Admin restricts marketplace → User cannot see items", 
async ({ adminPage, userPage }) => {

  const adminMarketplace = new MarketplacePage(adminPage);
  const userMarketplace = new MarketplacePage(userPage);
  const cockpitPage = new CockpitPage(adminPage);

  // ==========================================
  // 🔐 ADMIN RESTRICTS MARKETPLACE
  // ==========================================
  await cockpitPage.navigateToCockpitMenu("Access Policies"); // adjust if needed

  await adminMarketplace.openMarketplacePolicy();
  await adminMarketplace.restrictMarketplace(
    MARKETPLACE_DATA.restrictButtonIndex
  );

  // await cockpitPage.navigateToHome();

  // ==========================================
  // 👤 USER VALIDATION
  // ==========================================
  await userMarketplace.openMarketplace();

  await expect(userMarketplace.noItemsMessage()).toBeVisible();
});

test("Admin allow marketplace → User can see all the allowed items", 
async ({ adminPage, userPage }) => {

  const adminMarketplace = new MarketplacePage(adminPage);
  const userMarketplace = new MarketplacePage(userPage);
  const cockpitPage = new CockpitPage(adminPage);

  // ==========================================
  // 🔐 ADMIN RESTRICTS MARKETPLACE
  // ==========================================
  await cockpitPage.navigateToCockpitMenu("Access Policies"); // adjust if needed

  await adminMarketplace.openMarketplacePolicy();
  await adminMarketplace.allowMarketplace(
    MARKETPLACE_DATA.allowButtonIndex
  );

  // await cockpitPage.navigateToHome();

  // ==========================================
  // 👤 USER VALIDATION
  // ==========================================
  await userMarketplace.openMarketplace();
  
  await expect(userMarketplace.noItemsMessage()).toBeVisible();
});