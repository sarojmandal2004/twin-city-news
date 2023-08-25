const API_KEY = '66b5d76c553540e9a58f9c583eec209d';
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fethNews("India"));


function reload() {
    window.location.reload();
}


async function fethNews(query){
  const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data= await res.json();
 
  bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    cardsContainer.innerHTML = ' ';
    articles.forEach((articles) => {
        if (!articles.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, articles);
        cardsContainer.appendChild(cardClone);
    });
}





function fillDataInCard(cardClone,articles){
    const newsImg=cardClone.querySelector("#news-image")
    const newsDes=cardClone.querySelector("#news-des")
    const newsSource=cardClone.querySelector("#news-source")
    const newsTitle=cardClone.querySelector("#news-title")

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDes.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${articles.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(articles.url, "_blank");
    });


}
let selctnav=null;
function onNavItemClick(id){
    fethNews(id);
    const navItemLink=document.getElementById(id);
    selctnav?.classList.remove('active');

    selctnav=navItemLink;
    selctnav.classList.add('active');
}

const button=document.getElementById('search-button');
const text=document.getElementById('text-input');

button.addEventListener('click',()=>{
    const query=text.value;
    if(!query) return;
    fethNews(query);
    selctnav.classList.remove('active');
    selctnav=null;
})

