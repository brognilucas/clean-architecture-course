import { mount } from '@vue/test-utils';
import CreatePassenger from '../src/components/CreatePassenger.vue'

test("should be able to create a passenger", async () => {
  const wrapper = mount(CreatePassenger, {
    global: { 
      provide: {
        createPassengerGateway: {
          save: async () => Promise.resolve({
            passengerId: 'passenger-id'
          })
        }
      }
    }
  });

  const passengerNameField = await wrapper.get("#passsenger-name");
  const passengerEmailField = await wrapper.get("#passsenger-email");
  const passengerDocumentField = await wrapper.get("#passsenger-document");
  const createPassengerButton = await wrapper.get("#create-passenger-button")

  passengerNameField.setValue("Lucas Brogni")
  passengerDocumentField.setValue("09572038966");
  passengerEmailField.setValue("lucas.brogni@taxdoo.com");
  
  await createPassengerButton.trigger("click");
  const passengerId = await wrapper.get("#passenger-id")

  expect(passengerId.text()).toBe("passenger-id");
})