import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize'),
  fullscreen: () => ipcRenderer.send('fullscreen'),
  exitFullscreen: () => ipcRenderer.send('exitFullscreen')
})
