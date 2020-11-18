// eslint-disable-next-line @typescript-eslint/no-var-requires
const { contextBridge, ipcRenderer } = require("electron");
// const mainProcess = remote.require('./electron')
// const service = require('../service/index')

contextBridge.exposeInMainWorld("appRuntime", {
    send: (channel, command, args) => {
        ipcRenderer.send(channel, command, args);
    },
    subscribe: (channel, listener) => {
        const subscription = (event, ...args) => listener(...args);
        ipcRenderer.on(channel, subscription);

        return () => {
            ipcRenderer.removeListener(channel, subscription);
        };
    },

    subscribeOnce: (channel, listener) => {
        const subscription = (event, ...args) => listener(...args);
        ipcRenderer.once(channel, subscription);
    },
});
