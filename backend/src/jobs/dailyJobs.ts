import { CronJob } from "cron";
import { updateBillings } from "../utils/updateNextBlillingDate";

new CronJob(
  "0 0 6 * * *", // 0 0 6 * * * every day at 6 am Europe/Warsaw time
  async () => {
    await updateBillings();
  },
  null,
  true,
  "Europe/Warsaw",
);
