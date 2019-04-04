class BugSquishSound {
    /**
     * 
     * @param {string} squishSoundPath 
     * @param {Trigger} bugSquishTrigger 
     */
    constructor(squishSoundPath, bugSquishTrigger) {
        const sound = new Tone.Player(squishSoundPath);
        sound.toMaster();

        bugSquishTrigger.subscribe(() => {
            if (sound.state !== 'started') {
                sound.start();
            }
        });
    }
}