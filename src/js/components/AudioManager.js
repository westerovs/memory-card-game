export default class AudioManager {
  constructor(state) {
    this.state = state
    this.isAudioOn = false
  
    this.sounds = null
    this.sound = null
  }
  
  initAudio = () => {
    this.state.sound.mute = true
  
    this.sounds = {
      card: this.state.sound.add('card'),
      complete: this.state.sound.add('complete'),
      success: this.state.sound.add('success'),
      theme: this.state.sound.add('theme'),
      timeout: this.state.sound.add('timeout'),
    }
    
    const iconAudio = this.state.add.image(50, 50, 'sound-off')
    iconAudio.inputEnabled = true
    iconAudio.events.onInputDown.add(() => this.onAudioHandler(iconAudio))
  }
  
  onAudioHandler = (iconAudio) => {
    this.isAudioOn = !this.isAudioOn
    
    if (this.isAudioOn) iconAudio.loadTexture('sound-on')
    else iconAudio.loadTexture('sound-off')
    
    this.createSounds()
  }
  
  createSounds = () => {
    if (this.isAudioOn && !this.sounds.theme.isPlaying) {
      this.sounds.theme.play()
      this.sounds.theme.volume = 0.05
      this.state.sound.mute = false
    } else {
      this.sounds.theme.stop()
      this.state.sound.mute = true
    }
  }
}
