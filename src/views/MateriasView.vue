<template>
    <div class="w-full flex justify-center">
      <div class="w-4/6 shadow-2xl bg-[#363640] m-10 p-3">
        <div class="mb-6">
          <span class="absolute inline-flex h-1 w-1 text-white font-semibold">
            Materias
          </span>
        </div>
  
        <MateriasDG />
      </div>
    </div>
  </template>
  <script setup lang="ts">
  import MateriasDG from "@/components/Datagrids/MateriasDG.vue";
  </script>
  