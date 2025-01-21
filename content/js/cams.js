
    function openCameraFeed(feed) {
        // Toggle the 'open' class to enlarge the video
        if (feed.classList.contains('open')) {
            feed.classList.remove('open');
        } else {
            // Close any previously opened feeds
            const allFeeds = document.querySelectorAll('.camera-feed');
            allFeeds.forEach(f => f.classList.remove('open'));

            feed.classList.add('open');
        }
    }

