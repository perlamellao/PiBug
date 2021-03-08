const {app, BrowserWindow, ipcMain }=require('electron')
const path=require('path')
const url=require('url')


let win 
let child

function createWindows() {
    
    win = new BrowserWindow({width:1200,height:800, webPreferences:{nodeIntegration:true, contextIsolation: false, spellcheck: false}, show: false})

    win.loadURL(url.format({
        pathname:path.join(__dirname,'/templates/index.html'),
        protocol:'file',
        slashes:true
    }))
    win.setMenu(null)
    win.webContents.openDevTools()

    child = new BrowserWindow({parent: win,width:800,height:600, webPreferences:{nodeIntegration:true, contextIsolation: false, spellcheck: false}, frame:false})
    child.loadURL(url.format({
        pathname:path.join(__dirname,'/templates/login.html'),
        protocol:'file',
        slashes:true
    }))
    child.webContents.openDevTools()

}
app.on('ready', createWindows)


ipcMain.on('entry-accepted', (event, arg) => {
  if(arg=='login'){
      win.show()
      child.hide()
  }
})
