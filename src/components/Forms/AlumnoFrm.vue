<template>
  <DxForm :formData="formData" :col-count="2">
    <DxSimpleItem data-field="nombre_alumno" :col-span="1" />
    <DxSimpleItem data-field="apellidos_alumno" :col-span="1" />

    <DxSimpleItem :col-span="2">
      <div class="w-full space-x-2">
        <DxButton text="Guardar" type="success" @click="onClkBtnGuardar" />
        <DxButton text="Cancelar" type="danger" @click="emit('@cancelar')" />
      </div>
    </DxSimpleItem>
  </DxForm>
</template>

<script setup lang="ts">
import DxForm, { DxSimpleItem, DxGroupItem } from "devextreme-vue/form";
import type { AlumnoType } from "@/types/types";
import { ref, watch } from "vue";
import { DxButton } from "devextreme-vue/button";
import axios from "axios";

interface IProps {
  alumnoData?: null | AlumnoType;
}

const props = withDefaults(defineProps<IProps>(), { alumnoData: undefined });
const emit = defineEmits<{ (e: "@cancelar"): void; (e: "@saved"): void }>();

const formData = ref<AlumnoType | null>();

watch(
  () => props.alumnoData,
  (value) => {
    if (value) {
      formData.value = value;
    } else {
      formData.value = {} as AlumnoType;
    }
  }
);

function addAlumno(alumno: AlumnoType) {
  axios
    .post("http://localhost:5088/api/Alumno/add-alumno", alumno)
    .then((Response) => {
      emit("@saved");
    });
}

function updateAlumno(alumno: AlumnoType) {
  axios
    .put(
      "http://localhost:5088/api/Alumno/update-alumno/" + alumno.id_alumno,
      alumno
    )
    .then((Response) => {
      emit("@saved");
    });
}

function onClkBtnGuardar() {
  if (formData.value) {
    if (formData.value.id_alumno) {
      updateAlumno(formData.value);
    } else {
      addAlumno(formData.value);
    }
  }
}
</script>
