<template>
  <div class="page-container">
    <div class="file-upload-wrapper">
      <input type="file" @change="fileChanged" multiple />
    </div>
    <div>
      <div>
        <button @click="playClick">播放blob</button><button @click="playM3u8Click">播放m3u8</button>
      </div>
      <div v-html="blobUrl"></div>
      <div>
        <video controls ref="videoPlayerEle" class="video-ele" v-show="showM3u8Player">
          <source :src="videoSrc" type="application/x-mpegURL">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'
import { getVideoBlobApi } from '../apis'

const serverPath = 'http://localhost:3100/test/';
export default{
  data(){
    return {
      m3u8VideoUrl:`${serverPath}record1.mp4`,
      showM3u8Player:false,
      videoSrc:'',
      playerOptions: {
        autoplay: false,
        controls: true,
        muted: false,
        fluid: true,
        loop: false,
        preload: 'auto',
        language: 'en',
        aspectRatio: '16:9',
        playbackRates: [0.7, 1.0, 1.25, 1.5, 2.0],
      },
      m3u8BlobUrl:'',
    }
  },
  setup(){
    const blobUrl = ref('');

    const fileChanged = (e) => {
      const url = e.target.files[0];

    }

    const playClick = async () => {
      const invokData = await getVideoBlobApi();
      blobUrl.value = `
        <video controls autoplay>
          <source src="${invokData.value}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    }

    return {
      blobUrl,
      fileChanged,
      playClick
    }
  },
  methods:{
    playM3u8Click(){
      const video = this.$refs.videoPlayerEle;
      if (Hls.isSupported()) {
        this.showM3u8Player = true;
        const hls = new Hls();
        hls.loadSource(this.m3u8VideoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = this.videoSrc;
        video.addEventListener('loadedmetadata',function() {
          video.play();
        });
      }
    },
    async playM3u8Click(){
      const textPromise = await fetch(this.m3u8VideoUrl);
      const text = await textPromise.text();

      let strList = text.split('\n');
      strList.forEach((itemStr,i) => {
        if(itemStr.endsWith('.ts')){
          strList[i] = serverPath + itemStr;
        }
      })

      const blob = new Blob([strList.join('\n')], { type: 'application/x-mpegURL' });
      this.m3u8BlobUrl = URL.createObjectURL(blob);
      const video = this.$refs.videoPlayerEle;
      const hls = new Hls();

      this.showM3u8Player = true;
      hls.loadSource(this.m3u8BlobUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,function() {
        video.play();
      });
      // URL.revokeObjectURL(url);
    }
  },
  beforeUnmount(){
    console.log(this.m3u8BlobUrl,'before unmount');
    
    if(this.m3u8BlobUrl){
      URL.revokeObjectURL(this.m3u8BlobUrl);
      console.log('revoked !!!');
    }
  }
}
</script>

<style>
.page-container{
  width:800px;
  padding-top:120px;
  margin:auto;
  height:auto;
  display:flex;
  justify-content: center;
  flex-direction: column;
}
</style>
