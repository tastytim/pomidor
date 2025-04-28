<template>
    <div class="container">
      <!-- Pomidor Button -->
      <img :src="pomidorImage" alt="Pomidor" class="pomidor-button" @click="startPomidor"/>
  
      <!-- YouTube URL Input -->
      <div class="form-group">
        <input v-model="youtubeUrl" placeholder="Enter YouTube URL" @change="saveUrl" class="input"/>
      </div>
  
      <!-- Settings Inputs in One Line -->
      <div class="form-row">
        <label>Pause (min):</label>
        <input type="number" v-model.number="pauseDuration" @change="saveSettings" min="1" class="input-short"/>
      </div>
  
      <div class="form-row">
        <label>Video duration (min):</label>
        <input type="number" v-model.number="videoDuration" @change="saveSettings" min="1" class="input-short"/>
      </div>
  
      <!-- Video Display -->
      <div v-if="showVideo" class="video-container">
        <iframe width="560" height="315" :src="computedYoutubeUrl" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import pomidorImage from './assets/pomidor.jpg'
  import { ref, onMounted, computed } from 'vue'
  
  const youtubeUrl = ref('')
  const pauseDuration = ref(30)
  const videoDuration = ref(5)
  const showVideo = ref(false)
  
  onMounted(() => {
    const savedUrl = localStorage.getItem('youtubeUrl')
    const savedPause = localStorage.getItem('pauseDuration')
    const savedVideo = localStorage.getItem('videoDuration')
  
    if (savedUrl) youtubeUrl.value = savedUrl
    if (savedPause) pauseDuration.value = parseInt(savedPause)
    if (savedVideo) videoDuration.value = parseInt(savedVideo)
  })
  
  const saveUrl = () => {
    localStorage.setItem('youtubeUrl', youtubeUrl.value)
  }
  
  const saveSettings = () => {
    localStorage.setItem('pauseDuration', pauseDuration.value)
    localStorage.setItem('videoDuration', videoDuration.value)
  }
  
  const computedYoutubeUrl = computed(() => {
    if (!youtubeUrl.value) return ''
    const videoId = youtubeUrl.value.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`
  })
  
  const startPomidor = () => {
    window.electronAPI.minimize()
  
    setTimeout(() => {
      window.electronAPI.fullscreen()
      showVideo.value = true
  
      setTimeout(() => {
        window.electronAPI.exitFullscreen()
        showVideo.value = false
      }, videoDuration.value * 60 * 1000)
  
    }, pauseDuration.value * 60 * 1000)
  }
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin-top: 40px;
    font-family: 'Arial', sans-serif;
  }
  
  /* Pomidor Button */
  .pomidor-button {
    width: 250px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .pomidor-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
  }
  
  /* Form */
  .form-group {
    margin: 15px 0;
  }
  
  .form-row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
  
  .form-row label {
    margin-right: 10px;
    font-weight: bold;
    min-width: 150px;
    text-align: right;
  }
  
  .input, .input-short {
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .input {
    width: 250px;
  }
  
  .input-short {
    width: 100px;
  }
  
  .input:focus, .input-short:focus {
    border-color: #ff6347;
  }
  
  .video-container {
    margin-top: 30px;
  }
  </style>
  