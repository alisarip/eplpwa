const base_url = 'https://api.football-data.org'
const api_token = '944023ab62da44b4abaef5617019834a'
let status = res => {
    if (res.status != 200) {
        console.log(`Error : ${res.status}`)
        return Promise.reject(new Error(res.statusText()))
    } else {
        return Promise.resolve(res)
    }
}
const getStandings = leagueID => {
    if ('caches' in window) {
        caches.match(`${base_url}/v2/competitions/${leagueID}/standings`)
            .then(res => {
                if (res) {
                    res.json()
                        .then(data => {
                            let standingsHTML = ''
                            data = data.standings[0].table
                            data.forEach(dataTeam => {
                                let urlTeamImage = dataTeam.team.crestUrl
                                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                                standingsHTML +=
                                    `                        <tr>
                            <td>${dataTeam.position}</td>
                            <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
                            <td>${dataTeam.team.name}</td>
                            <td>${dataTeam.playedGames}</td>
                            <td>${dataTeam.won}</td>
                            <td>${dataTeam.draw}</td>
                            <td>${dataTeam.lost}</td>
                            <td>${dataTeam.goalsFor}</td>
                            <td>${dataTeam.goalsAgainst}</td>
                            <td>${dataTeam.goalDifference}</td>
                            <td>${dataTeam.points}</td>
                        </tr>
                        `
                            })
                            document.getElementById('progress').style.display = 'none'
                            document.getElementById('standings').innerHTML = standingsHTML
                        })
                        .catch(err => console.log(err))
                }
            })
    }
    fetch(`${base_url}/v2/competitions/${leagueID}/standings`, {
            headers: {
                'X-Auth-Token': api_token
            }
        })
        .then(status)
        .then(res => res.json())
        .then(data => {
            let standingsHTML = ''
            data = data.standings[0].table
            data.forEach(dataTeam => {
                let urlTeamImage = dataTeam.team.crestUrl
                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                standingsHTML +=
                    `
            <tr>
                <td>${dataTeam.position}</td>
                <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
                <td>${dataTeam.team.name}</td>
                <td>${dataTeam.playedGames}</td>
                <td>${dataTeam.won}</td>
                <td>${dataTeam.draw}</td>
                <td>${dataTeam.lost}</td>
                <td>${dataTeam.goalsFor}</td>
                <td>${dataTeam.goalsAgainst}</td>
                <td>${dataTeam.goalDifference}</td>
                <td>${dataTeam.points}</td>
            </tr>
            `
            })
            document.getElementById('progress').style.display = 'none'
            document.getElementById('standings').innerHTML = standingsHTML
        })
        .catch(err => console.log(err))
}
const getTeams = leagueID => {
    if ('caches' in window) {
        caches.match(`${base_url}/v2/competitions/${leagueID}/teams`)
            .then(res => {
                if (res) {
                    res.json()
                        .then(data => {
                            let teamsHTML = ''
                            data = data.teams
                            data.forEach(team => {
                                let urlTeamImage = team.crestUrl
                                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                                teamsHTML +=
                                    `
                                <div class="col s12">
                                    <div class="card">
                                    <div class="card-content row valign-wrapper">
                                        <div class="col s4" class="logo-team">
                                            <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                                        </div>
                                        <div class="col s8 information-team">
                                        <span class="badge-purple"><strong>${team.name}</strong></span>
                                        <span>${team.venue}</span>
                                        </div>
                                    </div>
                                    <div class="card-action right-align">
                                        <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
                                        <button onclick="addFavouriteTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="waves-effect waves-light btn purple accent-3">FAVOURITE</button>
                                    </div>
                                    </div>
                                </div>
                                `
                            })
                            document.getElementById('progress').style.display = 'none'
                            document.getElementById('teams').innerHTML = teamsHTML
                        })
                }
            })
    }
    fetch(`${base_url}/v2/competitions/${leagueID}/teams`, {
            headers: {
                'X-Auth-Token': api_token
            }
        })
        .then(status)
        .then(res => res.json())
        .then(data => {
            let teamsHTML = ''
            data = data.teams
            data.forEach(team => {
                let urlTeamImage = team.crestUrl
                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                teamsHTML +=
                    `
            <div class="col s12">
                <div class="card">
                <div class="card-content row valign-wrapper">
                    <div class="col s4" class="logo-team">
                        <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                    </div>
                    <div class="col s8 information-team">
                    <span class="badge-purple"><strong>${team.name}</strong></span>
                    <span>${team.venue}</span>
                    </div>
                </div>
                <div class="card-action right-align">
                    <a href="${team.website}" target="_blank" class="website-action">WEBSITE</a>
                    <button onclick="addFavouriteTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="waves-effect waves-light btn purple accent-3">FAVOURITE</button>
                </div>
                </div>
            </div>
            `
            })
            document.getElementById('progress').style.display = 'none'
            document.getElementById('teams').innerHTML = teamsHTML
        })
        .catch(err => console.log(err))
}
export default {
    getStandings,
    getTeams
}