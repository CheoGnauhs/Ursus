<template>
  <div id="index">
    <Login></Login>
  </div>
</template>

<script>
import Login from "../components/Login";
export default {
  name: "Index",
  components: { Login }
};
</script>

<style scoped>
#index {
  width: 1440px;
  height: 803px;
	background: url("../assets/express.jpg") no-repeat 40% 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
