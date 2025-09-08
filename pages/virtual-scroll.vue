<template>
  <div class="scroll-wrapper">
    <RecycleScroller
      :items="dataListPage"
      :item-size="160"
      key-field="id"
      class="virtual-scroller"
    >
      <template #default="{ item, index }">
        <div class="sc-d-item" :data-n="index">
          <div class="sc-d-text">
            {{ item.text }}
          </div>
          <div class="status-tool">
            <div class="status-block" :style="{background:`${item.color1}`}">
              Tag1
            </div>
            <div class="status-block" :style="{background:`${item.color2}`}">
              Tag2
            </div>
            <div class="switch-wrapper" :class="{on:item.status}" @click="item.status = item.status?0:1">
            </div>
            <div class="d3-wrapper">
              <div class="scene">
                <div class="cube">
                  <div class="face front">Front</div>
                  <div class="face back">Back</div>
                  <div class="face right">Right</div>
                  <div class="face left">Left</div>
                  <div class="face top">Top</div>
                  <div class="face bottom">Bottom</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </RecycleScroller>
    
    <div class="triangle-up" :class="{show:showGotop}" @click="goTop"></div>

  </div>
</template>

<script lang="ts" setup>
import { RecycleScroller } from 'vue3-virtual-scroller';

interface dataItem{
  id:number,
  text:string,
  color1:string,
  color2:string,
  status:number,
}
const dataItemList = ref<Array<dataItem>>([]);
const dataListPage = ref<Array<dataItem>>([]);

onMounted(() => {
  dataInit();
  getDataPage(1);
  window.addEventListener('scroll',scrollBottom);
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll',scrollBottom);
})
const showGotop = ref(false)
const scrollBottom = () => {
  showGotop.value = window.scrollY > 1000;
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    getDataPage(page.value + 1);
  }
}

const dataInit = () => {
  dataItemList.value = Array.from({length:5000}).map((_,i:number) => {
    const articleIndex = Math.floor(Math.random() * chituIsDead.value.length);
    return {
      id:i,
      text:chituIsDead.value[articleIndex],
      color1:getRandomColor(),
      color2:getRandomColor(),
      status:Math.random() > .5 ? 1 : 0,
    }
  })
}
const page = ref(1);
const getDataPage = (currPage:number) => {
  const size = 40;
  page.value = currPage;
  const start = (page.value - 1) * size;
  const end = start + size;
  dataListPage.value = dataListPage.value.concat(dataItemList.value.slice(start,end));
}

const getRandomColor = () => {
  const cNum = Math.floor(Math.random() * 255);
  const cNum1 = Math.floor(Math.random() * 255);
  const cNum2 = Math.floor(Math.random() * 255);
  return `rgb(${cNum} ${cNum1} ${cNum2})`;
}

const chituIsDead = computed(() => {
  return `
    建安二十六年，西元221年，關羽走麥城，兵敗遭擒，拒降，爲孫權所害。 其坐騎赤兔馬爲孫權賜予馬忠。

一日，馬忠上表：赤兔馬絕食數日，不久將亡。孫權大驚，急訪江東名士伯喜。此人乃伯樂之後，人言其精通馬語。

馬忠引伯喜回府，至槽間，但見赤兔馬伏於地，哀嘶不止。衆人不解，惟伯喜知之。伯喜遣散諸人，撫其背歎道：“昔日曹操做《龜雖壽》，‘老驥伏櫪，志在千里。烈士暮年,壯心不已’，吾深知君念關將軍之恩義，欲從之於地下。然當日呂奉先白門樓殞命，亦未見君如此相依，爲何今日這等輕生，豈不負君千里之志哉？”

赤兔馬哀嘶一聲，歎道：“予嘗聞，‘鳥之將死，其鳴也哀；將死，其言也善。 ’今幸遇先生，吾可將肺腑之言相告。吾生於西涼，後爲董卓所獲，此人飛揚跋扈，殺少帝，臥龍床，實爲漢賊，吾深恨之。”

伯喜點頭，曰：“後聞李儒獻計，將君贈予呂布，呂布乃天下第一勇將，衆皆言，‘人中呂布，馬中赤兔。’想來當不負君之志也。”

赤兔馬歎曰：“公言差矣。呂布此人最是無信，爲榮華而殺丁原，爲美色而刺董卓，投劉備而奪其徐州，結袁紹而斬其婚使。‘人無信不立’，與此等無誠信之人齊名， 實爲吾平生之大恥！後吾歸於曹操，其手下雖猛將如雲，卻無人可稱英雄。吾恐今生只辱于奴隸人之手，駢死於槽櫪之間。後曹操將吾贈予關將軍；吾曾于虎牢關前見其武勇，白門樓上見其恩義，仰慕已久。關將軍見吾亦大喜，拜謝曹操。操問何故如此，關將軍答曰：‘吾知此馬日行千里，今幸得之，他日若知兄長下落，可一日而得見矣。’其人誠信如此。常言道：‘鳥隨鸞鳳飛騰遠，人伴賢良品質高。’吾不敢不以死相報乎？”

伯喜聞之，歎曰：“人皆言關將軍乃誠信之士，今日所聞，果真如此。”赤兔馬泣曰：“吾嘗慕不食周粟之伯夷、叔齊之高義。玉可碎而不可損其白，竹可破而不可毀其節。 士爲知已而死，人因誠信而存，吾安肯食吳粟而苟活於世間？”言罷，伏地而亡。

伯喜放聲痛哭，曰：“物猶如此，人何以堪？”後奏于孫權。權聞之亦泣：“吾不知雲長誠信如此，今此忠義之士爲吾所害，吾何面目見天下蒼生？。”

後孫權傳旨，將關羽父子並赤兔馬厚葬。
  `.split('。').filter(item => item.trim());
})

const goTop = () => {
  window.scrollTo({top:0,behavior:'smooth'})
}

</script>

<style lang="stylus" scoped>
.scroll-wrapper{
  padding:25px 0 100px 0;
  .sc-d-item{
    width:90%;
    height:auto;
    border-radius:5px;
    border:1px solid #c3b1b1;
    margin:0 auto 10px auto;
    padding:20px;
    .sc-d-text{
      height:68px;
      -webkit-line-clamp: 3;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    .status-tool{
      height:40px;
      display:flex;
      align-items:flex-end;  
      .status-block{
        width:30px;
        height:20px;
        border-radius:5px;
        margin-right:4px;
        font-size:12px;
        color:white;
        line-height:20px;
      }
      .switch-wrapper{
        width:36px;
        height:19px;
        border-radius:9px;
        background:#AAAAAA;
        position:relative;
        &::after{
          content:' ';
          width:17px;
          height:17px;
          background-color:white;
          border-radius:50%;
          position:absolute;
          top:1px;
          left:1px;
          transition:left .2s,right .2s;
        }
        &.on{
          background:#00b2fd;
          &::after{
            left:calc(100% - 18px);
          }
        }
      }
      .d3-wrapper{
        width:50px;
        height:50px;  
        margin-left:40px;
        .scene {
          width: 50px;
          height: 50px;
          perspective: 600px;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 10s infinite linear;
        }
        .face {
          position: absolute;
          width: 50px;
          height: 50px;
          background: rgba(0, 136, 255, 0.8);
          border: 2px solid #fff;
          font-size: 14px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .front  { transform: translateZ(25px); }
        .back   { transform: rotateY(180deg) translateZ(25px); }
        .right  { transform: rotateY(90deg) translateZ(25px); }
        .left   { transform: rotateY(-90deg) translateZ(25px); }
        .top    { transform: rotateX(90deg) translateZ(25px); }
        .bottom { transform: rotateX(-90deg) translateZ(25px); }
        @keyframes rotateCube {
          0%   { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      }
    }
  }
  .triangle-up{
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 26px solid #999;
    position:fixed;
    right:2px;
    bottom:8px;
    display:none;
    &.show{
      display:block;
    }
  }
}
</style>
