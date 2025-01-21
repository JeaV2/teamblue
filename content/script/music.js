document.addEventListener('DOMContentLoaded', function () {
    let currentAudio = document.getElementById("myAudio");
    let indexAudio = 0;
    let listAudio = [
      {
        name: "Hoe Cakes",
        file: "../../content/music/Hoe Cakes.mp3",
        duration: "3:54",
        album: "MM..FOOD",
        artist: "MFDOOM",
        albumArt: "../../content/img/album/hoecakes.jpg"
      },
      {
        name: "One Beer",
        file: "../../content/music/One Beer.mp3",
        duration: "4:18",
        album: "MM..FOOD",
        artist: "MFDOOM",
        albumArt: "../../content/img/album/hoecakes.jpg"
      },
      {
        name: "Potato Salad",
        file: "../../content/music/Potato Salad.mp3",
        duration: "3:15",
        album: "potatosalad",
        artist: "Tyler, The Creators",
        albumArt: "../../content/img/album/potatosaladcover.jpg"
      }
    ];
  
    let queue = [];
  
    // Function to load a new track
    function loadNewTrack(index) {
      let track = listAudio[index];
      document.querySelector('#source-audio').src = track.file;
      document.querySelector('.title').innerHTML = track.name;
      document.getElementById('album-art').src = track.albumArt || '/content/img/music/mmfood.jpg';
      currentAudio.load();
      currentAudio.pause();
      updatePlayButton();
      updateTimerDisplay(); // Reset timer display when a new track is loaded
      updateProgressBar();  // Reset progress bar when a new track is loaded
    }
  
    // Update play/pause button
    function updatePlayButton() {
      let playIcon = document.getElementById("icon-play");
      let pauseIcon = document.getElementById("icon-pause");
  
      if (currentAudio.paused) {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      } else {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      }
    }
  
    window.toggleAudio = function () {
      if (currentAudio.paused) {
        currentAudio.play();
      } else {
        currentAudio.pause();
      }
      updatePlayButton();
    };
  
    // Add track to queue
    function addToQueue(track) {
      queue.push(track);
      updateQueueDisplay();
    }
  
    // Remove track from queue
    window.removeFromQueue = function(index) {
      queue.splice(index, 1);  // Remove the song from the queue at the given index
      updateQueueDisplay();  // Update the queue display after removal
    };
  
    // Update the queue display
    function updateQueueDisplay() {
      const queueContainer = document.querySelector('.queue-ctn');
      queueContainer.innerHTML = '<h3>Queue</h3>'; // Reset queue display
      queue.forEach((track, index) => {
        let queueItem = document.createElement('div');
        queueItem.classList.add('queue-item');
        queueItem.innerHTML = `  
          <div class="queue-info">
            <img src="${track.albumArt}" alt="${track.album}" class="album-cover">
            <div class="playlist-info-track">
              <div>${track.name}</div>
              <div>${track.artist}</div>
            </div>
          </div>
          <div class="queue-duration">${track.duration}</div>
          <button class="remove-btn" onclick="removeFromQueue(${index})">Remove</button>
        `;
        queueContainer.appendChild(queueItem);
      });
    }
  
    // Adding event listener to playlist
    listAudio.forEach((track, index) => {
      let trackItem = document.createElement('div');
      trackItem.classList.add('playlist-track-ctn');
      trackItem.dataset.index = index;
  
      trackItem.innerHTML = `
        <img src="${track.albumArt}" alt="${track.album}" class="album-cover">
        <div class="playlist-info-track">
          <div>${track.name}</div>
          <div>${track.artist}</div>
        </div>
        <div class="playlist-duration">${track.duration}</div>
        <button class="add-to-queue-btn">Add to Queue</button> <!-- Add button here -->
      `;
  
      // Add event listener to the "Add to Queue" button
      trackItem.querySelector('.add-to-queue-btn').addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent song from playing immediately
        addToQueue(track);   // Add song to queue
      });
  
      trackItem.addEventListener("click", () => {
        indexAudio = index;
        loadNewTrack(indexAudio);
        document.querySelectorAll('.playlist-track-ctn').forEach(item => {
          item.classList.remove('active-track');
        });
        trackItem.classList.add('active-track');
      });
  
      document.querySelector('.playlist-ctn').appendChild(trackItem);
    });
  
    // Initialize the player
    loadNewTrack(indexAudio);
  
    // ** Song Timer **
    currentAudio.addEventListener('timeupdate', function() {
      updateTimerDisplay();
      updateProgressBar();
    });
  
    // Update the timer display
    function updateTimerDisplay() {
      const timerDisplay = document.querySelector('.timer');
      let currentTime = currentAudio.currentTime;
      let duration = currentAudio.duration;
  
      // Format the time as minutes:seconds
      let currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      let durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
  
      currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
      currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
      durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;
      durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;
  
      timerDisplay.innerHTML = `${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`;
    }
  
    // ** Progress Bar **
    function updateProgressBar() {
      let progressBar = document.getElementById('myBar');
      let progress = (currentAudio.currentTime / currentAudio.duration) * 100;
      progressBar.style.width = progress + "%";
    }
  
    // Add event listener to progress bar to allow seeking
    document.getElementById('myProgress').addEventListener('click', function(e) {
      const progressBar = document.getElementById('myBar');
      const clickPosition = e.offsetX / this.offsetWidth;
      currentAudio.currentTime = clickPosition * currentAudio.duration;
      updateProgressBar();
    });
  
  
    currentAudio.addEventListener('ended', function() {
      if (queue.length > 0) {
        // Get the next track from the queue
        let nextTrack = queue.shift(); // Remove the first item from the queue
        indexAudio = listAudio.findIndex(track => track.name === nextTrack.name); // Get index of the next track from listAudio
        loadNewTrack(indexAudio);  // Load the new track
        currentAudio.play(); // Start playing the new track
        updateQueueDisplay(); // Update the queue display
      }
    });
  });
  