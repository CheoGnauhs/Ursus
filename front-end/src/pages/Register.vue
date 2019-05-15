<template>
  <div class="register">
    <RegisterMain></RegisterMain>
  </div>
</template>

<script>
import RegisterMain from "../components/RegisterMain";
export default {
  name: "Register",
  components: { RegisterMain }
};
</script>

<style scoped>
.register {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  padding: 50px 0;
  background: url("../assets/express.jpg") no-repeat 40% 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
