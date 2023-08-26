import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3003/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/UCI Web Channel/);
});

test("Socket is connected via console logs", async ({ page }) => {
  const consoleMessages = [];

  page.on("console", (msg) => {
    //@ts-ignore
    consoleMessages.push(msg.text());
  });

  await page.goto("http://localhost:3003/");

  // await page.waitForTimeout(20000); // Give it some time to connect

  expect(consoleMessages).toContain("Socket Connected");
});

test("Socket is disconnected via console logs", async ({ page }) => {
  const consoleMessages = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      // Check if the message type is 'error'
      //@ts-ignore
      consoleMessages.push(msg.text());
    }
  });

  await page.goto("http://localhost:3003/");

  // If you want to give the page some time to gather console logs, uncomment the next line
  // await page.waitForTimeout(20000);

  console.log("consoleMessages:", consoleMessages);
  //@ts-ignore
  const isMessageContained = consoleMessages.some((message) =>
    message.includes("net::ERR_INTERNET_DISCONNECTED")
  );
  expect(isMessageContained).toBeTruthy();
});
