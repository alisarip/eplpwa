import loadNav from './nav.js'
import loadPage from './page.js'
import app from './app.js'
let path = window.location.hash.substr(1)
path ? path = path : path = 'home'
app.registration()
app.notification()
document.addEventListener('DOMContentLoaded', () => {
    loadNav()
    loadPage(path)
})