import api from './api.js'
import listener from './listener.js'
const loadPage = (path = 'home') => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            let element = document.querySelector('#body-content')
            if (xhr.status == 200) {
                element.innerHTML = xhr.responseText
                if (path === 'home') {
                    api.getStandings(2021)
                }
                if (path === 'favourite') {
                    listener.getAllTeam()
                    window.deleteFavouriteTeam = listener.deleteFavouriteTeam
                }
                if (path === 'teams') {
                    api.getTeams(2021)
                    window.addFavouriteTeam = listener.addFavouriteTeam
                }
            } else if (xhr.status == 404) {
                element.innerHTML = "<h1>Halaman Tidak Ditemukan</h1>"
            } else {
                element.innerHTML = "<h1>Maaf. halaman tidak dapat di akses!</h1>"
            }
        }
    }
    xhr.open('GET', `/pages/${path}.html`, true)
    xhr.send()
}
export default loadPage