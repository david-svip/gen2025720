<template>
  <div class="border-wrap">
    
    <div class="area">
      <div class="glow-box">Glow Border</div>
    </div>
    <div class="area">
      <div class="rotate-box">
        <span>Rotate Border</span>
      </div>
    </div>
    <div class="area">
      <div class="login-box">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login Box
      </div>
    </div>
    <div class="area">

    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="stylus">
.border-wrap{
  height:600px;
  display:flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  .area{
    width:25%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    .glow-box {
      width: 220px;
      height: 100px;
      border: 2px solid #00ffff;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #111;
      border-radius: 10px;
      animation: glow 1.5s infinite alternate;
    }
  }
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px #00ffff;
  }
  to {
    box-shadow: 
      0 0 10px #00ffff,
      0 0 20px #00ffff,
      0 0 40px #00ffff;
  }
}

.rotate-box {
  width: 220px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  border-radius: 10px;
  overflow: hidden;
}

.rotate-box::before {
  content: "";
  position: absolute;
  width: 300%;
  height: 300%;
  background: conic-gradient(
    purple,
    yellow,
    red,
    black,
    black,
    purple
  );
  animation: rotate 4s linear infinite;
}

.rotate-box span {
  width: 97%;
  height: 97%;
  position: relative;
  z-index: 1;
  background: #111;
  padding: 40px 80px;
  border-radius: 8px;
  color:white;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


.login-box {
  position: relative;
  width: 300px;
  height: 150px;
  background: #111;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 上边 */
.login-box span:nth-child(1) {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: animate1 2s linear infinite;
}

/* 右边 */
.login-box span:nth-child(2) {
  position: absolute;
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: animate2 2s linear infinite;
  animation-delay: .5s;
}

/* 下边 */
.login-box span:nth-child(3) {
  position: absolute;
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: animate3 2s linear infinite;
  animation-delay: 1s;
}

/* 左边 */
.login-box span:nth-child(4) {
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: animate4 2s linear infinite;
  animation-delay: 1.5s;
}

@keyframes animate1 {
  0% { left: -100%; }
  100% { left: 100%; }
}

@keyframes animate2 {
  0% { top: -100%; }
  100% { top: 100%; }
}

@keyframes animate3 {
  0% { right: -100%; }
  100% { right: 100%; }
}

@keyframes animate4 {
  0% { bottom: -100%; }
  100% { bottom: 100%; }
}

</style>
