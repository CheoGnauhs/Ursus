<template>
  <div id="index">
    <LoginMain></LoginMain>
  </div>
</template>

<script>
import LoginMain from "../components/LoginMain";
export default {
  name: "Index",
  components: { LoginMain }
};
</script>

<style scoped>
#index {
  width: 100%;
  height: 100%;
	background: url("../assets/express.jpg") no-repeat 40% 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
