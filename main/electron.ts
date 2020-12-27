import { app } from "electron";
import { sequelize } from "./models/index";
import log from "loglevel";
import { HomeWindow } from "./windows/home-window";

log.setLevel("info");

app.on("ready", async () => {
    const homeWin: HomeWindow = new HomeWindow();
    // a.createWindow([new SystemChannel("systemprocess")]);
    // Alternative setting ipc channel
    homeWin.createWindow();
    homeWin.register();

    try {
        await sequelize.sync({ logging: false });
        log.info("Connection has been established successfully.");
    } catch (error) {
        log.info("Unable to connect to the database:", error);
        app.quit();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        return false;
    }
    app.quit();
});
