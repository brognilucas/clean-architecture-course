import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AxiosAdapter from './adapters/AxiosAdapter'
import PassengerGateway from './gateway/passenger/PassengerHttpGateway'
import DriverHttpGateway from './gateway/driver/DriverHttpGateway'

const app = createApp(App)

const httpClient = new AxiosAdapter();

app.provide("passengerGateway", new PassengerGateway(httpClient));
app.provide("driverGateway", new DriverHttpGateway(httpClient)); 

app.mount('#app')

