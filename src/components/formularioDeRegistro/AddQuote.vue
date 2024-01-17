<template>
  <ProgressCircular v-if="loadModule && !errorData" />
  <ErrorModal v-if="errorData && !loadModule" />
  <RegistConfirm v-if="exictReg && !errorData" />
  <ConditionalOfQuote v-if="showModal" @accept-terms="itemsCloset" />
  <main class="container-form">
    <header class="header-container">
      <img @click="closetForm" class="arrow__leth" src="../../assets/flecha-left.svg" alt="atras" />

      <div class="container-add">
        <img class="logo" src="../../assets/logo.png" alt="" />
        <h2>
          Formulario de cotización
        </h2>
      </div>
    </header>

    <div class="form-regist">
      <form @submit.prevent="createButton" class="row g-3">

        <div class="col-md-12">
          <p>1. INFORMACIÓN DEL PASAJERO</p>
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Nombre y apellido</label>
          <input type="text" class="form-control" v-model="data.nombreApellido"
            :class="{ 'is-invalid': hasError('Nombre y Apellido') }" />
          <div v-if="hasError('Nombre y Apellido')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Email</label>
          <input type="text" class="form-control" placeholder="name@example.com" v-model="data.email"
            :class="{ 'is-invalid': hasError('email') }" />
          <div v-if="hasError('email')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="numeroTelefonico" class="form-label">Número telefónico</label>
          <div class="input-group mb-3">
            <button style="color: #000;" class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              {{ numberVar }}
            </button>
            <ul class="dropdown-menu" style="overflow-y: scroll; min-width: 20px; max-height: 120px">
              <li @click="() => flagSelect(flag.phone)" v-for="(flag, i) in extent" :key="i">
                <a class="dropdown-item">{{ flag.value }} {{ flag.phone }}</a>
              </li>
            </ul>
            <input type="text" class="form-control" id="numeroTelefonico" placeholder="312357030"
              v-model="data.numeroTelefonico" :class="{ 'is-invalid': hasError('Número telefónico') }" min="1" max="15" />
            <div v-if="hasError('Número telefónico')" class="invalid-feedback">
              {{ errorObject.errorMessage }}
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <label for="genero" class="form-label" style="display: flex; margin-bottom: 15px">Género</label>
          <div class="form-check form-check-inline">
            <input v-model="data.genero" :class="{ 'is-invalid': hasError('genero') }" class="form-check-input"
              type="radio" name="genero" id="radioFemenino" value="femenino" />
            <label class="form-check-label" for="radioFemenino">Femenino</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="data.genero" :class="{ 'is-invalid': hasError('genero') }" class="form-check-input"
              type="radio" name="genero" id="radioMasculino" value="masculino" />
            <label class="form-check-label" for="radioMasculino">Masculino</label>
            <div v-if="hasError('genero')" class="invalid-feedback">
              {{ errorObject.errorMessage }}
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <p>2. INFORMACIÓN DE VIAJE</p>
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Ciudad de origen</label>
          <input type="text" class="form-control" v-model="data.ciudadOrigen"
            :class="{ 'is-invalid': hasError('Ciudad de origen') }" />
          <div v-if="hasError('Ciudad de origen')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Ciudad de destino</label>
          <input type="text" class="form-control" v-model="data.ciudadDestino"
            :class="{ 'is-invalid': hasError('Ciudad de destino') }" />
          <div v-if="hasError('Ciudad de destino')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="tipoViaje" class="form-label">Selecciona el tipo de viaje</label>
          <select id="tipoViaje" class="form-select" v-model="data.tipoViaje"
            :class="{ 'is-invalid': hasError('tipo de Viaje') }">
            <option>Viaje de ida</option>
            <option>Viaje de ida y vuelta</option>
          </select>
          <div v-if="hasError('tipo de Viaje')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="fechaSalida" class="form-label">Fecha de salida</label>
          <input type="date" class="form-control" id="fechaSalida" v-model="data.fechaSalida"
            :class="{ 'is-invalid': hasError('fechaSalida') }" />
          <div v-if="hasError('fechaSalida')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div id="contenedorFechas" class="row" style="margin-top: 20px" v-if="data.tipoViaje === 'Viaje de ida y vuelta'">
          <div class="col-md-6">
            <label for="fechaRegreso" class="form-label">Fecha de regreso</label>
            <input type="date" class="form-control" id="fechaRegreso" v-model="data.fechaRegreso"
              :class="{ 'is-invalid': hasError('fechaRegreso') }" />
          </div>
          <div v-if="hasError('fechaRegreso')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>


        <div class="col-md-6">
          <label for="recibirCotizacion" class="form-label">Donde desea recibir la cotización</label>
          <select id="recibirCotizacion" class="form-select" v-model="data.recibirCotizacion"
            :class="{ 'is-invalid': hasError('Recibir cotizacion') }">
            <option value="WhatsApp">WhatsApp</option>
            <option value="Correo Electronico">Correo Electrónico</option>
          </select>
          <div v-if="hasError('Recibir cotizacion')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div class="col-md-6 movil-margin">
          <label for="optionViaje" class="form-label" style="display: flex; margin-bottom: 15px">Opciones que incluye el
            viaje:</label>
          <div class="form-check form-check-inline">
            <input v-model="data.optionViaje" :class="{ 'is-invalid': hasError('optionViaje') }" class="form-check-input"
              type="radio" name="optionViaje" id="radioOption" value="Plan completo (vuelos, hotel y tours)" />
            <label class="form-check-label" for="radioOption">Plan completo (vuelos, hotel y tours)</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="data.optionViaje" :class="{ 'is-invalid': hasError('optionViaje') }" class="form-check-input"
              type="radio" name="optionViaje" id="radioTiquete" value="tiquetes" />
            <label class="form-check-label" for="radioTiquete">Solo tiquetes</label>
            <div v-if="hasError('optionViaje')" class="invalid-feedback">
              {{ errorObject.errorMessage }}
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <label for="numeroPersonas" class="form-label">Selecciona el número de personas</label>
          <select id="numeroPersonas" class="form-select" v-model="data.numeroPersonas"
            :class="{ 'is-invalid': hasError('Número de personas') }">
            <option v-for="({ value }, index) in numberOfPersons" :key="index" :value="value">
              {{ value }}
            </option>
          </select>
          <div v-if="hasError('Número de personas')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div class="col-md-12">
          <div class="form-floating">
            <textarea class="form-control" v-model="data.description" id="floatingTextarea2"
              style="height: 100px"></textarea>
            <label for="floatingTextarea2">Peticiones adicionales</label>
          </div>
        </div>

        <div class="button__container">
          <input class="form-check-input" type="checkbox" id="btnModalOpen" v-model="data.conditional"
            :class="{ 'is-invalid': hasError('Términos y condiciones') }" />

          <label @click="toggleConditional" class="form-check-label" for="btnModalOpen" style="margin-left: 15px">
            Leer términos y condiciones
          </label>
          <div v-if="hasError('Términos y condiciones')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div style="margin-top: 30px; display: grid; justify-items: center" class="col-12">
          <button type="submit" class="btn btn-success">Registrar</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { Joi } from "vue-joi-validation";
import { useAsync } from "../../hooks/useAsync";
import { useRouter } from "vue-router";
import ProgressCircular from "../Modales/ProgressCircular.vue";
import ErrorModal from "../Modales/ErrorModal.vue";
import RegistConfirm from "../Modales/RegistConfirm.vue";
import ConditionalOfQuote from "../Modales/ConditionalOfQuote.vue";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const { makeRequest, errorData, appStatus } = useAsync();
const router = useRouter();
const loadModule = ref(false);
const exictReg = ref(false);
const showModal = ref(false);
const numberVar = ref("+57");

function closetForm() {
  router.push({ name: "ImportApp" });
}

const dateFormat = () => {
  return format(new Date(), "yyyy-MM-dd", { locale: es });
};

const data = reactive({
  nombreApellido: "",
  email: "",
  numeroTelefonico: "",
  extension: "",
  genero: "femenino",
  ciudadOrigen: "",
  ciudadDestino: "",
  tipoViaje: "Viaje de ida",
  fechaSalida: dateFormat(),
  fechaRegreso: dateFormat(),
  recibirCotizacion: "WhatsApp",
  optionViaje: "tiquetes",
  description: "",
  conditional: false,
  numeroPersonas: 1,
});

const formData = {
  nombreApellido: Joi.string()
    .required()
    .label("Nombre y Apellido")
    .error(() => '"Nombre y Apellido" no puede estar vacío'),
  email: Joi.string()
    .email()
    .required()
    .error(() => '"email" no puede estar vacío'),
  numeroTelefonico: Joi.number()
    .required()
    .label("Número telefónico")
    .error(() => '"Número telefónico" debe ser numérico'),
  genero: Joi.string()
    .valid("femenino", "masculino")
    .required()
    .error(() => '"genero" no puede estar vacío'),
  ciudadOrigen: Joi.string()
    .required()
    .label("Ciudad de origen")
    .error(() => '"Ciudad de origen" no puede estar vacío'),
  ciudadDestino: Joi.string()
    .required()
    .label("Ciudad de destino")
    .error(() => '"Ciudad de destino" no puede estar vacío'),
  tipoViaje: Joi.string()
    .valid("Viaje de ida", "Viaje de ida y vuelta")
    .required()
    .label("tipo de Viaje"),
  fechaSalida: Joi.date().iso().optional().allow(""),
  fechaRegreso: Joi.date().iso().optional().allow(""),
  recibirCotizacion: Joi.string()
    .valid("WhatsApp", "Correo Electronico")
    .required()
    .label("Recibir cotizacion"),
  optionViaje: Joi.string()
    .valid("Plan completo (vuelos, hotel y tours)", "tiquetes")
    .required()
    .label("opciones de viaje"),
  description: Joi.string().optional().allow(""),
  conditional: Joi.boolean()
    .valid(true)
    .required()
    .label("Términos y condiciones")
    .error(() => '"Términos y condiciones" deben ser aceptados'),
  numeroPersonas: Joi.number()
    .required()
    .label("Número de personas")
    .error(() => '"Número telefónico" debe ser numérico'),
};

const extent = [
  { country: "Estados unidos", value: "🇺🇸", phone: "+1" },
  { country: "España", value: "🇪🇸", phone: "+51" },
  { country: "Francia", value: "🇫🇷", phone: "+33" },
  { country: "Italia", value: "🇮🇹", phone: "+39" },
  { country: "Colombia", value: "🇨🇴", phone: "+57" },
  { country: "Ecuador", value: "🇪🇨", phone: "+593" },
  { country: "Peru", value: "🇵🇪", phone: "+51" },
  { country: "Chile", value: "🇨🇱", phone: "+56" },
  { country: "Argentina", value: "🇦🇷", phone: "+54" },
  { country: "Brazil", value: "🇧🇷", phone: "+55" },
  { country: "Mexico", value: "🇲🇽", phone: "+52" },
  { country: "Uruguay", value: "🇺🇾", phone: "+598" },
  { country: "Bolivia", value: "🇧🇴", phone: "+591" },
  { country: "Paises Bajos", value: "🇳🇱", phone: "+31" },
  { country: "Venezuela", value: "🇻🇪", phone: "+58" },
  { country: "Paraguay", value: "🇵🇾", phone: "+595" },
  { country: "Germania", value: "🇩🇪", phone: "+49" },
  { country: "Japon", value: "🇯🇵", phone: "+81" },
  { country: "South Korea", value: "🇰🇷", phone: "+82" },
  { country: "China", value: "🇨🇳", phone: "+86" },
];

const numberOfPersons = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
  { value: 11 },
  { value: 12 },
  { value: 13 },
  { value: 14 },
  { value: 15 },
  { value: 16 },
  { value: 17 },
  { value: 18 },
  { value: 19 },
  { value: 20 },
];

function flagSelect(ev) {
  numberVar.value = ev;
}

const errorObject = reactive({
  errorName: "",
  errorMessage: "",
});

const hasError = computed(() => {
  return (property) => {
    return errorObject.errorName === property;
  };
});

function toggleConditional() {
  showModal.value = true;
}

const itemsCloset = () => {
  showModal.value = false;
  data.conditional = true;
};

const formatDate = (date = new Date()) => {
  const year = date.toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
  });

  const month = date.toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    month: "2-digit",
  });

  const day = date.toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    day: "2-digit",
  });

  return [year, month, day].join("-");
};

let formatted_date = formatDate(new Date());

function createButton() {
  const resultFrom = Joi.validate(
    data,
    formData,
    { allowUnknown: true },
    async (err, value) => {
      if (err) {
        let starForm = err.message;
        let starIndex = starForm.indexOf("[") + 1;
        let endIndex = starForm.indexOf("]");
        let element = starForm.substring(starIndex, endIndex);

        let cadena2 = element;

        const string = cadena2.slice(1);
        const string2 = string.indexOf('"');
        const final = string.slice(0, string2);
        let messageIndix = string.slice(string2 + 1);

        errorObject.errorName = final;
        errorObject.errorMessage = final + " " + messageIndix;

      } else {
        loadModule.value = true;
        await makeRequest("information-request/create", {}, "POST", {
          Bank: "1",
          Category: "1",
          Title: "quote",
          DateTransaction: formatted_date,
          DateTransaction: "2024-01-17",
          nombreApellido: data.nombreApellido,
          email: data.email,
          numeroTelefonico: data.numeroTelefonico.toString(),
          Telefono: numberVar.value,
          genero: data.genero,
          ciudadOrigen: data.ciudadOrigen,
          ciudadDestino: data.ciudadDestino,
          tipoViaje: data.tipoViaje,
          fechaSalida: new Date(data.fechaSalida).toISOString(),
          fechaRegreso: new Date(data.fechaRegreso).toISOString(),
          recibirCotizacion: data.recibirCotizacion,
          optionViaje: data.optionViaje,
          Description: data.description,
          conditional: data.conditional,
          amountPersons: data.numeroPersonas
        });
        data.nombreApellido = "";
        data.email = "";
        data.numeroTelefonico = "";
        data.genero = "";
        data.ciudadOrigen = "";
        data.ciudadDestino = "";
        data.tipoViaje = "";
        data.fechaSalida = "";
        data.fechaRegreso = "";
        data.recibirCotizacion = "";
        data.optionViaje = "";
        data.description = "";
        data.conditional = "";
        loadModule.value = false;
        exictReg.value = true;
      }
    }
  );
}
</script>

<style lang="sass">
@import "../../sass/importComponent.scss"
</style>