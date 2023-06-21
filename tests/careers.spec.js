import { test } from "@playwright/test";
import { CareersPage } from "../pages/careers.page";
import { PositionPage } from "../pages/position.page";
import { ThankYouApplyPage } from "../pages/thank-you-apply.page";

test("apply for automation position", async ({ page }) => {
  const careersPage = new CareersPage(page);
  await careersPage.visit();
  await careersPage.selectFromLocationsDropDown("Tel Aviv");
  await careersPage.selectFromTeamsDropDown("R&D");
  await careersPage.inputSearch("automation");
  await careersPage.selectCareerItem();

  const positionPage = new PositionPage(page);
  await positionPage.fill_comeet_form();
  await positionPage.upload_resume_file();
  await positionPage.submit_comeet_form();

  const thankYouApplyPage = new ThankYouApplyPage(page);
  await thankYouApplyPage.assertSubmisionSuccess();
});
