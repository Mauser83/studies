const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Testi Nukke",
        username: "testi",
        password: "topsekret",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Blogs");
    await expect(locator).toBeVisible();
    await expect(page.getByRole("button", { name: "log in" })).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "testi", "salainen");
    const notificationDiv = await page.locator(".Notification");
    await expect(notificationDiv).toContainText("wrong username or password");
    await expect(notificationDiv).toHaveCSS("border-style", "solid");
    await expect(notificationDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("Testi Nukke logged in")).not.toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "testi", "topsekret");
    await expect(page.getByText("Testi Nukke logged in")).toBeVisible();
  });
  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "testi", "topsekret");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Playwright",
        "https://playwright.dev/"
      );
      await expect(
        page.getByText("a blog created by playwright Playwright")
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Playwright",
        "https://playwright.dev/"
      );
      await page.getByRole("button", { name: "show" }).click();
      await expect(page.getByText("likes 0")).toBeVisible();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("a blog can be removed", async ({ page }) => {
      await createBlog(
        page,
        "a blog created by playwright",
        "Playwright",
        "https://playwright.dev/"
      );
      await page.getByRole("button", { name: "show" }).click();
      page.on("dialog", async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();
      });
      await page.getByRole("button", { name: "delete" }).click();
      await expect(
        page.getByText("a blog created by playwright Playwright")
      ).not.toBeVisible();
    });

    test("only creator of blog can see delete button", async ({ page, request }) => {
      await request.post("/api/users", {
        data: {
          name: "Testi Nukke",
          username: "testi2",
          password: "topsekret",
        },
      });
      await createBlog(
        page,
        "a blog created by playwright",
        "Playwright",
        "https://playwright.dev/"
      );
      await page.getByRole("button", { name: "Logout" }).click();
      await loginWith(page, "testi2", "topsekret");
      await page.getByRole("button", { name: "show" }).click();
      await expect(
        page.getByRole("button", { name: "delete" })
      ).not.toBeVisible();
    })
    
    test("the blogs will be sorted by likes", async ({ page }) => {
      await createBlog(
        page,
        "1st blog created by playwright",
        "Playwright",
        "https://playwright.dev/"
      );
      await createBlog(
        page,
        "2nd blog created by playwright",
        "Playwright",
        "https://playwright.dev/"
      );
      await expect(page.locator(".blog").first()).toContainText("1st blog created by playwright")
      await page.locator(".blog")
      .filter( {has: page.getByText("2nd blog created by playwright")})
      .getByRole("button", { name: "show" })
      .click()
      await page.locator(".blog")
      .filter( {has: page.getByText("2nd blog created by playwright")})
      .getByRole("button", { name: "like" })
      .click()
      await expect(page.locator(".blog").first()).toContainText("2nd blog created by playwright")
      await page.locator(".blog")
      .filter( {has: page.getByText("1st blog created by playwright")})
      .getByRole("button", { name: "show" })
      .click()
      await page.locator(".blog")
      .filter( {has: page.getByText("1st blog created by playwright")})
      .getByRole("button", { name: "like" })
      .click()
      await page.waitForTimeout(3000)
      await page.locator(".blog")
      .filter( {has: page.getByText("1st blog created by playwright")})
      .getByRole("button", { name: "like" })
      .click({ force: true })
      await expect(page.locator(".blog").first()).toContainText("1st blog created by playwright")
    })
  });
});
