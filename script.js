const userDetails = document.getElementById("userDetails");
const form = document.getElementById("form");
const search = document.getElementById("search");
const userRepos = document.getElementById("userRepos");
const APIURL = "https://api.github.com/users/";

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();
    addUserinfo(respData);
    addRepos(username);
}

async function addRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();
    addReposToBody(respData);
}

function addUserinfo(user) {
    const userInfo = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                  
            </div>
        </div>
        
    `;

    const bodyComponent = 
    ` <h1>${user.name}'s Repositories:</h1>
    <div id = "repos"></div>   `;
    
    userDetails.innerHTML = userInfo;
    userRepos.innerHTML = bodyComponent;
}

function addReposToBody(repos) {

    const reposEl = document.getElementById("repos");
    repos.forEach((repo) => {
            const repoEl = document.createElement("a");
            `  
                <ul class="rep_info">
                    <li>${repoEl.classList.add("repo")}</li>;
                    <li>${repoEl.href = repo.html_url}</li>;
                    <li>${repoEl.target = "_blank"}</li>;
                    <li>${repoEl.innerText = "Name:" + repo.name +  "\nLanguage:" + repo.language}</li>;
                 </ul>
            `
            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    if (user) {
        getUser(user);
        search.value = "";
    }
});