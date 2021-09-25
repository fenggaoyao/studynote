
export default class PixiAudio {
  _loop = false;
  _paused = false;
  _muted = false;
  _volume = 1;

  _startTime = 0;
  _lastPauseTime = 0;
  _offsetTime = 0;

  playing = false;

  constructor(src){
    this.src = src;
    this.audio = new window.Audio();
    this.audio.addEventListener('ended', this._onEnd.bind(this));
    this.audio.src = this.src;
    this.audio.preload = "auto";
    this.audio.volume = this.muted ? 0 : this.volume;
    this.audio.load();
  }

  play(pause){
    if((!pause && this.paused) || (!pause && this.playing)) return this;
    this.playing = true;
    this.audio.play();
    return this;
  }

  stop(){
    if(!this.playing) return this;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.playing = false;
    return this;
  }

  reset(){
    this._startTime = 0;
    this._lastPauseTime = 0;
    this._offsetTime = 0;
    this.playing = false;
  }

  remove(){
  }

  _onEnd(){
    if(!this.paused){
      this.reset();
    }
  }

  get paused(){return this._paused}
  set paused(value){
    if(value === this._paused)return;
    if(value){
      if(this.audio) this.audio.pause();
    }else{
      if(this.audio) this.audio.play();
      this.emit('resume');
    }
    this._paused = value;
  }

  get loop(){return this._loop}
  set loop(value){
    if(value === this._loop)return;
    this._loop = value;
    if(this.audio){
      this.audio.loop = value;
    }
  }

  get volume(){return this._volume}
  set volume(value){
    if(value === this._volume)return;
    if(this.audio) this.audio.volume = this.muted ? 0 : this.volume;
    this._volume = value;
  }

  get muted(){return this._muted};
  set muted(value){
    if(value === this._muted)return;
    this._muted = value;
    if(this.audio)this.audio.volume = this._muted ? 0 : this.volume;
  }
}
