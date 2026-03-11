import { test } from "../../fixtures/roles.fixture";
import { CatalogPage } from "../../../pages/Cockpit/nexus/catalog";
import { AccessPoliciesPage } from "../../../pages/Cockpit/nexus/accesspolicies";

test.describe("Nexus Catalog Dummy Automation", () => {
  // test("Filter catalog rows by Agent and click row button", async ({
  //   adminPage,
  // }) => {
  //   const catalog = new CatalogPage(adminPage);
  //   await adminPage.goto("/spaces");
  //   await catalog.navigateToCatalog();
  //   await catalog.clickRowButtonByText("Agent");
  //   await catalog.expectAgentNotPresentInTable("");
  // });
  // test("Locate Agents ACCOUNT_CATALOG row and click second td svg", async ({
  //   adminPage,
  // }) => {
  //   const accessPolicies = new AccessPoliciesPage(adminPage);
  //   await adminPage.goto("/spaces");
  //   await accessPolicies.navigateToAccessPolicies();
  //   await accessPolicies.clickSecondTdSvgForAccountAgentCatalog();
  //   await accessPolicies.expectAccountAgentPresentInPopupTable("Alchemist");
  //   await accessPolicies.expectAccountAgentNotPresentInPopupTable(
  //     "__NOT_PRESENT_AGENT__",
  //   );
  // });
});
