// in there code previous of script.js and code for album accesing then click on that there songs load in library and when click on that songs album there first song be played from that playlist.

let currentSong = new Audio();
// making it global for accessing it all songs;
let audio;
// 6
let currFolder;

// function for formate time of second into minute::seconds
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

// function for get songs as intial from code to write start here.
// there get-songs be load folder , in which folder to use and load that only
//1.)
async function getSongs(folder) {
  // 7
  currFolder = folder;
  let a = await fetch(`http://127.0.0.1:5500/${folder}`);
  console.log(a);
  let res = await a.text();

  let div = document.createElement("div");
  div.innerHTML = res;

  let as = div.getElementsByTagName("a");

  audio = [];
  for (let index = 1; index < as.length; index++) {
    let element = as[index];
    if (element.href.endsWith(".mp3")) {
      //2
      // in there change of songs with folder
      audio.push(element.href.split(`/${folder}/`)[1]);
    }
  }

  //15 adding show all songs in playlist and attach event listener to each song
  // 16 in this there is happening that in when click on this album then there appendation between these folder happen when click on then. to correct this there ul in left side of song-list be empty so do that.
  // ******************* show all songs in playlist **********************
  let songUL = document
    .querySelector(".song-list")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = ""; // 17 as emptying ul not append happen b/w folders . after dynamically show all forlder doing that write code in main .19
  for (const song of audio) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>   <img src="./img/music-svg.svg" alt="svg for music">
                          <div class="song-list-info">
                              <div>${song.replace("%20-%20", " ")}</div>
                              <div>JK</div>
                          </div>
                           <div class="play-now-song-list">
                          <img class="invert" src="./img/play button.png" alt="play button">
                          <div>play now</div>
                      </div> </li> `;
  }

  // ******************** attach event listener to each song *********************
  Array.from(
    document.querySelector(".song-list").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(
        e.querySelector(".song-list-info").firstElementChild.innerHTML
      );
      // adding funtion for play that song
      playSong(
        e.querySelector(".song-list-info").firstElementChild.innerHTML.trim()
      );
    });
  });

  //   return songs;
}

// current song
let playSong = (track, pause = false) => {
  // 3 in there change of songs with folder
  currentSong.src = `/${currFolder}/` + track; //8
  //   console.log(currentSong.src , track);
  if (!pause) {
    currentSong.play();
    play_button.src = "./img/pause-svg-com.svg";
  }
  document.querySelector(".song_info").innerHTML = track;

  document.querySelector(".song-time").innerHTML = "00:00 / 00:00";
};

// 20
async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:5500/songs/`);
  let res = await a.text();

  let div = document.createElement("div");
  div.innerHTML = res;
  // console.log(div);
  // 21
  let all_a = div.getElementsByTagName("a");
  cardContainer = document.querySelector(".card");
  // console.log(all_a);

  //28 
  let array =  Array.from(all_a);

  for (let index = 0; index < array.length; index++) {  //28
    const e = array[index]; // 28
    
  

//   Array.from(all_a).forEach(async (e) => {
    // console.log(e.href);
    // if(e.href.startWith("songs")){
    //     //  console.log(e.href);
    // }
    // 22 as getting all href having songs folder in all albums
    if (e.href.includes("/songs/")) {
      //  console.log(e.href.split("/").slice(-1)[0]); // get albums folder name
      // 23 there songs also populate. but before in there album along songs with info.json also add having title and description , and also cover image in these each albums

      let album_folder = e.href.split("/").slice(-1)[0];

      // 24 get all metadata of the folder
      // again this api like fetch use for json
      let a = await fetch(
        `http://127.0.0.1:5500/songs/${album_folder}/info.json`
      );
      let res = await a.json();
      console.log(res);
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        `<div data-folder="${album_folder}"  class="card flex ">
                    <img src="/songs/${album_folder}/cover.png" alt="image">
                   <span class="text-decoration white-color">"${res.title}"</span> 
                     <span class="text-color font-size">"${res.description}"</span>
                    <div class="play-button"></div>
                </div>`;

      //25 as there this not work so load song be populate there load playlist when card is clicked
    }
//   });    // 28

  }  //28

  //26
  // ************ load playlist when card is clicked *************

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      console.log(item, item.currentTarget.dataset);
      audio = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      playSong(audio[0]);
    });
  });

  // 27 as there .innerhtml in all these work in background as async is doing so traditional for loop is used . as asynchronously is done but there ony by one it perform so event listener to attach it.
}

async function main() {
  // ****************** get all of the songs ****************
  // there be folder so pass
  // 4  audio = await getSongs();
  await getSongs("songs/cs"); //14
  //  by just only this error,  not folder is undefined in playSongs
  //5 for this do a currfolder make for known which it open.
  //9 then show all songs in that folder
  //10 same as for cs folder is do then it happen by changing it name . but there by default 1^st album be load and when click on card then there it all songs in library will reload.
  //11 there do a card in folder name attribute add. do in html by data-set attribute as data-folder = "folder_name"

  // ********** when webpage relods if want to show show some songs in playbar then do as *******************
  playSong(audio[0], true);

  // 19 Display all the albums dynamically
  displayAlbums();

  // ******************** for pause and play functioning add to play button in seek bar of id using play-button and there also corresponding svg's ***********
  play_button.addEventListener("click", () => {
    console.log("click");
    if (currentSong.paused) {
      currentSong.play();

      play_button.src = "./img/pause-svg-com.svg";
    } else {
      currentSong.pause();
      play_button.src = "./img/play button.png";
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

    console.log(e.target.getBoundingClientRect().width, e.offsetX);

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
    console.log("previous");

    let index = audio.indexOf(currentSong.src.split("/").slice(-1)[0]);

    if (index - 1 >= 0) {
      playSong(audio[index - 1]);
    }
  });

  // ************ for next  *****************
  document.querySelector("#next_button").addEventListener("click", () => {
    console.log("next");

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

  // ************ load playlist when card is clicked *************
  // 12 for in collection not apply for each so it in array
//   Array.from(document.getElementsByClassName("card")).forEach((e) => {
    // console.log(e) // from this getting all card
    // e.addEventListener("click", async (item) => {
      // console.log(item.taget, item.target.dataset) // onwards this not get folder name when click as say it undefined . so do item.target.dataset
      //    audio = await getSongs(`songs/${item.dataset.folder}`);
      // currentTarget event take for clicked event that part take not target
      // using target on click image get image as on clicked event get from clicked pass . so as currenttarget from card get.
    //   console.log(item, item.currentTarget.dataset);
    //   audio = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
      // 13 as click in folder to get but songs for it populate to code also write.but it is outside so it be place in getsongs. as there show all songs in the playlist , attach an event listener to each song.
    // });
//   });
}

main();
