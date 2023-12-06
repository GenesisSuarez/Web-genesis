<template>
  <ProgressCircular v-if="loadModule && !errorData" />
  <ErrorModal  v-if="errorData && !loadModule" />
  <RegistConfirm v-if="exictReg && !errorData" />
  <ConditionalOfQuote v-if="showModal" @accept-terms="itemsCloset" />
  <header class="arrow">
    <img
      @click="closetForm"
      class="arrow__leth"
      src="../../assets/flecha-left.svg"
      alt="atras"
    />
    <img class="logo" src="../../assets/logo.png" alt="" />
  </header>

  <div class="container-add">
    <p style="font-size: 20px; text-align: center; font-weight: bold; margin-top: 20px">
      Formulario de cotización
    </p>

    <form @submit.prevent="createButton" class="row g-3" style="padding: 15px">
      <p style="font-size: 16px">1. INFORMACIÓN DEL PAJAJERO</p>

      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Nombre y apellido</label>
        <input
          type="text"
          class="form-control"
          v-model="data.nombreApellido"
          :class="{ 'is-invalid': hasError('nombreApellido') }"
        />
        <div v-if="hasError('nombreApellido')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Email</label>
        <input
          type="text"
          class="form-control"
          placeholder="name@example.com"
          v-model="data.email"
          :class="{ 'is-invalid': hasError('email') }"
        />
        <div v-if="hasError('email')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="row" style="margin-top: 20px">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">Número telefonico</label>
          <div class="input-group mb-3">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ numberVar }}
            </button>
            <ul
              class="dropdown-menu"
              style="overflow-y: scroll; min-width: 20px; max-height: 120px"
            >
              <li
                @click="() => flagSelect(flag.phone)"
                v-for="(flag, i) in extent"
                :key="i"
              >
                <a class="dropdown-item">{{ flag.value }} {{ flag.phone }}</a>
              </li>
            </ul>
            <input
              type="text"
              class="form-control"
              placeholder="312357030"
              v-model="data.numeroTelefonico"
              :class="{ 'is-invalid': hasError('numeroTelefonico') }"
              min="1"
              max="15"
            />
            <div v-if="hasError('numeroTelefonico')" class="invalid-feedback">
              {{ errorObject.errorMessage }}
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <label
            for="inputEmail4"
            class="form-label"
            style="display: flex; margin-bottom: 15px"
            >Genero</label
          >

          <div class="form-check form-check-inline">
            <input
              v-model="data.genero"
              :class="{ 'is-invalid': hasError('genero') }"
              class="form-check-input"
              type="radio"
              name="genero"
              id="radioFemenino"
              value="femenino"
            />
            <label class="form-check-label" for="inlineCheckbox1">femenino</label>
          </div>

          <div class="form-check form-check-inline">
            <input
              v-model="data.genero"
              :class="{ 'is-invalid': hasError('genero') }"
              class="form-check-input"
              type="radio"
              name="genero"
              id="radioMasculino"
              value="masculino"
            />
            <label class="form-check-label" for="inlineCheckbox2">masculino</label>
            <div v-if="hasError('genero')" class="invalid-feedback">
              {{ errorObject.errorMessage }}
            </div>
          </div>
        </div>
      </div>

      <p style="font-size: 16px">2. INFORMACIÓN DE VIAJE</p>

      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Ciudad de origen</label>
        <input
          type="text"
          class="form-control"
          v-model="data.ciudadOrigen"
          :class="{ 'is-invalid': hasError('ciudadOrigen') }"
        />
        <div v-if="hasError('ciudadOrigen')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label for="inputEmail4" class="form-label">Ciudad de destino</label>
        <input
          type="text"
          class="form-control"
          v-model="data.ciudadDestino"
          :class="{ 'is-invalid': hasError('ciudadDestino') }"
        />
        <div v-if="hasError('ciudadDestino')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label for="tipoViaje" class="form-label">Selecciona el tipo de viaje</label>
        <select
          id="tipoViaje"
          class="form-select"
          v-model="data.tipoViaje"
          :class="{ 'is-invalid': hasError('tipoViaje') }"
        >
          <option>Viaje de ida</option>
          <option>Viaje de ida y vuelta</option>
        </select>
        <div v-if="hasError('tipoViaje')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="col-md-6">
        <label for="fechaSalida" class="form-label">Fecha de salida</label>
        <input
          type="date"
          class="form-control"
          id="fechaSalida"
          v-model="data.fechaSalida"
          :class="{ 'is-invalid': hasError('fechaSalida') }"
        />
        <div v-if="hasError('fechaSalida')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div
        id="contenedorFechas"
        class="row"
        style="margin-top: 20px"
        v-if="data.tipoViaje === 'Viaje de ida y vuelta'"
      >
        <div class="col-md-6">
          <label for="fechaRegreso" class="form-label">Fecha de regreso</label>
          <input
            type="date"
            class="form-control"
            id="fechaRegreso"
            v-model="data.fechaRegreso"
            :class="{ 'is-invalid': hasError('fechaRegreso') }"
          />
        </div>
        <div v-if="hasError('fechaRegreso')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="row" style="margin-top: 20px">
        <div class="col-md-6">
          <label for="recibirCotizacion" class="form-label"
            >Donde desea recibir la cotización</label
          >
          <select
            id="recibirCotizacion"
            class="form-select"
            v-model="data.recibirCotizacion"
            :class="{ 'is-invalid': hasError('recibirCotizacion') }"
          >
            <option>WhatsApp</option>
            <option>Correo Electrónico</option>
          </select>
          <div v-if="hasError('recibirCotizacion')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <div class="col-md-6">
          <label
            for="inputEmail4"
            class="form-label"
            style="display: flex; margin-bottom: 15px"
            >Opciones que incluye el viaje:</label
          >

          <div class="form-check form-check-inline">
            <input
              v-model="data.optionViaje"
              :class="{ 'is-invalid': hasError('optionViaje') }"
              class="form-check-input"
              type="radio"
              name="optionViaje"
              id="radioOption"
              value="Option"
            />
            <label class="form-check-label" for="inlineCheckbox1"
              >Plan completo (vuelos, hotel y tours)</label
            >
          </div>

          <div class="form-check form-check-inline">
            <input
              v-model="data.optionViaje"
              :class="{ 'is-invalid': hasError('optionViaje') }"
              class="form-check-input"
              type="radio"
              name="optionViaje"
              id="radioTiquete"
              value="tiquetes"
            />
            <label class="form-check-label" for="inlineCheckbox2">Solo tiquetes</label>

            <div v-if="hasError('optionViaje')" class="invalid-feedback">
              {{ errorObject.errorMessage }}
            </div>
          </div>
        </div>
      </div>

      <div class="form-floating">
        <textarea
          class="form-control"
          v-model="data.description"
          id="floatingTextarea2"
          style="height: 100px"
        ></textarea>
        <label for="floatingTextarea2">Peticiones adicionales</label>
      </div>

      <div class="button__container">
        <input
          class="form-check-input"
          type="checkbox"
          id="btnModalOpen"
          v-model="data.conditional"
          :class="{ 'is-invalid': hasError('conditional') }"
        />

        <label
          @click="toggleConditional"
          class="form-check-label"
          for="btnModalOpen"
          style="margin-left: 15px"
        >
          Leer términos y condiciones
        </label>
        <div v-if="hasError('conditional')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div style="margin-top: 30px; display: grid; justify-items: center" class="col-12">
        <button type="submit" class="btn btn-success">Registrar</button>
      </div>
    </form>
  </div>
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
  genero: "",
  ciudadOrigen: "",
  ciudadDestino: "",
  tipoViaje: "Viaje de ida",
  fechaSalida: dateFormat(),
  fechaRegreso: dateFormat(),
  recibirCotizacion: "WhatsApp",
  optionViaje: "",
  description: "",
  conditional: false,
});

const formData = {
  nombreApellido: Joi.string().required(),
  email: Joi.string().email().required(),
  numeroTelefonico: Joi.number().required(),
  genero: Joi.string().valid("femenino", "masculino").required(),
  ciudadOrigen: Joi.string().required(),
  ciudadDestino: Joi.string().required(),
  tipoViaje: Joi.string().valid("Viaje de ida", "Viaje de ida y vuelta").required(),
  fechaSalida: Joi.date().iso().optional().allow(""),
  fechaRegreso: Joi.date().iso().optional().allow(""),
  recibirCotizacion: Joi.string().valid("WhatsApp", "Correo Electrónico").required(),
  optionViaje: Joi.string().valid("Option", "tiquetes").required(),
  description: Joi.string().optional().allow(""),
  conditional: Joi.boolean().valid(true).required(),
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

let current_datetime = new Date();

let formatted_date =
  current_datetime.getFullYear() +
  "-" +
  (current_datetime.getMonth() + 1) +
  "-" +
  current_datetime.getDate() +
  " " +
  current_datetime.getHours() +
  ":" +
  current_datetime.getMinutes() +
  ":" +
  current_datetime.getSeconds();

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
        console.log("final", final);
        console.log("final2", messageIndix);
      } else {
        loadModule.value = true;
        await makeRequest("information-request/create", {}, "POST", {
          Bank: "1",
          Category: "1",
          Title: "quote",
          DateTransaction: formatted_date,
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
