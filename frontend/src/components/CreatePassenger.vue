<script setup lang="ts">
  import { inject, ref } from 'vue';
  import Passenger from '../entities/Passenger';
  import PassengerGateway from '../gateway/passenger/PassengerGateway';

  const passengerGateway = inject("passengerGateway") as PassengerGateway;
  const passenger = ref(new Passenger());
  const passengerId = ref("");

  async function createPassenger() {
    const gatewayOutput = await passengerGateway.save(passenger.value); 
    passengerId.value = gatewayOutput.passengerId;
  } 

</script>

<template>
  <input type="text" v-model="passenger.name" id="passsenger-name" />
  <input type="text" v-model="passenger.email" id="passsenger-email" />
  <input type="text" v-model="passenger.document" id="passsenger-document" />

  <button @click="createPassenger()"  id="create-passenger-button">Create Passenger</button>

  <span id="passenger-id">{{passengerId}}</span>
</template>