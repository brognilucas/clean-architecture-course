<script setup lang="ts">
  import { inject, ref } from 'vue';
  import Driver from '../entities/Driver';
  import DriverGateway from '../gateway/driver/DriverGateway';

  const driverGateway = inject("driverGateway") as DriverGateway;
  const driver = ref(new Driver());
  const driverId = ref("");

  async function createDriver() {
    const gatewayOutput = await driverGateway.save(driver.value); 
    driverId.value = gatewayOutput.driverId;
  } 

</script>

<template>
  <input type="text" v-model="driver.name" id="driver-name" />
  <input type="text" v-model="driver.email" id="driver-email" />
  <input type="text" v-model="driver.document" id="driver-document" />
  <input type="text" v-model="driver.carPlate" id="driver-car-plate" />

  <button @click="createDriver()" id="btn-save-driver">Create driver</button>

  <span id="driver-id">{{driverId}}</span>
</template>