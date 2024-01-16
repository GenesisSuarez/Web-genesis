<template>
  <ProgressCircular v-if="isLoading && !errorData" />
  <ErrorModal v-if="errorData && !isLoading" />
  <QuotationDetail v-show="showItems" @closet-model="closetModal" />
  <div class="container-info">
    <div class="info__title">
      <img src="../../assets/logo.png" alt="" />
      <p>Información de cliente para cotización</p>
    </div>
    <QuoteFilters @valid-successful="(filters) => handleSuccessful(filters)" />
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr style="text-align: center">
            <th scope="col">Nombre y apellido</th>
            <th scope="col">Email</th>
            <!-- <th scope="col">Genero</th> -->
            <th scope="col">Cotización</th>
            <th scope="col">Fecha de solicitud</th>
            <th scope="col">Tipo de Viaje</th>
            <th scope="col">Detalle</th>
          </tr>
        </thead>
        <tbody style="width: 100%">
          <tr
            v-for="(cliente, i) in clientes"
            :key="i"
            style="text-align: center"
          >
            <td>{{ cliente.nombreApellido }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.recibirCotizacion }}</td>
            <td>{{ cliente.DateTransaction }}</td>
            <td>{{ cliente.tipoViaje }}</td>
            <td>
              <v-btn @click="(ev) => detailUser(cliente.Uid)"
                ><img src="../../assets/eye.svg" alt=""
              /></v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="d-grid gap-2 col-6 mx-auto button"
      style="width: 15%; margin-bottom: 10px"
    >
      <button
        type="button"
        @click="loadMore"
        class="btn btn-success"
        :disabled="allDataLoaded"
      >
        Cargar más
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAsync } from "../../hooks/useAsync";
import ProgressCircular from "../Modales/ProgressCircular.vue";
import ErrorModal from "../Modales/ErrorModal.vue";
import QuotationDetail from "./QuotationDetail.vue";
import QuoteFilters from "./QuoteFilters.vue";
import { useCartStore } from "../../store/cartContainer";

const store = useCartStore();
const { result, makeRequest, errorData, isLoading } = useAsync();
const page = ref("1");
const allDataLoaded = ref(false);
const showItems = ref(false);

const clientes = ref([]);

const respuesta = async (param = {}, page = 1, concatenateReponse = true) => {
  try {
    let tokenAccess = localStorage.getItem("MyToken");
    let queryParams = {};

    if (page > 1 && clientes.value.length > 0) {
      const lastItem = clientes.value[clientes.value.length - 1];
      queryParams.Uid = lastItem.Uid;
      queryParams.DateTransaction = lastItem.DateTransaction;
    }

    if (param.nombreApellido) queryParams.nombreApellido = param.nombreApellido;
    if (param.DateTransaction)
      queryParams.DateTransaction = param.DateTransaction;
    if (param.recibirCotizacion)
      queryParams.recibirCotizacion = param.recibirCotizacion;
    if (param.tipoViaje) queryParams.tipoViaje = param.tipoViaje;
    if (param.fechaSalida) queryParams.fechaSalida = param.fechaSalida;
    if (param.fechaRegreso) queryParams.fechaRegreso = param.fechaRegreso;
    if (param.optionViaje) queryParams.optionViaje = param.optionViaje;
    if (param.fechaRegreso) queryParams.Description = param.Description;
    if (tokenAccess) queryParams.token = tokenAccess;

    queryParams.page = page;
    queryParams.Bank = "1";
    queryParams.Category = "1";
    queryParams.Title = "quote";

    const response = await makeRequest("information-request/list", queryParams);

    if (result.value && result.value.data && result.value.data.Items) {
      
      if (!concatenateReponse) {
        clientes.value = [...result.value.data.Items];
      } else {
        clientes.value = [...clientes.value, ...result.value.data.Items];
      }

      if (clientes.value.length === 0 || result.value.data.Items.length === 0) {
        allDataLoaded.value = true;
      }
    }
  } catch (err) {
    console.error("Oops, algo salió mal! ", err);
    errorData.value = true;
  }
};

const loadMore = async () => {
  if (allDataLoaded.value) {
    return;
  }
  page.value++;
  await respuesta({}, page.value);
};

onMounted(() => {
  respuesta();
});

function closetModal() {
  showItems.value = false;
}

function handleSuccessful(param) {
  if (param) {
    respuesta(param, 1, false);
  }
}

const findClientById = (id) => {
  const client = clientes.value.find((cliente) => cliente.Uid === id);
  return client;
};

function detailUser(id) {
  const client = findClientById(id);
  store.personInfo(client);
  showItems.value = true;
}
</script>

<style lang="sass">
@import "../../sass/importComponent.scss"
</style>
