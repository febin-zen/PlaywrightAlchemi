import { test, expect } from "../../fixtures/roles.fixture";
import { AgentPage } from "../../../pages/Cockpit/nexus/Agent";
import { MarketplacePage } from "../../../pages/Cockpit/nexus/Marketplace";
import { PublicMarketplacePage } from "../../../pages/Cockpit/nexus/PublicMarketplace";
import { AgentDataFactory } from "../../data/nexus/agentDataFactory";

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
  //currently fail beacause its have issue
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
});
