let profileImg = document.querySelector('.profile-img');
let nameEl = document.querySelector('.profile-name');
let userEl = document.querySelector('.username');
let joinedInEl = document.querySelector('.joined-in');
let bioEl = document.querySelector('.bio');
let reposEl = document.querySelector('.repos');
let followersEl = document.querySelector('.followers');
let followingEl = document.querySelector('.following');
let locationEl = document.querySelector('.location');
let blogEl = document.querySelector('.blog');
let twitterEl = document.querySelector('.twitter');
let companyEl = document.querySelector('.company');
let links = document.querySelectorAll('.links > div');

let errMsg = document.querySelector('.errMsg');
let loader = document.querySelector('.loading');

const fetching = async (value) => {
    loader.classList.add('active');
    try {
        let response = await fetch(`https://api.github.com/users/${value}`);
        let data = await response.json();
        if (!response.ok) {
            errMsg.innerText = 'Not found';
            errMsg.style.display = 'block';
        } else {
            errMsg.innerText = 'No result';
            errMsg.style.display = 'none';
        }
        
        if (data.message == 'Not Found') {
            loader.classList.remove('active');
            return false;
        } else {
            getDateForm(data);
            fillData(data);
            loader.classList.remove('active');
        }
    } catch (error) {
        console.log('There was an error', error);
    }
}


const getDateForm = (data) => {
    let date = new Date(data.created_at);
    let day = date.getDate();
    let month = date.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();
    joinedInEl.innerText = `Joined ${day < 10 ? 0+''+day : day} ${month} ${year}`;
}

const fillData = (data) => {
    profileImg.src = data.avatar_url;
    nameEl.innerText = !data.name ? 'Not available' : data.name;
    userEl.innerText = `@${data.login}`;
    userEl.href = data.html_url;
    bioEl.innerText = !data.bio ? 'this profile has no bio' : data.bio;
    reposEl.innerText = data.public_repos;
    followersEl.innerText = data.followers;
    followingEl.innerText = data.following;
    locationEl.innerText = `${!data.location ? 'Not available' : data.location}`;
    blogEl.innerText = `${!data.blog ? 'Not available' : data.blog}`;
    blogEl.href = `https://${data.blog}`;
    twitterEl.innerText = `${!data.twitter_username ? 'Not available' : '@'+''+data.twitter_username}`;
    twitterEl.href = `https://twitter.com/${data.twitter_username}`;
    companyEl.innerText = `${!data.company ? 'Not available' : data.company}`;
    companyEl.href = `https://github.com/${data.company}`;
    linksDeal();
}

const linksDeal = () => {
    links.forEach(link => {
        link.children[1].innerText == 'Not available' ? link.classList.add('not-av') : link.classList.remove('not-av');
        link.children[1].innerText == 'Not available' ? link.children[1].classList.add('not-av') : link.children[1].classList.remove('not-av');
    });
}



let themeBtn = document.querySelector('.toggle-theme');
let themeIcon = document.querySelector('.toggle-theme > i');


themeBtn.addEventListener('click', () => {
    themeBtn.classList.toggle('active');

    themeBtn.classList.contains('active') ?
        document.body.parentElement.setAttribute('data-theme', 'dark')
        : document.body.parentElement.removeAttribute('data-theme', 'dark');

    document.body.parentElement.getAttribute('data-theme', 'dark') ?
        themeBtn.innerHTML = 'light <i class="fa-solid fa-sun"></i>' :
            themeBtn.innerHTML = 'dark <i class="fa-solid fa-moon"></i>';
    
        localStorage.setItem('theme', JSON.stringify(themeBtn.classList.contains('active')));
    });

const toggleTheme = () => {
    JSON.parse(localStorage.getItem('theme')) ?
        themeBtn.classList.add('active')
            : themeBtn.classList.remove('active');

    themeBtn.classList.contains('active') ?
        document.body.parentElement.setAttribute('data-theme', 'dark')
        : document.body.parentElement.removeAttribute('data-theme', 'dark');
    
    document.body.parentElement.getAttribute('data-theme', 'dark') ?
        themeBtn.innerHTML = 'light <i class="fa-solid fa-sun"></i>' :
            themeBtn.innerHTML = 'dark <i class="fa-solid fa-moon"></i>';
}
toggleTheme();


let searchInput = document.querySelector('.search-input');
let searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', (e) => {
    search(e);
});

window.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') search(e);
})

const search = (e) => {
    e.preventDefault();
    if (!searchInput.value) {
        errMsg.style.display = 'block';
    } else {
        fetching(searchInput.value);
        errMsg.style.display = 'none';
    }
}