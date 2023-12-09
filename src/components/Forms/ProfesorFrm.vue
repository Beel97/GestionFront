<template>
  <DxForm :formData="formData">
    <DxSimpleItem data-field="nombre_profesor" />
    <DxSimpleItem data-field="apellidos_profesor" />
    <DxSimpleItem>
      <div class="w-full space-x-2">
        <DxButton text="Guardar" type="success" @click="onClkBtnGuardar" />
        <DxButton text="Cancelar" type="danger" @click="emit('@cancelar')" />
      </div>
    </DxSimpleItem>
  </DxForm>
</template>

<script setup lang="ts">
import DxForm, { DxSimpleItem } from "devextreme-vue/form";
import type { ProfesorType } from "@/types/types";
import { ref, watch } from "vue";
import { DxButton } from "devextreme-vue/button";
import axios from "axios";

interface IProps {
  profesorData?: null | ProfesorType;
}

const props = withDefaults(defineProps<IProps>(), { profesorData: undefined });
const emit = defineEmits<{ (e: "@cancelar"): void; (e: "@saved"): void }>();

const formData = ref<ProfesorType | null>();

watch(
  () => props.profesorData,
  (value) => {
    if (value) {
      formData.value = value;
    } else {
      formData.value = {} as ProfesorType;
    }
  }
);

function addProfesor(profesor: ProfesorType) {
  axios
    .post("http://localhost:5088/api/Profesores/add-profesor", profesor)
    .then((Response) => {
      emit("@saved");
    });
}

function updateProfesor(profesor: ProfesorType) {
  axios
    .put(
      "http://localhost:5088/api/Profesores/update-profesor/" +
        profesor.id_profesor,
      profesor
    )
    .then((Response) => {
      emit("@saved");
    });
}

function onClkBtnGuardar() {
  if (formData.value?.id_profesor) {
    updateProfesor(formData.value);
  } else {
    addProfesor(formData.value!);
  }
}
</script>
