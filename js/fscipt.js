let currentSong = new Audio();

let audio;

let currFolder;

// function for formate time of second into minute::second
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad with zero if less than 10
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  // Return the formatted time
  return `${paddedMinutes}:${paddedSeconds}`;
}

async function getSongs(folder) {
  currFolder = folder;
  
  let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
  let res = await a.text();
  
  let div = document.createElement("div");
  
  div.innerHTML = res;
  
  let as = div.getElementsByTagName("a");
  
  audio = [];
  for (let index = 1; index < as.length; index++) {
    let element = as[index];
    if (element.href.endsWith(".mp3")) {
      audio.push(element.href.split(`/${folder}/`)[1]);
      
    }
  }

  // ******************* show all songs in playlist **********************
  let songUL = document
    .querySelector(".song-list")
    .getElementsByTagName("ul")[0];
  

  songUL.innerHTML = "";
  for (const song of audio) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>   <img src="./img/music-svg.svg" alt="svg for music">
                          <div class="song-list-info">
                             
                              <div>${song
                                .replaceAll("%20", " ")}</div>
                              <div>JK</div>
                          </div>
                           <div class="play-now-song-list">
                          <img class="invert" src="./img/play-svgrepo-com.svg" alt="play button">
                          <div>play now</div>
                      </div> </li> `;
  }

  // ******************** attach event listener to each song *********************
  Array.from(
    document.querySelector(".song-list").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
    

      playSong(
        e.querySelector(".song-list-info").firstElementChild.innerHTML.trim()
      );
    });
  });
  
  return audio; 
}

// current song
let playSong = (track, pause = false) => {
  currentSong.src = `/${currFolder}/` + track;
  
  if (!pause) {
    currentSong.play();
    play_button.src = "./img/pause-circle-svgrepo-com.svg ";
   
  }


  document.querySelector(".song_info").innerHTML = decodeURI(track);
  
  document.querySelector(".song-time").innerHTML = "00:00 / 00:00";


  
};


async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:5500/songs/`);
  let res = await a.text();

  let div = document.createElement("div");
  div.innerHTML = res;

  let all_a = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".card-collection");

  let array = Array.from(all_a);

  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("/songs/")) {
      let album_folder = e.href.split("/").slice(-1)[0];
      

      let a = await fetch(
        `http://127.0.0.1:5500/songs/${album_folder}/info.json`
      );
      let res = await a.json();
      
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        `<div data-folder=${album_folder}  class="card flex ">
                    <img src="songs/${album_folder}/cover.jpg" alt="image">
                   <span class="text-decoration white-color">${res.title}</span> 
                     <span class="text-color font-size">${res.description}</span>
                    <div class="play-button"></div>
                </div>`;
    }
    
  }

  // ************ load playlist when card is clicked *************

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      
      audio = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      
      playSong(audio[0]); 
    });
  });
}

async function main() {
  // ****************** get all of the songs ****************

  await getSongs("songs/pushpa");

  // ********** when webpage relods if want to show show some songs in playbar then do as *******************
  playSong(audio[0], true);

  displayAlbums();

  // ******************** for pause and play functioning add to play button in seek bar of id using play-button and there also corresponding svg's ***********
  play_button.addEventListener("click", () => {
    
    if (currentSong.paused) {
      currentSong.play();

      play_button.src = "./img/pause-circle-svgrepo-com.svg";
    } else {
      currentSong.pause();
      play_button.src = "./img/play-svgrepo-com.svg ";
    }
  });

  // ****************** update time event song for function using timeupdate event *****************
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".song-time").innerHTML = `${formatTime(
      currentSong.currentTime
    )} / ${formatTime(currentSong.duration)}`;

    document.querySelector(".circle-seek-bar").style.left =
      (currentSong.currentTime / currentSong.duration) * 99 + "%";
  });

  //*******************  adding event listener to seek bar ***********
  document.querySelector(".seek-bar-info").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 99;

    

    document.querySelector(".circle-seek-bar").style.left = percent + "%";

    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // ***************** adding hamburger menu to open ***************
  document.querySelector(".hamburger_menu").addEventListener("click", () => {
    document.querySelector(".left-side").style.left = "0%";
  });

  //************** adding hamburger menu to remove  **************
  document.querySelector(".cross_close_svg").addEventListener("click", () => {
    document.querySelector(".left-side").style.left = "-100%";
  });

  // adding next and previous
  // ****************** for previous *******************

  document.querySelector("#previous_button").addEventListener("click", () => {
    currentSong.pause();
    

    let index = audio.indexOf(currentSong.src.split("/").slice(-1)[0]);

    if (index - 1 >= 0) {
      playSong(audio[index - 1]);
    }
  });

  // ************ for next  *****************
  document.querySelector("#next_button").addEventListener("click", () => {
    currentSong.pause();
    

    let index = audio.indexOf(currentSong.src.split("/").slice(-1)[0]);
    
    if (index + 1 < audio.length) {
      playSong(audio[index + 1]);
    }
  });

  // ********* volume audio ************
  document
    .querySelector(".volume-audio")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = parseInt(e.target.value) / 100;
    });

  // add event listener to volume button for mute the track
  document
    .querySelector(".volume-audio > img")
    .addEventListener("click", (e) => {
      

      // if(e.target.src == "volume-audio.svg"){
      if (e.target.src.includes("volume-audio.svg")) {
        //  e.target.src.replace("volume-audio.svg","volume-mute-fill.svg");
        e.target.src = e.target.src.replace(
          "volume-audio.svg",
          "volume-mute-fill.svg"
        );
        currentSong.volume = 0;
        document
          .querySelector(".volume-audio")
          .getElementsByTagName("input")[0].value = 0;
      } else {
        e.target.src = e.target.src.replace(
          "volume-mute-fill.svg",
          "volume-audio.svg"
        );
        currentSong.volume = 0.1;
        document
          .querySelector(".volume-audio")
          .getElementsByTagName("input")[0].value = 20;
      }
    });
}

main();
