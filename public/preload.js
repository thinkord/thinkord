const { contextBridge, ipcRenderer } = require('electron')
// const mainProcess = remote.require('./electron')
// const service = require('../service/index')

contextBridge.exposeInMainWorld(
    "appRuntime",
    {
        send: (channel, data) => {
            ipcRenderer.send(channel, data)
        },
        subscribe: (channel, listener) => {
            const subscription = (event, ...args) => listener(...args)
            ipcRenderer.on(channel, subscription)

            return () => {
                ipcRenderer.removeListener(channel, subscription)
            }
        }
    }
)