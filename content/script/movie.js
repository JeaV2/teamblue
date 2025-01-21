document.addEventListener('DOMContentLoaded', function () {

    let posters = document.querySelectorAll('.poster-item');
    let main = document.querySelector('main.item');
    let posterGallery = document.querySelector('.posters');

    posters.forEach(function (poster) {
        poster.addEventListener('click', function () {

            let movieSrc = poster.getAttribute('data_movie');

            let videoPlayer = document.createElement('div');
            videoPlayer.innerHTML = 
                `<video controls autoplay style="width: 100%; max-height: 80vh;">
                    <source src="${movieSrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <button id="close-video" style="margin-top: 10px; padding: 10px 20px; background: #f00; color: #fff; border: none; cursor: pointer;" aria-label="Close video">
                    Close
                </button>`;

            posterGallery.style.display = 'none';
            main.innerHTML = '';
            main.appendChild(videoPlayer);

            let closeButton = document.getElementById('close-video');
            closeButton.addEventListener('click', function () {
       
                posterGallery.style.display = 'flex';
                
         
                main.innerHTML = ''; 
                main.appendChild(posterGallery); 
            });
        });
    });
});
