<template>
  <div class="modal-conditional">
    <v-card
      class="modal__container d-flex flex-column fill-height justify-center align-center text-white"
    >
      <v-card-text class="subheading">
        <p class="items__title">Términos y condiciones para cotizar</p>
        <div class="items__condicional">
          <p class="items__p">
            1. Al solicitar una cotización de viaje con Agent Travel, el cliente acepta
            automáticamente todos los términos y condiciones establecidos en este
            documento.
          </p>
          <p class="items__p">
            2. Las cotizaciones de viaje proporcionadas por Agent Travel tienen una
            validez de 5 días a partir de la fecha de emisión. Después de este período, la
            cotización puede estar sujeta a cambios basados en la disponibilidad y tarifas
            actualizadas.
          </p>
          <p class="items__p">
            3. La confirmación de la reserva se realizará una vez que el cliente haya
            aceptado la cotización y haya realizado el pago correspondiente. Agent
            Travelse reserva el derecho de cancelar la reserva si el pago no se recibe
            dentro del plazo especificado.
          </p>
          <p class="items__p">
            4. Las políticas de cancelación y reembolso estarán sujetas a las condiciones
            establecidas por los proveedores de servicios, tales como aerolíneas, hoteles,
            y agencias de viajes. Agent Travel no asume responsabilidad por cambios o
            cancelaciones de servicios por parte de los proveedores.
          </p>
          <p class="items__p">
            5. Cualquier solicitud de modificación en el itinerario después de la
            confirmación de la reserva estará sujeta a disponibilidad y puede conllevar
            cargos adicionales. Agent Travel no se hace responsable de cambios en el
            itinerario realizados por terceros proveedores.
          </p>
          <p class="items__p">
            6. El cliente es responsable de proporcionar información precisa y completa al
            solicitar la cotización. Agent Travel no se hace responsable de problemas
            derivados de información incorrecta proporcionada por el cliente.
          </p>
          <p class="items__p">
            7. Se recomienda encarecidamente que el cliente adquiera un seguro de viaje
            adecuado para cubrir posibles eventualidades, como cancelaciones, pérdida de
            equipaje y gastos médicos.
          </p>
          <p class="items__p">
            8. Agent Travel se reserva el derecho de modificar las tarifas y condiciones
            en cualquier momento, previa notificación al cliente. Los cambios no afectarán
            a las reservas ya confirmadas.
          </p>
          <p class="items__p">
            9. Agent Travel no se hace responsable de pérdidas, daños, lesiones o gastos
            incurridos durante el viaje, a menos que dichos incidentes sean directamente
            atribuibles a la negligencia de la empresa.
          </p>
          <p class="items__p">
            10. Agent Travel se reserva el derecho de aceptar seguir con el proceso de
            viaje, y en caso contrario, desistir si de alguna manera se ve afectado el
            trabajo que se ha realizado.
          </p>
          <p class="items__p">
            11. De haber cancelaciones o cambios por parte del proveedor (hotel,
            aerolínea, etc) Agent travel cumplirá con los términos que acepte el cliente,
            ya sea por cambio de itinerario y devoluciones.
          </p>
          <p class="items__p">
            12. Agent Travel tendrá un tiempo de hasta 90 días hábiles para realizar las
            devoluciones, si corresponde.
          </p>
          <p class="items__p">
            13. Agent Travel en caso de que el cliente solicite un reembolso, únicamente
            si corresponde, de ser válido y estar aprobado por el proveedor se quedará con
            el 5% del valor cobrado, por la gestión y procesos realizados.
          </p>
          <p class="items__p">
            14. Un cliente no podrá desistir del viaje a menos que sea por causa de fuerza
            mayor (demostrable), Agent Travel proporcionara alternativas al cliente.
          </p>
          <p class="items__p">
            15. Las devoluciones sólo son válidas en determinadas situaciones, en caso de
            que el proveedor no pueda cumplir con el servicio.
          </p>
          <p class="items__p">
            16. Los cambios que se realicen (fecha, hotel, horarios, cambios de nombres)
            deben ser abonados por el cliente y Agent Travel se encargará de los procesos.
          </p>
          <p class="items__p">
            17. Agent Travel se reserva información de proveedores, datos, notificaciones
            y documentos, que sean de uso privado entre el proveedor y la agencia.
          </p>
          <p class="items__p">
            18. Agent travel se encargará de enviar documentación de viaje un periodo de 3
            días hábiles, siempre y cuando el viaje,no esté dentro de estos días
            estipulados, de ser un viaje cercano, Agent Travel lo enviará en el mismo día
            de la compra
          </p>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="button" @click="$emit('acceptTerms')">Acepto condiciones</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

let data = ref({ conditional: false });
let showModal = ref(true);

const agreeWithTerms = () => {
  showModal.value = false;
};
</script>

<style lang="sass">
@import "../../sass/importComponent.scss"
</style>
