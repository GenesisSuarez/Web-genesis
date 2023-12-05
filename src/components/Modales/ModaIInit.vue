<template>
  <div class="model">
    <v-card
      class="modal__container d-flex flex-column fill-height justify-center align-center text-white"
    >
      <v-card-text class="subheading" style="">
        <img
          class="close"
          @click="$emit('closeModal')"
          src="../../assets/close.svg"
          alt=""
        />
        <p class="title-item">¡HOLA VIAJERO!</p>
        <p>TU PRÓXIMO VIAJE TE ESPERA</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="openForm">Cotizar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function openForm() {
  router.push({ name: "form" });
}
</script>

<style lang="sass">
@import "@sass/importComponent.scss"
</style>
