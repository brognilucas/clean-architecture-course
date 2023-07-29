import { createApp } from 'vue'
import './style.css'
import CreatePassenger from './components/CreatePassenger.vue'
import AxiosAdapter from './adapters/AxiosAdapter'
import CreatePassgengerHttpGateway from './gateway/CreatePassengerHttpGateway'

const app = createApp(CreatePassenger)

const httpClient = new AxiosAdapter();

app.provide("createPassengerGateway", new CreatePassgengerHttpGateway(httpClient));

app.mount('#app')

