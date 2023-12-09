<template>
  <div class="w-full flex justify-center">
    <div class="w-5/6 shadow-2xl bg-[#363640] m-10 p-3">
      <div class="mb-6">
        <span class="absolute inline-flex h-1 w-1 text-white font-semibold">
          Calificaciones
        </span>
      </div>

      <CalificacionesDG />
    </div>
  </div>
</template>
<script setup lang="ts">
import CalificacionesDG from "@/components/Datagrids/CalificacionesDG.vue";
</script>
