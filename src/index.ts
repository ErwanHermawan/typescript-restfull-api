require("module-alias/register");
import { app } from "@application/index";
import { logger } from "@application/logging";

app.listen(3000, () => {
	logger.info("Listeng on port 3000");
});
