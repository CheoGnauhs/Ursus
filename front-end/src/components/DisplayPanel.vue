<template>
  <div class="display-panel">
    <img class="logo" src="../assets/logo.png" alt="logo">
    <span>浣熊-区块链人人快递</span>
  </div>
</template>

<script>
export default {
  name: "DisplayPanel"
};
</script>

<style scoped>
.display-panel {
  color: #6583b4;
  font-size: 18px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
}
.logo {
  height: 50px;
  display: inline-block;
  margin-right: 10px;
}
</style>
