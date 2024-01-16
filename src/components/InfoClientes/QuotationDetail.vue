<template>
  <div class="model-user">
    <v-card
      class="modal__container d-flex flex-column fill-height justify-center align-center text-white"
    >
      <h5>Datos de viajes</h5>
      <v-card-text class="subheading" style="background-color: #ffffff">
        <p style="text-align: justify">
          Nombre y apellido: {{ approvedQuot.nombreApellido ?? "" }}
        </p>
        <p style="text-align: justify">
          Ciudad de origen: {{ approvedQuot.ciudadOrigen ?? "" }}
        </p>
        <p style="text-align: justify">
          Ciudad de destino: {{ approvedQuot.ciudadDestino ?? "" }}
        </p>
        <p style="text-align: justify">
          Tipo de viaje: {{ approvedQuot.tipoViaje ?? "" }}
        </p>
        <p style="text-align: justify">
          Número de personas: {{ approvedQuot.amountPersons ?? "" }}
        </p>
        <p style="text-align: justify">
          Fecha de salida: {{ formatDate(approvedQuot.fechaSalida) ?? "" }}
        </p>
        <p style="text-align: justify">
          Fecha de regreso: {{ formatDate(approvedQuot.fechaRegreso) ?? "" }}
        </p>
        <p style="text-align: justify">
          Opciones del cliente: {{ approvedQuot.optionViaje ?? "" }}
        </p>
        <p style="text-align: justify">
          Información de cotización: {{ approvedQuot.recibirCotizacion ?? "" }}
        </p>
        <p style="text-align: justify">
          Número Telefónico: {{ approvedQuot?.Telefono + approvedQuot.numeroTelefonico ?? "" }}
        </p>
        <p style="text-align: justify">
          Descripción: {{ approvedQuot.Description ?? "" }}
        </p>
        <v-card-actions
          style="
            background-color: #ffffff;
            display: flex;
            margin-right: 27px;
            justify-content: end;
          "
        >
          <v-btn @click="$emit('closetModel')">Cerrar</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../../store/cartContainer";

const store = useCartStore();

const approvedQuot = computed(() => store.getCurrentPrice);

const formatDate = (date) => {

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (new Date(date)).toLocaleDateString('es-CO', options);
};
</script>
