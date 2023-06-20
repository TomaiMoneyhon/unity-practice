import { test } from "@playwright/test";
import { CareersPage } from "../pages/careers_page";
import { PositionPage } from "../pages/position_page";
import {ThankYouApplyPage} from "../pages/thank_you_apply_page";

test("apply for automation position", async ({ page }) => {
  const careers_page = new CareersPage(page);
  await careers_page.goto();
  await careers_page.selectFromLocationsDropDown("Tel Aviv");
  await careers_page.selectFromTeamsDropDown("R&D");
  await careers_page.inputSearch("automation");
  await careers_page.selectCareerItem();

  const position_page = new PositionPage(page);
  await position_page.fill_comeet_form();
  await position_page.upload_resume_file();
  await position_page.submit_comeet_form();

  const thank_you_apply_page = new ThankYouApplyPage(page);
  thank_you_apply_page.assert_submision_success();

});
