<template>
  <div class="page-container">
    <div class="page-wrapper">
      <div class="data-c-row h">
        <div class="column-code" :class="columnItem.key" v-for="columnItem of columns">
          {{ columnItem.key }}
        </div>
      </div>
      <div class="data-c-row" v-for="dataRow of dataTableList">
        <div class="column-code" :class="columnItem.key" v-for="(columnItem) of columns">
          {{ dataRow[columnItem.key] }}
        </div>
      </div>
    </div>

    <div class="video-ele-container">
      <video controls ref="videoPlayerEle" class="video-ele">
        <source :src="currentLink" type="application/x-mpegURL">
      </video>
      <div>
        <ul>
          <li v-for="(link, index) of linkList" @click="linkClicked(index)" :class="{ current: index == cLiIndex }">
            {{ link }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Hls from 'hls.js'

const columns = [
  {
    key: 'id'
  },
  {
    key: 'title'
  },
  {
    key: 'remark'
  },
  {
    key: 'descrip'
  },
  {
    key: 'summery'
  },
  {
    key: 'annotation'
  },
  {
    key: 'notes'
  },
  {
    key: 'illustrate'
  },
  {
    key: 'explanation'
  },
  {
    key: 'comments'
  },
  {
    key: 'caption'
  },
  {
    key: 'directions'
  }
];

const dataTableList: Array<IDataItemPc> = [
  {
    id: 0,
    title: '看i u也特好于近日太热',
    remark: '的非法所得分定时发送',
    descrip: '数据来看发生，的苏里科夫就撒开，俄粉旅客，阿拉山口记得了',
    summery: '老婆看i截图也会突然团聚很讨厌他',
    annotation: '看咯飞机飞往咖啡加我加，时代看咯飞机拉斯',
    notes: '额v如同北国风光回复电话天发',
    illustrate: '伏特加月黑风高人看斯',
    explanation: '老婆有天赋我二哥的更恶的饭',
    comments: '虚荣和电脑与科研',
    caption: '破发他也特讨厌一句',
    directions: '去想从v分页鄱阳湖它广泛推广',
  }
];
let des = dataTableList[0];
for (let i = 0; i < 20; i++) {
  let dataRow = JSON.parse(JSON.stringify(des));
  dataRow.id = i + 1;
  dataTableList.push(dataRow);
}

let linkListStr = `
  https://m3u8.heimuertv.com/play/40fe40c8747c4c448d2f72300e34ea02.m3u8,
  https://m3u8.heimuertv.com/play/153583c4dcc741e08e762e95dfc90884.m3u8,
  https://m3u8.heimuertv.com/play/a69e3525a2e44dc6a513f314f0c3be0b.m3u8,
  https://m3u8.heimuertv.com/play/c81a176108bd4bf2852ad4f53526932c.m3u8,
  https://m3u8.heimuertv.com/play/11bcede0f75d4f3a88f73308735ed618.m3u8,
  https://m3u8.heimuertv.com/play/132c62d40561449597ffe81e615bb5ac.m3u8,
  https://m3u8.heimuertv.com/play/7b169eed7d7244e38e87d73fbd713ec1.m3u8,
  https://m3u8.heimuertv.com/play/1d9fcd226d2245cba3b64a0246c616e4.m3u8,
  https://m3u8.heimuertv.com/play/08836ed7ed2845c59f7f629c2ae105d5.m3u8,
  https://m3u8.heimuertv.com/play/374e58e5b03446498145aca89d28a3b0.m3u8,
  https://m3u8.heimuertv.com/play/21e6eb4b1e4442d196f9b449c08d6e22.m3u8,
  https://m3u8.heimuertv.com/play/f109f3946ec841e99f9749e7c65db655.m3u8,
  https://m3u8.heimuertv.com/play/986a84d0a9114516b4da793ece51ed81.m3u8,
  https://m3u8.heimuertv.com/play/9074e6d448fd4b5597ef66a51a729de9.m3u8,
  https://m3u8.heimuertv.com/play/3bfaf918cc564552bddd4f5732c9c8b0.m3u8,
  https://m3u8.heimuertv.com/play/75208dfb9c35461b9d4f11f61ffb053b.m3u8,
  https://m3u8.heimuertv.com/play/912738178509458bbedd6a62f3614540.m3u8,
  https://m3u8.heimuertv.com/play/6f1ff9c935124ce0813819b132baf537.m3u8,
  https://m3u8.heimuertv.com/play/503d7397142c461f8ae430e6920bc0c2.m3u8,
  https://m3u8.heimuertv.com/play/3f53dd2dae4d48dfb7f09c3e7ef28c26.m3u8
`;

const cLiIndex = ref(-1),
  linkList = linkListStr.split(',').map(item => item.trim()),
  videoPlayerEle = ref(null),
  currentLink = ref(''),
  linkClicked = (index: number) => {
    currentLink.value = linkList[index];
    const video: any = videoPlayerEle.value;
    cLiIndex.value = index;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(currentLink.value);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = currentLink.value;
      video.addEventListener('loadedmetadata', function () {
        video.play();
      });
    }
  };

onMounted(() => {
  // linkClicked(0);
})

</script>

<style scoped>
.page-container {
  padding-top: 130px;
  padding-left: 20px;
  display: flex;
}

.video-ele-container {
  width: 893px;
}

.video-ele {
  width: 100%;
}

.page-wrapper {
  width: 1000px;
  height: 480px;
  overflow: auto;
  border-top: 1px solid;
  border-left: 1px solid;
}

.data-c-row {
  display: flex;
}

.data-c-row.h {
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 2;
}

.data-c-row.h .column-code {
  align-items: center;
  position: sticky;
  background: white;
}

.column-code {
  width: 300px;
  height: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  padding: 8px;
  border-right: 1px solid;
  border-bottom: 1px solid;
  flex-shrink: 0;
}

.column-code.id {
  position: sticky;
  left: 0;
  background-color: #ffffff;
  z-index: 1;
}

ul li {
  cursor: pointer;
}

ul li.current {
  color: rgb(173, 8, 35);
}

ul li:nth-child(odd) {
  background-color: rgb(205, 207, 220);
}

ul li:nth-child(even) {
  background-color: rgb(181, 183, 198);
}
</style>
