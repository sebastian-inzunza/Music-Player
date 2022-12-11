let  now_play = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name")
let track_artist = document.querySelector(".track-artist")

let pause_btn = document.querySelector(".pause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");


let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isplaying = false;
let updateTimer;

//create new audio element

let curr_track = document.createElement("audio");

let track_list = [
    {
		 name: "Day By Me",
        artist: 'Yung Bae',
        image: "img/cover1.jpg",
        path: "music/YUNG BAE - Japanese Disco Edits 3 - 01 Day By Day.mp3"
    },
    {
		name: "Fly Whith Me",
        artist: 'Yung Bae',
        image: "img/cover.jpg",
        path: "music/Fly With Me.mp3"
       
    },
    {
        name: "02 Funky Flushin",
        artist: 'Yung Bae',
        image: "img/cover.jpg",
        path: "music/YUNG BAE - Japanese Disco Edits 3 - 02 Funky Flushin' (Edit).mp3"
    }
];


function random_bg_Color(){
    //Get a number betwen 64 to 256(for getting lighter colors)
    let red = Math.floor(Math.random()*256) + 64 ;
    let green = Math.floor(Math.random()*256) + 64 ;
    let blue  = Math.floor(Math.random()*256) + 64 ;

    let bgColor = "rgb(" + red + "," + green +"," +  blue  + ")"; 
    //segth the background to that color
    document.body.style.background = bgColor

}

function LoadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();
    curr_track.src  = track_list[track_index].path
    // curr_track.load();

    track_art.style.backgroundImage = "url("+track_list[track_index].image+")";
    track_name.textContent = track_list[track_index].name;
    track_artist =track_list[track_index].artist;
    now_play.textContent = "PLAYING "+(track_index+1) + " OF " + track_list.length ;

    updateTimer = setInterval(seekUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack)
    random_bg_Color();
}

function resetValues(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
LoadTrack(track_index)

function playPauseTrack(){
    if(!isplaying){
       playTrack(); 
    }else{
        PauseTrack();
    }
}

function playTrack(){
    curr_track.play()
    isplaying = true;
    pause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}

function PauseTrack(){
    curr_track.pause()
    isplaying =false
    pause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'
}

function nextTrack(){
    if (track_index < track_list.length - 1 ){
        track_index+=1;

    }else{
        track_index = 0
    }
    LoadTrack(track_index);
    playTrack()
}

function prevTrack(){
    if (track_index > 0  ){
        track_index-=1;

    }else{
        track_index = track_list.length
    }
    LoadTrack(track_index);
    playTrack()
}

function seekTo(){
    let seekto = curr_track.duration* (seek_slider.value/100);

    curr_track.currentTime = seekto;
}

function setVolume(){
    curr_track.volume = volume_slider.value/100;
}

function seekUpdate(){
    let seekPosition = 0;
    // check if the current track duration  is a legible number
    if(curr_track.duration){
        seekPosition= curr_track.currentTime*(100/curr_track.duration)
        seek_slider.value = seekPosition;

        let currentMinute = Math.floor(curr_track.currentTime/60)
        let currentSeconds = Math.floor(curr_track.currentTime- currentMinute * 60)
        let durationMinutes = Math.floor(curr_track.duration / 60 )
        let durationSeconds = Math.floor(curr_track.duration -durationMinutes * 60)

        //Addung zeto to the single digit time values

        if(currentSeconds<10){
            currentSeconds = "0" + currentSeconds;
        }
        if(durationSeconds<10){
            durationSeconds = "0" + durationSeconds;
        }

        if (currentMinute<10){
            currentMinute="0" + currentMinute
        }

        if(durationMinutes<10){
            durationMinutes = "0" + durationMinutes
        }

        // display the update duration
        curr_time.textContent = currentMinute+":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
    
}