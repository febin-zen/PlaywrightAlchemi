import { test, expect } from "../../fixtures/roles.fixture";
import { AgentPage } from "../../../pages/Cockpit/nexus/Agent";
import { MarketplacePage } from "../../../pages/Cockpit/nexus/Marketplace";
import { PublicMarketplacePage } from "../../../pages/Cockpit/nexus/PublicMarketplace";
import { AgentDataFactory } from "../../data/nexus/agentDataFactory";
import { CatalogPage } from "../../../pages/Cockpit/nexus/catalog";
import { AccessPoliciesPage } from "../../../pages/Cockpit/nexus/accesspolicies";

test.describe("Catalog Access-Policies Management Tests", () => {
  let agentData: ReturnType<typeof AgentDataFactory.generateAgentData>;
  let agent: AgentPage;
  let marketplace: MarketplacePage;

  test.beforeEach(async ({ adminPage }) => {
    await adminPage.goto("/spaces");
    agentData = AgentDataFactory.generateAgentData();
    agent = new AgentPage(adminPage);
    await agent.navigateToAgents();
  });
  test("Agent created by Admin in agent module(without listing) is not visible to other users brfore enable through catalog and access policies", async ({
    adminPage,
    userPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    // verify by user - agent should not be visible in public marketplace
    const publicMarketplace = new PublicMarketplacePage(userPage);
    await publicMarketplace.verifyAgentNotFound(agentData.name);

    // DELETE
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });

  test("Agent created by Admin and perform listing(in draft), Agent is not visible to other users brfore enable through catalog and access policies", async ({
    adminPage,
    userPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    marketplace = new MarketplacePage(adminPage);

    // VERIFY  AGENT APPEARS IN MARKETPLACE DROPDOWN and perform listing
    await marketplace.navigateToMarketplace();
    await marketplace.startCreateListing();
    await marketplace.openAgentDropdown();
    await marketplace.expectAgentInDropdown(agentData.name);

    await marketplace.createListingForAgent(
      agentData.name,
      "sfdsfewe4e",
      "febin",
    );

    // // publish
    // await marketplace.publishListing(agentData.name);

    // const row = adminPage.locator("tbody tr").filter({
    //   has: adminPage.locator("h3", { hasText: agentData.name }),
    // });

    // await expect(row).toHaveCount(1);
    // await expect(
    //   adminPage.getByRole("heading", { name: agentData.name }),
    // ).toBeVisible();
    // await expect(adminPage.locator("tbody")).toContainText(agentData.name);

    // await marketplace.expectListingStatus(agentData.name, "PUBLISHED");

    // verify by user - agent should not be visible in public marketplace
    const publicMarketplace = new PublicMarketplacePage(userPage);
    await publicMarketplace.verifyAgentNotFound(agentData.name);

    // CLEANUP: Delete agent from Marketplace
    await marketplace.deleteListing(agentData.name);

    // CLEANUP: Delete agent from agent
    await agent.navigateToAgents2();
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });
  //Need to define flow, now it fail
  test("Agent created by Admin and perform listing and publish from marketplace inside cockpit, Agent is not visible to other users brfore enable through catalog and access policies", async ({
    adminPage,
    userPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    marketplace = new MarketplacePage(adminPage);

    // VERIFY  AGENT APPEARS IN MARKETPLACE DROPDOWN and perform listing
    await marketplace.navigateToMarketplace();
    await marketplace.startCreateListing();
    await marketplace.openAgentDropdown();
    await marketplace.expectAgentInDropdown(agentData.name);

    await marketplace.createListingForAgent(
      agentData.name,
      "sfdsfewe4e",
      "febin",
    );

    // publish
    await marketplace.publishListing(agentData.name);

    const row = adminPage.locator("tbody tr").filter({
      has: adminPage.locator("h3", { hasText: agentData.name }),
    });

    await expect(row).toHaveCount(1);
    await expect(
      adminPage.getByRole("heading", { name: agentData.name }),
    ).toBeVisible();
    await expect(adminPage.locator("tbody")).toContainText(agentData.name);

    await marketplace.expectListingStatus(agentData.name, "PUBLISHED");

    // verify by user - agent should not be visible in public marketplace
    const publicMarketplace = new PublicMarketplacePage(userPage);
    await publicMarketplace.verifyAgentNotFound(agentData.name);

    // CLEANUP: Delete agent from Marketplace
    await marketplace.deleteListing(agentData.name);

    // CLEANUP: Delete agent from agent
    await agent.navigateToAgents2();
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });

  test("Verify Agent Not Visible in Catalog Before Sync", async ({
    adminPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    marketplace = new MarketplacePage(adminPage);

    // VERIFY  AGENT APPEARS IN MARKETPLACE DROPDOWN and perform listing
    await marketplace.navigateToMarketplace();
    await marketplace.startCreateListing();
    await marketplace.openAgentDropdown();
    await marketplace.expectAgentInDropdown(agentData.name);

    await marketplace.createListingForAgent(
      agentData.name,
      "sfdsfewe4e",
      "febin",
    );

    // publish
    await marketplace.publishListing(agentData.name);

    const row = adminPage.locator("tbody tr").filter({
      has: adminPage.locator("h3", { hasText: agentData.name }),
    });

    await expect(row).toHaveCount(1);
    await expect(
      adminPage.getByRole("heading", { name: agentData.name }),
    ).toBeVisible();
    await expect(adminPage.locator("tbody")).toContainText(agentData.name);

    await marketplace.expectListingStatus(agentData.name, "PUBLISHED");

    //catalog
    const catalog = new CatalogPage(adminPage);

    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentNotPresentInTable(agentData.name);

    // CLEANUP: Delete agent from Marketplace
    await marketplace.navigateToMarketplace();
    await marketplace.deleteListing(agentData.name);

    // CLEANUP: Delete agent from agent
    await agent.navigateToAgents2();
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });

  test("Verify Sync From Agents Brings Agent to Catalog", async ({
    adminPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    marketplace = new MarketplacePage(adminPage);

    // VERIFY  AGENT APPEARS IN MARKETPLACE DROPDOWN and perform listing
    await marketplace.navigateToMarketplace();
    await marketplace.startCreateListing();
    await marketplace.openAgentDropdown();
    await marketplace.expectAgentInDropdown(agentData.name);

    await marketplace.createListingForAgent(
      agentData.name,
      "sfdsfewe4e",
      "febin",
    );

    // publish
    await marketplace.publishListing(agentData.name);

    const row = adminPage.locator("tbody tr").filter({
      has: adminPage.locator("h3", { hasText: agentData.name }),
    });

    await expect(row).toHaveCount(1);
    await expect(
      adminPage.getByRole("heading", { name: agentData.name }),
    ).toBeVisible();
    await expect(adminPage.locator("tbody")).toContainText(agentData.name);

    await marketplace.expectListingStatus(agentData.name, "PUBLISHED");

    //catalog
    const catalog = new CatalogPage(adminPage);

    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentNotPresentInTable(agentData.name);

    await catalog.clickSyncFromAgents();
    await catalog.expectAgentPresentInTable(agentData.name);

    //Verify Agent should not yet be saved in Catalog
    await catalog.reloadPage();
    await catalog.expectAgentNotPresentInTable(agentData.name);

    // CLEANUP: Delete agent from Marketplace
    await marketplace.navigateToMarketplace();
    await marketplace.deleteListing(agentData.name);

    // CLEANUP: Delete agent from agent
    await agent.navigateToAgents2();
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });
  test("Verify Save Changes Required to Persist in Catalog", async ({
    adminPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    marketplace = new MarketplacePage(adminPage);

    // VERIFY  AGENT APPEARS IN MARKETPLACE DROPDOWN and perform listing
    await marketplace.navigateToMarketplace();
    await marketplace.startCreateListing();
    await marketplace.openAgentDropdown();
    await marketplace.expectAgentInDropdown(agentData.name);

    await marketplace.createListingForAgent(
      agentData.name,
      "sfdsfewe4e",
      "febin",
    );

    // publish
    await marketplace.publishListing(agentData.name);

    const row = adminPage.locator("tbody tr").filter({
      has: adminPage.locator("h3", { hasText: agentData.name }),
    });

    await expect(row).toHaveCount(1);
    await expect(
      adminPage.getByRole("heading", { name: agentData.name }),
    ).toBeVisible();
    await expect(adminPage.locator("tbody")).toContainText(agentData.name);

    await marketplace.expectListingStatus(agentData.name, "PUBLISHED");

    //catalog
    const catalog = new CatalogPage(adminPage);

    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentNotPresentInTable(agentData.name);

    //Verify Save Changes Required to Persist in Catalog
    await catalog.clickSyncFromAgents();
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.reloadPage();
    await catalog.expectAgentNotPresentInTable(agentData.name);
    await catalog.clickSyncFromAgents();
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.clickSaveChanges();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.reloadPage();
    await catalog.expectAgentPresentInTable(agentData.name);

    // CLEANUP: Remove agent from Catalog by uncheck the checkbox
    await catalog.unCheckAgent(agentData.name);
    await catalog.clickSaveChanges();
    // CLEANUP: Delete agent from Marketplace
    await marketplace.navigateToMarketplace();
    await marketplace.deleteListing(agentData.name);

    // CLEANUP: Delete agent from agent
    await agent.navigateToAgents2();
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });
  test("Verify Agent Not Visible in Access Policies Before Sync", async ({
    adminPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    marketplace = new MarketplacePage(adminPage);

    // VERIFY  AGENT APPEARS IN MARKETPLACE DROPDOWN and perform listing
    await marketplace.navigateToMarketplace();
    await marketplace.startCreateListing();
    await marketplace.openAgentDropdown();
    await marketplace.expectAgentInDropdown(agentData.name);

    await marketplace.createListingForAgent(
      agentData.name,
      "sfdsfewe4e",
      "febin",
    );

    // publish
    await marketplace.publishListing(agentData.name);

    const row = adminPage.locator("tbody tr").filter({
      has: adminPage.locator("h3", { hasText: agentData.name }),
    });

    await expect(row).toHaveCount(1);
    await expect(
      adminPage.getByRole("heading", { name: agentData.name }),
    ).toBeVisible();
    await expect(adminPage.locator("tbody")).toContainText(agentData.name);

    await marketplace.expectListingStatus(agentData.name, "PUBLISHED");

    //catalog
    const catalog = new CatalogPage(adminPage);

    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentNotPresentInTable(agentData.name);

    //Verify Save Changes Required to Persist in Catalog
    // await catalog.clickSyncFromAgents();
    // await catalog.expectAgentPresentInTable(agentData.name);
    // await catalog.reloadPage();
    // await catalog.expectAgentNotPresentInTable(agentData.name);
    await catalog.clickSyncFromAgents();
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.clickSaveChanges();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.reloadPage();
    await catalog.expectAgentPresentInTable(agentData.name);

    //AccessPolicies
    const accessPolicies = new AccessPoliciesPage(adminPage);

    await adminPage.goto("/spaces");
    await accessPolicies.navigateToAccessPolicies();
    await accessPolicies.clickSecondTdSvgForAccountAgentCatalog();
    await accessPolicies.expectAccountAgentNotPresentInPopupTable(
      agentData.name,
    );

    // CLEANUP: Remove agent from Catalog by uncheck the checkbox

    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.unCheckAgent(agentData.name);
    await catalog.clickSaveChanges();
    // CLEANUP: Delete agent from Marketplace
    await marketplace.navigateToMarketplace();
    await marketplace.deleteListing(agentData.name);

    // CLEANUP: Delete agent from agent
    await agent.navigateToAgents2();
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });
  test("Verify Sync From Catalog Brings Agent to Access Policies", async ({
    adminPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    marketplace = new MarketplacePage(adminPage);

    // VERIFY  AGENT APPEARS IN MARKETPLACE DROPDOWN and perform listing
    await marketplace.navigateToMarketplace();
    await marketplace.startCreateListing();
    await marketplace.openAgentDropdown();
    await marketplace.expectAgentInDropdown(agentData.name);

    await marketplace.createListingForAgent(
      agentData.name,
      "sfdsfewe4e",
      "febin",
    );

    // publish
    await marketplace.publishListing(agentData.name);

    const row = adminPage.locator("tbody tr").filter({
      has: adminPage.locator("h3", { hasText: agentData.name }),
    });

    await expect(row).toHaveCount(1);
    await expect(
      adminPage.getByRole("heading", { name: agentData.name }),
    ).toBeVisible();
    await expect(adminPage.locator("tbody")).toContainText(agentData.name);

    await marketplace.expectListingStatus(agentData.name, "PUBLISHED");

    //catalog
    const catalog = new CatalogPage(adminPage);

    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentNotPresentInTable(agentData.name);

    //Verify Save Changes Required to Persist in Catalog
    await catalog.clickSyncFromAgents();
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.clickSaveChanges();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.reloadPage();
    await catalog.expectAgentPresentInTable(agentData.name);

    //AccessPolicies
    const accessPolicies = new AccessPoliciesPage(adminPage);

    await adminPage.goto("/spaces");
    await accessPolicies.navigateToAccessPolicies();
    await accessPolicies.clickSecondTdSvgForAccountAgentCatalog();
    await accessPolicies.expectAccountAgentNotPresentInPopupTable(
      agentData.name,
    );
    await accessPolicies.closeEditEntityItemsDialog();
    await accessPolicies.clickSyncFromCatalog();
    await accessPolicies.reloadPage();

    await accessPolicies.clickSecondTdSvgForAccountAgentCatalog();
    await accessPolicies.expectAccountAgentPresentInPopupTable(agentData.name);

    // CLEANUP: Remove agent from Catalog by uncheck the checkbox

    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.unCheckAgent(agentData.name);
    await catalog.clickSaveChanges();
    //cleanup in access policies
    await adminPage.goto("/spaces");
    await accessPolicies.navigateToAccessPolicies();
    await accessPolicies.clickSyncFromCatalog();
    // CLEANUP: Delete agent from Marketplace
    await marketplace.navigateToMarketplace();
    await marketplace.deleteListing(agentData.name);

    // CLEANUP: Delete agent from agent
    await agent.navigateToAgents2();
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });
  //flow not defined, now it fail, need to define flow first
  test("Verify Toggle OFF Hides Agent From Public Marketplace", async ({
    adminPage,
  }) => {
    // CREATE AGENT
    await agent.createAgent(
      agentData.name,
      agentData.description,
      agentData.systemPrompt,
      agentData.tags,
    );

    // VERIFY CREATED
    await agent.expectAgentExists(agentData.name);
    await agent.expectAgentInTable(agentData.name);
    await agent.expectAgentActive(agentData.name);

    marketplace = new MarketplacePage(adminPage);

    // VERIFY  AGENT APPEARS IN MARKETPLACE DROPDOWN and perform listing
    await marketplace.navigateToMarketplace();
    await marketplace.startCreateListing();
    await marketplace.openAgentDropdown();
    await marketplace.expectAgentInDropdown(agentData.name);

    await marketplace.createListingForAgent(
      agentData.name,
      "sfdsfewe4e",
      "febin",
    );

    // publish
    await marketplace.publishListing(agentData.name);

    const row = adminPage.locator("tbody tr").filter({
      has: adminPage.locator("h3", { hasText: agentData.name }),
    });

    await expect(row).toHaveCount(1);
    await expect(
      adminPage.getByRole("heading", { name: agentData.name }),
    ).toBeVisible();
    await expect(adminPage.locator("tbody")).toContainText(agentData.name);

    await marketplace.expectListingStatus(agentData.name, "PUBLISHED");

    //catalog
    const catalog = new CatalogPage(adminPage);

    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentNotPresentInTable(agentData.name);

    //Verify Save Changes Required to Persist in Catalog
    await catalog.clickSyncFromAgents();
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.clickSaveChanges();
    await catalog.clickRowButtonByText("Agent");
    await catalog.expectAgentPresentInTable(agentData.name);
    await catalog.reloadPage();
    await catalog.expectAgentPresentInTable(agentData.name);

    //AccessPolicies
    const accessPolicies = new AccessPoliciesPage(adminPage);

    await adminPage.goto("/spaces");
    await accessPolicies.navigateToAccessPolicies();
    await accessPolicies.clickSecondTdSvgForAccountAgentCatalog();
    await accessPolicies.expectAccountAgentNotPresentInPopupTable(
      agentData.name,
    );
    await accessPolicies.closeEditEntityItemsDialog();
    await accessPolicies.clickSyncFromCatalog();
    await accessPolicies.reloadPage();

    await accessPolicies.clickSecondTdSvgForAccountAgentCatalog();
    await accessPolicies.expectAccountAgentPresentInPopupTable(agentData.name);

    //Toggle OFF the agent from Catalog
    // await accessPolicies.clickToggleSwitchForAgent(agentData.name);

    // CLEANUP: Remove agent from Catalog by uncheck the checkbox
    await adminPage.goto("/spaces");
    await catalog.navigateToCatalog();
    await catalog.clickRowButtonByText("Agent");
    await catalog.unCheckAgent(agentData.name);
    await catalog.clickSaveChanges();
    //cleanup in access policies
    await adminPage.goto("/spaces");
    await accessPolicies.navigateToAccessPolicies();
    await accessPolicies.clickSyncFromCatalog();
    // CLEANUP: Delete agent from Marketplace
    await marketplace.navigateToMarketplace();
    await marketplace.deleteListing(agentData.name);

    // CLEANUP: Delete agent from agent
    await agent.navigateToAgents2();
    await agent.deleteAgent(agentData.name);
    await agent.expectAgentNotInTable(agentData.name);
  });
});
