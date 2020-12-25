import { app } from "electron";
import { HomeWindow } from "./windows/HomeWindow";

app.on("ready", () => {
    const a: HomeWindow = new HomeWindow();
    // a.createWindow([new SystemChannel("systemprocess")]);
    // Alternative setting ipc channel
    a.createWindow();
    a.register();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        return false;
    }
    app.quit();
});
