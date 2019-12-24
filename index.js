const midi = require('midi');

// Set up a new output
const deviceName	= 'ProPresenter Control';
const output = new midi.output();

/**
 * All commands and their offset to control ProVideoPlayer
 * @type {{ClearAll: number, SelectLook: number, Pause: number, DisableMask: number, PreviousCue: number, EnableMask: number, ClearLayer: number, PreviousPlaylist: number, TriggerCue: number, NextPlaylist: number, Rewind: number, PlayPause: number, GoToEnd: number, NextCue: number, GoToBeginning: number, Play: number, ClearTextStream: number, DisableEffect: number, FastForward: number, SelectLayer: number, EnableEffect: number, SelectPlaylist: number}}
 */
const Command = {
    /* Clear Commands */
    ClearAll: 0,
    ClearSlide: 1,
    ClearBackground: 2,
    ClearProps: 3,
    ClearAudio: 4,
    ClearLogo: 5,

    /* Video Controls */
    GoToBeginning: 6,
    PlayPause: 7,
    Play: 8,
    Pause: 9,

    /* Presentation Actions */
    NextPlaylistItem: 10,
    PreviousPlaylistItem: 11,
    NextSlide: 12,
    PreviousSlide: 13,
    StartTimeline: 14,
    StopTimeline: 15,
    RewindTimeline: 16,

    /* Select by Index */
    SelectPlaylist: 17,
    SelectPlaylistItem: 18,
    TriggerSlide: 19,
    SelectMediaPlaylist: 20,
    TriggerMedia: 21,
    SelectAudioPlaylist: 22,
    TriggerAudio: 23,
    ToggleProp: 24,
    StartTimer: 25,
    StopTimer: 26,
    ResetTimer: 27,
};

/**
 * Offset set in ProVideoPlayer
 * @type {number}
 */
let commandOffset = 0;

/**
 *
 * @param {number} offset
 */
function setNoteOffset(offset)
{
    commandOffset = setNoteOffset;
}

/**
 * Execute a PVP Command
 * @param {number} command
 * @param {number} arg1
 */
function executeCommand(command, arg1)
{
    sendNote(true, 1, commandOffset + command, arg1);
}

/**
 * Send a MIDI note
 * @param {boolean} noteOn
 * @param {number} channel
 * @param {number} note
 * @param {number} velocity
 */
function sendNote(noteOn, channel, note, velocity)
{
    if(velocity === undefined)
        velocity = 1;

    let a = 127 + (noteOn ? 16 : 0) + channel;
    let b = note;
    let c = velocity;
    let message = [a, b, c];

    console.log(message);
    output.sendMessage(message);
}

/**
 * Clear all layers
 */
function clearAll()
{
    executeCommand(Command.ClearAll);
}

/**
 * Clear slide layer
 */
function clearSlide()
{
    executeCommand(Command.ClearSlide);
}

/**
 * Clear background layer
 */
function clearBackground()
{
    executeCommand(Command.ClearBackground);
}

/**
 * Clear props layer
 */
function clearProps()
{
    executeCommand(Command.ClearProps);
}

/**
 * Clear audio layer
 */
function clearAudio()
{
    executeCommand(Command.ClearAudio);
}

/**
 * Clear logo layer
 */
function clearLogo()
{
    executeCommand(Command.ClearLogo);
}


/**
 *
 */
function videoGoToBeginning()
{
    executeCommand(Command.GoToBeginning);
}

/**
 * Play/pause the current video
 */
function videoPlayPause()
{
    executeCommand(Command.PlayPause);
}

/**
 * Play the current video
 */
function videoPlay()
{
    executeCommand(Command.Play);
}

/**
 * Pause the current video
 */
function videoPause()
{
    executeCommand(Command.Pause);
}


/**
 * Open the next playlist item
 */
function nextPlaylistItem()
{
    executeCommand(Command.NextPlaylistItem);
}

/**
 * Open the previous playlist item
 */
function previousPlaylistItem()
{
    executeCommand(Command.PreviousPlaylistItem);
}

/**
 * Trigger the next slide
 */
function nextSlide()
{
    executeCommand(Command.NextSlide);
}

/**
 * Trigger the previous slide
 */
function previousSlide()
{
    executeCommand(Command.PreviousSlide);
}

/**
 * Start the timeline
 */
function startTimeline()
{
    executeCommand(Command.StartTimeline);
}

/**
 * Stop the timeline
 */
function stopTimeline()
{
    executeCommand(Command.StopTimeline);
}

/**
 * Rewind the timeline
 */
function rewindTimeline()
{
    executeCommand(Command.RewindTimeline);
}


/**
 * Select a specific playlist
 * @param {number} playlistIndex
 */
function selectPlaylist(playlistIndex)
{
    executeCommand(Command.SelectPlaylist, playlistIndex);
}

/**
 * Select a specific item in the playlist
 * @param {number} itemIndex
 */
function selectPlaylistItem(itemIndex)
{
    executeCommand(Command.SelectPlaylistItem, itemIndex);
}

/**
 * Trigger a specific slide in the current playlist
 * @param {number} slideIndex
 */
function triggerSlide(slideIndex)
{
    if(slideIndex <= 0)
        return;

    executeCommand(Command.TriggerSlide, slideIndex);
}

/**
 * Select a specific media (Video/Image) playlist
 * @param {number} playlistIndex
 */
function selectMediaPlaylist(playlistIndex)
{
    executeCommand(Command.SelectMediaPlaylist, playlistIndex);
}

/**
 * Trigger a specific item in the media (Video/Image) playlist
 * @param {number} mediaIndex
 */
function triggerMedia(mediaIndex)
{
    executeCommand(Command.TriggerMedia, mediaIndex);
}

/**
 * Select a specific audio playlist
 * @param {number} audioIndex
 */
function selectAudioPlaylist(audioIndex)
{
    executeCommand(Command.SelectAudioPlaylist, audioIndex);
}

/**
 * Trigger a specific item in the audio playlist
 * @param {number} audioIndex
 */
function triggerAudio(audioIndex)
{
    executeCommand(Command.TriggerAudio, audioIndex);
}

/**
 * Toggle a prop on/off
 * @param {number} propIndex
 */
function toggleProp(propIndex)
{
    executeCommand(Command.ToggleProp, propIndex);
}


/**
 * Start a timer
 * @param {number} timerIndex
 */
function startTimer(timerIndex)
{
    executeCommand(Command.StartTimer, timerIndex);
}

/**
 * Stop a timer
 * @param {number} timerIndex
 */
function stopTimer(timerIndex)
{
    executeCommand(Command.StopTimer, timerIndex);
}

/**
 * Reset a timer
 * @param {number} timerIndex
 */
function resetTimer(timerIndex)
{
    executeCommand(Command.ResetTimer, timerIndex);
}

/**
 * Open connection for ProPresenter to connect to
 */
function open()
{
    output.openVirtualPort(deviceName);
}

/**
 * Close connection to ProPresenter
 */
function close()
{
    // Close the port when done.
    output.closePort();
}


// Configuration
exports.open = open;
exports.close = close;
exports.setNoteOffset = setNoteOffset;

// Clear Commands
exports.clearAll = clearAll;
exports.clearSlide = clearSlide;
exports.clearBackground = clearBackground;
exports.clearProps = clearProps;
exports.clearAudio = clearAudio;
exports.clearLogo = clearLogo;

// Video Controls
exports.videoGoToBeginning = videoGoToBeginning;
exports.videoPlayPause = videoPlayPause;
exports.videoPlay = videoPlay;
exports.videoPause = videoPause;

// Presentation Actions
exports.nextPlaylistItem = nextPlaylistItem;
exports.previousPlaylistItem = previousPlaylistItem;
exports.nextSlide = nextSlide;
exports.previousSlide = previousSlide;
exports.startTimeline = startTimeline;
exports.stopTimeline = stopTimeline;
exports.rewindTimeline = rewindTimeline;

// Select by Index
exports.selectPlaylist = selectPlaylist;
exports.selectPlaylistItem = selectPlaylistItem;
exports.triggerSlide = triggerSlide;
exports.selectMediaPlaylist = selectMediaPlaylist;
exports.triggerMedia = triggerMedia;
exports.selectAudioPlaylist = selectAudioPlaylist;
exports.triggerAudio = triggerAudio;
exports.toggleProp = toggleProp;
exports.startTimer = startTimer;
exports.stopTimer = stopTimer;
exports.resetTimer = resetTimer;