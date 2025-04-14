Just using remote files as locally to access song using this to play songs, further providing cover image and description in json format show it playlist. 

There some mistake and learning that i do for this. 
 why height doesn't work with percentages (%) in some situations
  If the height of the parent element (the containing block) is auto or undefined, there’s no reference for the percentage, so the browser cannot apply the percentage value.


  for javascript write as 
 -->) function for getsongs
  -> doing a firstly fetching api or your file of mp3 as accessing in url port/folder name .(there songs folder is using and according logic write)
  -> making a varibale storing this api 
  -> then new variable storing a table format data get by  await a.text() method.
  -> this make in function and as also async .
  -> next table in data for all songs that get parse them.
  -> create a new div in js using dom as document.createElement("div") . it store 
  ->  next storing variable name make it them response as div.innerHTML = pass that text() method .
  -> to check element of store songs access it by dom as tagname and it store also like a (attribute in there a having href)
  -> there for loop using make access this all a index . in there taken only those that ends with .mp3 . element.href.endswith(".mp3"). it store them in empty array so push this in array.
  -> then return this 
 
  -> there in main function access this getsongs function 
  -> write method for audio play using audio method and store in some variable . then it play using audio.play();
  
  _->) as making cards in library list showing all songs.
  -> there in event listener that add in (loadeddata) event apply , after that from this duration , current src , current time apply . from this get hold durations in seconds of audio clip  
  -> in there in index.html after library element in add cards. after that in javascript file select that element of songlist there in which all songs placed select that element . 
  -> by forof loopusing there songs of select in innerhtml in songs.innerhtml append songs . so all songs in there in display and append goes by.
  this not show good so do in li template literal apply <li> ${songs} </li> ;
  as get list by list songs 
  -> for songs url not get this for do a in songs that get from href there in that function add .split("/songs/")[1] it's mean give array of two before songs and after songs . there in after songs take .
  -> there %20 for encoded to replace by ""(space) as for all %20 to remove to removeall get songs as all.
  -> then in designed html and css using having music logo ul in li. then div in info having song name and song artist. and designed also . there in right side musicbar also fixed and all these stuff done after do . 
  -> then in main where all write function do a this li paste song.innerHTML in append this li so actually these get played songs in library .
  -> then do selection for play songs 

  -*************** ctrl + shift R for hard relod
  -***************  as adding webpage title favicon .ico ( add as->   <link rel="icon" href="favicon.ico" type="image/x-icon"/> )   

.--> ) as per selection after a songs it play as
--> in playbar making a seek bar also 
  -> there for do a in html making a box of playbar width and height as adjust.
  -> there after making that seek bar and in there circle then do js
  -> having current song and play that song 
  -> making array in document to select from one song then it play 
     -> selecting a li tag in there then applying loop in adding event listener for clik and function responding to playmusic variable in document by info selecting of first element as firstelementchild of inner html and trim it due to neglecting in space for not create problem.
     -> as function of play music make taking argument then making currentsong.src = /songs/" + track and then currentsong.play() .
     -> currentsong defined in main as global.
     -> there in play, next , previous for these make logic to pause and play songs . there is paused function for pause the song 
     -> there adding in playsong function in pause svg and then song-info and song time.
     -> using time event update function for current time of play songs 
     -> there also functionality add when page relods then want some song in there shows then do as {playSong(audio[0])} . 
     -> making seek bar in circle movable so do left move . there this done using javascript . this done in style property of this currentsong of current time divide by currentsong o duration with multiply of 100 and adding % for apply it.
     -> making a seek bar for work . in this adding a event listener to it and this function in set offset x , target . there is getboundingclientReact helo in function for reacting in page where it is. this help in getting known of bottom , height , left , right , top , width , x , y. there after of this duration of song time also do current as current time . 
     -> there after all responsive and making hamburger and close . there javascript be added there 
     -> as making previous and next button 
      -> adding event listeners on click function on these and there be global variable having of song list i.e we given or some contain as in audio.
      -> there taken a current song mp3 part and then by index using play it next or previous condition based on condition that if it last song then it there not next and if it first song then it not be previous song. 
      -> word break is useful when words is taking more in length.as it css property
      -> for volume in there add svg and input tag with type range then get seek bar input.

-->) doing ctrl+f is better to find something rather than scrolling than.

-->) there making after all these and responsive there doing a album, songs 
               as better ,  there is doing in multiple album and library in all songs be there.
   -> in folder there is particular album and from that images loaded from there.
   -> there songs write in song function folder passing and there songs replace with that folder 

-->) The data-* attribute is used to store custom data private to the page or application.
-->) The stored (custom) data can then be used in the page's JavaScript to create a more engaging user experience (without any Ajax calls or server-side database queries).

-->) in getsongs function return audio is help for default play of first song when album is clicked . this also resolve of problem of not show error in next and previous button that indexOf is not defined.
