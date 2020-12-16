// // Nodejs modules
// import * as fs from "fs";
// import * as path from "path";

// // Electron modules
// import { desktopCapturer } from "electron";

// // Third party modules
// import { v4 as uuidv4 } from "uuid";
// import log from "loglevel";

// import appRuntime from "../appRuntime";

// const userPath = app.getPath("userData");

// log.setLevel("info");

// class VideoRecorder {
//     static videoRecorder;
//     static videoChunks;

//     async init() {
//         const sources = await desktopCapturer.getSources({ types: ["window", "screen"] });
//         this.videoRecorder = undefined;
//         this.videoChunks = [];
//         return sources;
//     }

//     async start() {
//         const handleStream = (stream) => {
//             this.videoRecorder = new MediaRecorder(stream);
//             this.videoRecorder.ondataavailable = (event) => {
//                 this.videoChunks = [];
//                 this.videoChunks.push(event.data);
//             };
//             log.info(stream);
//             log.info("Start video recording");
//         };

//         const handleError = (err) => {
//             log.error(err);
//         };

//         const sources = await this.init();
//         sources.forEach(async (source) => {
//             if (source.name === "Entire Screen") {
//                 try {
//                     const stream = await navigator.mediaDevices.getUserMedia({
//                         audio: true,
//                         video: true,
//                     });
//                     handleStream(stream);
//                 } catch (err) {
//                     handleError(err);
//                 }
//             }
//         });
//     }

//     /**
//      * Stop recording video
//      */
//     stop() {
//         this.videoRecorder.stop();
//         this.videoRecorder.onstop = () => {
//             const recPath = path.join(userPath, `${uuidv4()}.mp4`);
//             const reader = new FileReader();
//             const videoBlob = new Blob(this.videoChunks, { type: "video/mp4" });
//             reader.readAsArrayBuffer(videoBlob);
//             reader.onload = () => {
//                 if (reader.readyState == 2 && reader.result) {
//                     const videoBuffer = Buffer.from(reader.result);
//                     fs.writeFile(recPath, videoBuffer, (err) => {
//                         if (err) {
//                             log.error(err);
//                         } else {
//                             log.info("Your video file has been saved");
//                         }
//                     });
//                 } else log.error("FileReader has problems reading blob")
//             };
//         };
//     }
// }

// module.exports = { VideoRecorder };
