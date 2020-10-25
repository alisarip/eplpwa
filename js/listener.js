import database from './db.js'
const getAllTeam = () => {
    database.getTeam()
        .then(data => {
            let teamsHTML = ''
            data.forEach(team => {
                teamsHTML +=
                    `
                <div class="col s12">
                    <div class="card">
                    <div class="card-content row valign-wrapper">
                        <div class="col s4" class="logo-team">
                            <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                        </div>
                        <div class="col s8 information-team">
                        <span class="badge-purple"><strong>${team.name}</strong></span>
                        <span>${team.venue}</span>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
                        <button onclick="deleteFavouriteTeam(${team.id},'${team.name}')" class="waves-effect waves-light btn purple accent-3">REMOVE</button>
                    </div>
                    </div>
                </div>
                `
            })
            document.getElementById('progress').style.display = 'none'
            document.getElementById('favouriteTeams').innerHTML = teamsHTML
        })
}
const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/images/Icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}
const addFavouriteTeam = (id, logo, name, venue, website) => {
    database.addTeam({ id, logo, name, venue, website })
    M.toast({ html: `Favourited ${name}`, classes: 'rounded' });
    pushNotification(`Favourited ${name}`)
}
const deleteFavouriteTeam = (id, name) => {
    let imSure = confirm(`Are you sure want to delete ${name} from Favourite ?`)
    if (imSure) {
        database.deleteTeam(id)
        getAllTeam()
        M.toast({ html: `Deleted ${name}`, classes: 'rounded' })
        pushNotification(`Deleted ${name}`)
    }
}
export default {
    addFavouriteTeam,
    getAllTeam,
    deleteFavouriteTeam
}