const propresControl = require('./');

propresControl.open();

let index = 0;
setInterval(function(){
    // propresControl.selectPlaylist((index ++ % 3) + 1);
    // propresControl.selectPlaylistItem((index ++ % 3) + 1);
    propresControl.triggerSlide((index ++ % 3) + 1);

    // propresControl.selectMediaPlaylist(1);

}, 3000);
