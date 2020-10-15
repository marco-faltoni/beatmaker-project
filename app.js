class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentKick = './allSounds/kick-classic.wav';
        this.currentSnare = './allSounds/snare-acoustic01.wav';
        this.currentHihat = './allSounds/hihat-acoustic01.wav';
        this.kickaudio = document.querySelector('.kick-sound');
        this.snareaudio = document.querySelector('.snare-sound');
        this.hihataudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 200;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select'); 
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
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
                    this.kickaudio.currentTime = 0;
                    this.kickaudio.play();
                }
                if(bar.classList.contains('snare-pad')) {
                    this.snareaudio.currentTime = 0;
                    this.snareaudio.play();
                }
                if(bar.classList.contains('hihat-pad')) {
                    this.hihataudio.currentTime = 0;
                    this.hihataudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        // check if it's playing
        if (!this.isPlaying){
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            // clear the interval
            clearInterval(this.isPlaying);
            // reset the varaible isPlaying
            this.isPlaying = null;
        }
    }
    updateBtn() {
        if(!this.isPlaying){
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
        
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        console.log(selectionName, selectionValue);
        switch(selectionName) {
            case 'kick-select':
                this.kickaudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareaudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihataudio.src = selectionValue;
                break;
        }
    }
    mute(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        if(e.target.classList.contains('active')){
            switch(muteIndex){
                case '0':
                    this.kickaudio.volume = 0;
                    break;
                case '1':
                    this.snareaudio.volume = 0;
                    break;
                case '2':
                    this.hihataudio.volume = 0;
                    break;
            }
        } else {
            switch(muteIndex){
                case '0':
                    this.kickaudio.volume = 1;
                    break;
                case '1':
                    this.snareaudio.volume = 1;
                    break;
                case '2':
                    this.hihataudio.volume = 1;
                    break;
            }
        }
    }

    changeTempo(e){
        const tempoText = document.querySelector('.tempo-nr');
        tempoText.innerText = e.target.value;
    }
    updateTempo(e){
        // set new value for bpm
        this.bpm = e.target.value;

        // clear the interval
        clearInterval(this.isPlaying);

        // reset the varaible isPlaying
        this.isPlaying = null;

        // catch the play button
        const playBtn = document.querySelector('.play');

        // if the music is stopped then start it with the new bpm value
        if (playBtn.classList.contains('active')) {
            this.start();
        }
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
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
});