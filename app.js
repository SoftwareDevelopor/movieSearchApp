let getdata=async (title)=>{
    if(title==undefined || title==''){
        apiurl=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d9e766cc14dcb907e81e25fe4fde5139&page=1`
    }
    else{
        apiurl=`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&page=1&query=${title}`
    }
    let movieData=await fetch(apiurl);
    
    let finalmoviedata=await movieData.json()
    console.log(finalmoviedata)
    let {results}=finalmoviedata

    let movie=''
    results.forEach((element,index) => {
        let resultimg=element.backdrop_path
        let resultbody=element.original_title
        let resultdate=element.release_date
        movie+=`
            <div key={${index}} class="movieItem">
                <img src="https://image.tmdb.org/t/p/w1280${resultimg}" alt="" />
                <div class="movieBody">
                    <p> ${resultbody}</p>
                    <p>${resultdate}</p>
                </div>
            </div>
        `
    });

    
    let movieDivs=document.querySelector('.moviedivs');
    movieDivs.innerHTML=movie
}
getdata()

let currentpage=1;
function Nextmovie(){
    currentpage+=1;
    getdata(currentpage)
}

function Previousmovie(){
    currentpage-=1;
    getdata(currentpage)
}

let searchInput=document.querySelector('.main input')
searchInput.addEventListener("keyup",(Event)=>{
    let searchvalue=Event.target.value;
    getdata(`${searchvalue}`)
})