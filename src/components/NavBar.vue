<template>
  <div class="w-screen">
    <DxMenu
      :focusStateEnabled="false"
      id="MainNavBar"
      :data-source="rutas"
      orientation="horizontal"
      :showFirstSubmenuMode="{
        delay: { hide: 300, show: 300 },
        name: 'onClick',
      }"
      displayExpr="name"
      :hideSubmenuOnMouseLeave="false"
      :adaptivityEnabled="true"
      :height="48"
      css-class="mainNavBar"
    />
  </div>
</template>
<script setup>
import DxMenu from "devextreme-vue/menu";
import rutas from "/src/router/rutas.ts";
</script>
<style>
.mainNavBar .dx-menu-items-container {
  @apply bg-gradient-to-r from-[#6C5DA5] via-[#4c3899] to-[#2b3183];
  display: block !important;
}

.mainNavBar .dx-menu-item a {
  color: #ffffff;
}

.mainNavBar .dx-menu-item {
  color: rgb(202, 202, 202);
}

.mainNavBar .dx-menu-item.dx-state-hover {
  @apply opacity-80 text-emerald-300;
}

.mainNavBar .dx-menu-item.dx-menu-item-expanded {
  @apply animate-pulse text-slate-800;
}

.mainNavBar .dx-menu-item {
  cursor: pointer !important;
}
</style>
