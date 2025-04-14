console.log("javascript here!");

let currentSong = new Audio();
// making it global for accessing it all songs;
let audio; 

// function for formate time of second into minute::seconds
function formatTime(seconds) {
  
  if(isNaN(seconds)||seconds<0){
    return "00:00";
  }

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad with zero if less than 10
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = remainingSeconds.toString().padStart(2, '0');

  // Return the formatted time
  return `${paddedMinutes}:${paddedSeconds}`;
}

// function for get songs as intial from code to write start here.
async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs");
  let res = await a.text();
  // console.log(element);
  let div = document.createElement("div");
  div.innerHTML = res;
  //  console.log(div);

  let as = div.getElementsByTagName("a");
  //  console.log(as);
  let songs = [];
  for (let index = 1; index < as.length; index++) {
    let element = as[index];
    if (element.href.endsWith(".mp3")) {
      // this for getting songs in a (attribute) from href
      // songs.push(element.href);
      // there separate  song from url by using split
       songs.push(element.href.split("/songs/")[1]);
    }
  }
  // console.log(songs);
  return songs;
}


// play song function for playing song in this all song get played when click so there some new only one song be played this can be done with current song as some global variable create.
// let playSong = (track)=>{
//   let audio = new Audio("/songs/" + track);
//   audio.play();
// }


// current song 
let playSong = (track , pause = false)=>{
  //by this is not running as currentsrc so only src by work
  //  currentSong.currentSrc = "/songs/" + track;
   currentSong.src = "/songs/" + track;
   if(!pause){
     currentSong.play();
     play_button.src = "./img/pause-svg-com.svg";
   }
   document.querySelector(".song_info").innerHTML = track;
  //  if there encoded song to decoded then do as
  //  document.querySelector(".song_info").innerHTML = decodeURI(track);

   document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
}


async function main() {

  // ****************** get all of the songs ****************
 audio = await getSongs();
  console.log(audio);


// ********** when webpage relods if want to show show some songs in playbar then do as *******************
   playSong(audio[0],true);


  // ******************* show all songs in playlist **********************
   let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
  for(const song of audio){
    // this from get songs of all in songlist
    // songUL.innerHTML = songUL.innerHTML + song;
    // this from get songs in list tag so line by line 
    // songUL.innerHTML = songUL.innerHTML + `<li>${song}</li>`;
    // if found any tag or %20 for place of instead space then it replace by with space as `<li>${song.replace("%20"," ")}` ;
    // as for all tag or %20 for place of instead space then it replace by with space as `<li>${song.replace("%20"," ")}` ; 
    // after this designed for cards.
    // then there in this songul change card to show up
    songUL.innerHTML = songUL.innerHTML + `<li>   <img src="./img/music-svg.svg" alt="svg for music">
                        <div class="song-list-info">
                            <div>${song.replace("%20-%20"," ")}</div>
                            <div>JK</div>
                        </div>
                         <div class="play-now-song-list">
                        <img class="invert" src="./img/play button.png" alt="play button">
                        <div>play now</div>
                    </div> </li> ` ;
    
  }
  
  // playing third song
  // var ad = new Audio(audio[2]);
  // ad.play();

  // this form get duration , source, current time .
  // ad.addEventListener("loadeddata", () => {  
  //   console.log(ad.duration , ad.currentSrc , ad.currentTime);
  // });

// ******************** attach event listener to each song *********************
  Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click",element=>{
      //
          console.log(e.querySelector(".song-list-info").firstElementChild.innerHTML);
          // adding funtion for play that song 
          playSong(e.querySelector(".song-list-info").firstElementChild.innerHTML.trim());
    })
 });

    //  attach event listener to next, play, and previous
    // ******************** for pause and play functioning add to play button in seek bar of id using play-button and there also corresponding svg's ***********
    play_button.addEventListener("click",()=>{ 
      console.log("click");
      if(currentSong.paused){
         currentSong.play();
         // there is showing error of  play-button.src = "pause-svg-com.svg" as there show to expected token due to variable name play-button containing a hyphen (-), which is not allowed in JavaScript variable names. Hyphens are interpreted as subtraction operators, leading to a syntax error.
         play_button.src = "./img/pause-svg-com.svg"
      }
      else{
        currentSong.pause();
        play_button.src = "./img/play button.png"
      }
    })
    
    // ****************** update time event song for function using timeupdate event *****************
    currentSong.addEventListener("timeupdate",()=>{
      // console.log(currentSong.currentTime, currentSong.duration);
      document.querySelector(".song-time").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
      // movable circle in seek bar for doing a css style in add it changing it left position 
      document.querySelector(".circle-seek-bar").style.left = (currentSong.currentTime / currentSong.duration)* 99 + "%" ; 
      
    })

     //*******************  adding event listener to seek bar ***********
     document.querySelector(".seek-bar-info").addEventListener("click",(e)=>{

      let percent =  (e.offsetX/e.target.getBoundingClientRect().width) * 99;

      // console.log(e);
      // console.log(e.target , e.offsetX);
      console.log(e.target.getBoundingClientRect().width, e.offsetX);
      // from dom rect to click as  % of offset x / width of getbounclientrect
      document.querySelector(".circle-seek-bar").style.left = percent +"%";
    // current time of song be change as and divide by 100 so current time in seconds be get
    currentSong.currentTime = (currentSong.duration * percent) / 100;
    })

    // ***************** adding hamburger menu to open ***************
    document.querySelector(".hamburger_menu").addEventListener("click",()=>{
      document.querySelector(".left-side").style.left = "0%";
      console.log("click");
    })
 
    //************** adding hamburger menu to remove  ************** 
    document.querySelector(".cross_close_svg").addEventListener("click",()=>{
      document.querySelector(".left-side").style.left = "-100%";
      console.log("click");
    })

    // adding next and previous 
    // ****************** for previous ******************* 

    document.querySelector("#previous_button").addEventListener("click",()=>{
      console.log("previous");
      // console.log(currentSong.src);
      // console.log(currentSong.src.split("/").slice(-1));
      
      // console.log(audio);

      let index = audio.indexOf(currentSong.src.split("/").slice(-1)[0]);

      // console.log(audio.indexOf(currentSong.src.split("/").slice(-1)[0]);
      if(index-1 >= 0){
        playSong(audio[index-1]);
      }
    })


    // ************ for next  ***************** 
    document.querySelector("#next_button").addEventListener("click",()=>{
      console.log("next");
      // console.log(currentSong.src.split("/").slice(-1))[0];
      // console.log(audio);

       // from this get known of song index which current is being played from song list i.e audio . there split src so that song name.mp3 part from this get y silce(-1) method and then indexOf method using to get known of this index.
      let index = audio.indexOf(currentSong.src.split("/").slice(-1)[0]);
      // console.log(audio,index);
      // if(index+1 > length){
      //   playSong(audio[index+1]);
      // }
      // console.log(audio,audio[index+1]);
      if(index+1 < audio.length){
          playSong(audio[index+1]);
        }
    })
    
    
    // ********* volume audio ************
    document.querySelector(".volume-audio").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
      // console.log("changed volume",e , e.target , e.target.value);
      // this volume be set between 0 to 1 . 
      currentSong.volume = parseInt(e.target.value)/ 100 ;
    })
      

}

main();
