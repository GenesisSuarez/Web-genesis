import { ref } from "vue";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
});

export function useAsync() {

    const result = ref(null);
    const errorData = ref(null);
    const isLoading = ref(false);
    const cabecera = ref(null);
    const appStatus = ref(0);

    const makeRequest = async (path, params = {}, method = 'get', body) => {

        result.value = null;
        isLoading.value = true;

        try {
            const { data, headers, status } = await api(path, {
                params: params,
                method: method,
                data: body,
            });
            result.value = data;
            isLoading.value = false;
            cabecera.value = headers;
            appStatus.value = status;

        } catch (error) {
            isLoading.value = false;
            errorData.value = error;
            appStatus.value = 401;
        }
    };

    return {
        result,
        errorData,
        makeRequest,
        isLoading,
        cabecera,
        appStatus
    };
}