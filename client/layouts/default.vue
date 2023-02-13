<template>
  <div>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue"
export default {
  components: { Navbar ,Footer},

};
</script>

<style>
body{
  font-size: 13px;
  line-height: 19px;
  color: #111;
  
} 
</style>
