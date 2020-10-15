class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickaudio = document.querySelector('.kick-sound');
        this.snareaudio = document.querySelector('.snare-sound');
        this.hihataudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 100;
    }
    activePad(){
        this.classList.toggle('active');
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // LOOP over the pads
        activeBars.forEach(bar =>{
            // for each pads i add an animation declared on my css
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

            // check if pads are active
            if(bar.classList.contains('active')) {

                // check each sound/pads
                if(bar.classList.contains('kick-pad')) {
                    this.kickaudio.play();
                }
                if(bar.classList.contains('snare-pad')) {
                    this.snareaudio.play();
                }
                if(bar.classList.contains('hihat-pad')) {
                    this.hihataudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        setInterval(() => {
            this.repeat();
        }, interval);
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation = '';
    });

});

drumKit.playBtn.addEventListener('click', function() {
    drumKit.start();
});