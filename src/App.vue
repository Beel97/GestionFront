<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import HelloWorld from "./components/HelloWorld.vue";
import HomeView from "./views/HomeView.vue";
</script>

<template>
  <div class="w-screen h-screen bg-[#E6E1FA]">
    <NavBar />
    <RouterView> </RouterView>
  </div>
</template>
