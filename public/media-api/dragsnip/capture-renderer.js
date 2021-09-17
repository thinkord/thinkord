/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const { ipcRenderer } = require("electron");

const { v4: uuidv4 } = require("uuid");
const log = require("loglevel");

const { getScreenSources } = require("./desktop-capturer");
const { CaptureEditor } = require("./capture-editor");
// const { getCurrentScreen } = require("./utils");

log.setLevel("info");

const startDragsnip = (currentWork) => {
    if (!currentWork) {
        return;
    }
    const $canvas = document.getElementById("js-canvas");
    const $bg = document.getElementById("js-bg");
    const $toolbar = document.getElementById("js-toolbar");
    const $btnClose = document.getElementById("js-tool-close");
    const $btnSave = document.getElementById("js-tool-save");
    const $btnReset = document.getElementById("js-tool-reset");

    getScreenSources({}, async (imgSrc) => {
        // console.timeEnd('capture')
        // const currentScreen = await ipcRenderer.invoke("system-channel", "getCurrentScreen");
        const capture = new CaptureEditor($canvas, $bg, imgSrc);
        const onDrag = (selectRect) => {
            $toolbar.style.display = "none";
        };
        capture.on("start-dragging", onDrag);
        capture.on("dragging", onDrag);

        const onDragEnd = () => {
            if (capture.selectRect) {
                // ipcRenderer.send("capture-screen", {
                //     type: "select",
                //     screenId: currentScreen.id,
                // });
                const { r, b } = capture.selectRect;
                $toolbar.style.display = "flex";
                $toolbar.style.top = `${b + 15}px`;
                $toolbar.style.right = `${window.screen.width - r}px`;
            }
        };
        capture.on("end-dragging", onDragEnd);

        // ipcRenderer.on("capture-screen", (e, { type, screenId }) => {
        //     if (type === "select") {
        //         if (screenId && screenId !== currentScreen.id) {
        //             capture.disable();
        //         }
        //     }
        // });

        capture.on("reset", () => {
            $toolbar.style.display = "none";
            // $sizeInfo.style.display = 'none'
        });

        $btnClose.addEventListener("click", () => {
            ipcRenderer.invoke("window-channel", "close", { win: "maskWin" });
            window.close();
        });

        $btnReset.addEventListener("click", () => {
            capture.reset();
        });

        $btnSave.addEventListener("click", async () => {
            const userPath = await ipcRenderer.invoke("system-channel", "getUserPath");
            const url = capture.getImageUrl();
            const env = await ipcRenderer.invoke("system-channel", "getNodeEnv");
            const dragsnipName = `${uuidv4()}.png`;
            const dragsnipPath =
                env === "development" ? `media/${dragsnipName}` : path.join(userPath, "blob_storage", dragsnipName);
            // const dragsnipPath = path.join(userPath, "blob_storage", dragsnipName);

            try {
                await fs.writeFile(
                    env === "development" ? `public/${dragsnipPath}` : `${dragsnipPath}`,
                    new Buffer.from(url.replace("data:image/png;base64,", ""), "base64"),
                    () => {
                        log.info("Dragsnip has been saved!");
                        ipcRenderer.invoke("media-channel", "save", {
                            name: dragsnipName,
                            path: dragsnipPath,
                            type: "image",
                            current: currentWork,
                        });
                        ipcRenderer.invoke("window-channel", "close", { win: "maskWin" });
                        ipcRenderer.invoke("window-channel", "captureSignal", "data");
                        log.info("Screenshot has been saved successfully");
                    }
                );
            } catch (err) {
                throw err;
            }
        });
    });
};

exports.startDragsnip = startDragsnip;
