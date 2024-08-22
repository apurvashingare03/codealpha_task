const music=new Audio('songs/Dil Jhoom.mp3');
// music.play();

const songs =[
    // menu side
    {
        id:1,
        songname: 'Naadaniya  <div class="subtitle">Akshath</div>',
        poster: "images/1.jpg"
    },
    {
        id:2,
        songname: 'Sajni<div class="subtitle">Arijit Singh</div>',
        poster: "images/sajni.jpeg"
    },
    {
        id:3,
        songname: 'Hawayein<div class="subtitle">Arijit Singh  and Pritam Chakraborty</div>',
        poster: "images/Hawayein.jpg"
    },
    {
        id:4,
        songname: 'Phir Se Udd Chala<div class="subtitle">Mohit Chauhan</div>>',
        poster: "images/phirseudchala.jpg"
    },
    {
        id:5,
        songname: 'Pehle Bhi Main<div class="subtitle">Raj Shekhar and Vishal Mishra</div>',
        poster: "images/pehlebhimain.jpg"
    },
    {
        id:6,
        songname: 'Sanam Re<div class="subtitle">Arijit Singh and Mithoon Sharma</div>',
        poster: "images/sanamre.jpg"
    },
    // popularsongs box
    {
        id:7,
        songname: 'O Mahi <br><div class="subtitle">Arijit Singh</div>',
        poster: "images/o mahi.jpeg"
    },
    {
        id:8,
        songname: 'Dil Jhoom<br> <div class="subtitle"> Arijit Singh and Mithoon</div>',
        poster: "images/dilljhoom.jpeg"
    },
    {
        id:9,
        songname: 'Tere Hawaale<br> <div class="subtitle"> Arijit Singh and Shilpa Rao</div>',
        poster: "images/tere hawale.jpeg"
    },
    {
        id:10,
        songname: 'kahani<br><div class="subtitle">Amitabh Bhattacharya, K Mohan, and Pritam Chakraborty </div>',
        poster: "images/kahani.jpeg"
    },
    {
        id:11,
        songname: 'Dekha Tenu<br><div class="subtitle">Mohammad Faiz </div>',
        poster: "images/dekhatenu.jpeg"
    },
    {
        id:12,
        songname: 'Ram Siya Ram<br><div class="subtitle">Sachet-Parampara</div>',
        poster: "images/ramsiyaram.jpg"
    }
    ,
    {
        id:13,
        songname: 'Ve Kamleya<br><div class="subtitle">Arijit Singh and Shreya Ghoshal</div>',
        poster: "images/vekamleya.jpeg"
    }
    ,
    {
        id:14,
        songname: 'Gun Gun Guna Re <br><div class="subtitle">Ajay-Atul,Sunidhi Chauhan and Udit Narayan</div>',
        poster: "images/gungunguna.jpeg"
    }
    ,
    {
        id:15,
        songname: 'Heeriye<br><div class="subtitle">Arijit Singh and Jasleen Royal</div>',
        poster: "images/heeriye.jpeg"
    }
    ,
    {
        id:16,
        songname: 'Kesariya<br><div class="subtitle"> Arijit Singh</div>',
        poster: "images/keseriya.jpeg"
    }
]
Array.from(document.getElementsByClassName('songitem')).forEach((e,i)=>{
    e.getElementsByTagName('img')[0].src=songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML=songs[i].songname;
});

let masterplay=document.getElementById('masterplay');
masterplay.addEventListener('click',()=>{
    if(music.paused || music.currentTime<=0){
        music.play();
        wave.classList.add('active1');
        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
    }else{
        music.pause();
        wave.classList.remove('active1');
        masterplay.classList.add('bi-play-fill');
        masterplay.classList.remove('bi-pause-fill');
    }
}); 

const makeAllBackground=()=>{
    Array.from(document.getElementsByClassName('songitem')).forEach((el)=>{
        el.style.background= 'rgb(105, 105, 105,.0)';
    })
}

let index = 0;
let poster_masterplay = document.getElementById('poster_masterplay');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistplay')).forEach((e)=>{
    e.addEventListener('click',(el) => {
        index =el.target.id;
        console.log(index);
        music.src =`songs/${index}.mp3`;
        music.play();
        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
         
        let songtitles = songs.filter((els)=>{
            return els.id == index;
        });
        songtitles.forEach(elss =>{
            let {songname ,poster}=elss;
            title.innerHTML = songname;
            poster_masterplay.src = poster;
        });
        makeAllBackground();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background="rgb(105, 105, 105,.1)";
        wave.classList.add('active1');
    });
})

let currentstart =document.getElementById('currentstart');
let currentend =document.getElementById('currentend');
let seek =document.getElementById('seek');
let bar2 =document.getElementById('bar2');
let dot =document.getElementsByClassName('dot')[0];
music.addEventListener('timeupdate',()=>{
    let music_curr= music.currentTime;
    let music_dur= music.duration;
    
    let min1=Math.floor(music_dur/60);
    let sec1=Math.floor(music_dur%60);
    //  console.log(min1);
    if(sec1<10){
        sec1=`0${sec1}`;
    }
    currentend.innerHTML=`${min1}:${sec1}`;

    let min2 = Math.floor(music_curr/60);
    let sec2 = Math.floor(music_curr%60);
    if(sec2 < 10){
        sec2=`0${sec2}`;
    }
    currentstart.innerHTML=`${min2}:${sec2}`;

    let progressbar = parseInt((music_curr/music_dur)*100);
    seek.value=progressbar;

    let seekbar=seek.value;
    bar2.style.width=`${seekbar}%`;
    dot.style.left=`${seekbar}%`;
    
});

seek.addEventListener('change',()=>{
    music.currentTime=seek.value*music.duration/100;
});

let vol_icon=document.getElementById('vol_icon');
let vol=document.getElementById('vol');
let volbar=document.getElementsByClassName('volbar')[0];
let voldot=document.getElementById('voldot');

vol.addEventListener('change',()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
    }
    if(vol.value > 0){
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
    }
    if(vol.value > 50){
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
    }
    let vol_a=vol.value;
    volbar.style.width=`${vol_a}%`;
    volbar.style.left=`${vol_a}%`;
    music.volume= vol_a/100;
});

let back=document.getElementById('back');
let next=document.getElementById('next');

back.addEventListener('click',()=>{
    index-=1;
    if(index <=1){
        index = Array.from(document.getElementsByClassName('songitem')).length;
    }
    music.src =`songs/${index}.mp3`;
        music.play();
        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
         
        let songtitles = songs.filter((els)=>{
            return els.id == index;
        });
        songtitles.forEach(elss =>{
            let {songname ,poster}=elss;
            title.innerHTML = songname;
            poster_masterplay.src = poster;
        });
        makeAllBackground();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background="rgb(105, 105, 105,.1)";
        wave.classList.add('active1');
})
next.addEventListener('click',()=>{
    index ++;
    if(index >  Array.from(document.getElementsByClassName('songitem')).length){
        index = 1;
    }
    music.src =`songs/${index}.mp3`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');
     
    let songtitles = songs.filter((els)=>{
        return els.id == index;
    });
    songtitles.forEach(elss =>{
        let {songname ,poster}=elss;
        title.innerHTML = songname;
        poster_masterplay.src = poster;
    });
    makeAllBackground();
    Array.from(document.getElementsByClassName('songitem'))[index-1].style.background="rgb(105, 105, 105,.1)";
    wave.classList.add('active1');
})

//search data
let search_results=document.getElementsByClassName('search_results')[0];

songs.forEach(element=>{
    const{id ,songname ,poster}=element;
    let card =document.createElement('a');
    card.classList.add('card');
    card.href="#"+id;     
    card.innerHTML=
     `<img src="${poster}" alt="">
      <div class="content">
        ${songname}
      </div>`;
      search_results.appendChild(card);
});

let input =document.getElementsByTagName('input')[0];
input.addEventListener('keyup',()=>{
    let input_value=input.value.toUpperCase();
    let items = search_results.getElementsByTagName('a');

    for(let index=0;index<items.length;index++){
        let as=items[index].getElementsByClassName('content')[0];
        let text_value=as.textContent||as.innerHTML;

        if(text_value.toUpperCase().indexOf(input_value)>-1){
            items[index].style.display="flex";
        }else{
            items[index].style.display="none";
        }
        if(input.value==0){
            search_results.style.display="none";
        }
        else{
            search_results.style.display="";
        }
    }
})