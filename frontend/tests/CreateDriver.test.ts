import CreateDriver from '../src/components/CreateDriver.vue';
import { mount } from '@vue/test-utils';

test("should create a driver ", async () => {

  const app = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway: {
          save: async () => ({
            driverId: 'driver-id'
          })
        },
      }
    }
  })


  await app.get("#driver-name").setValue("driver")
  await app.get("#driver-document").setValue("09572038966");
  await app.get("#driver-email").setValue("lucasbrogni16@gmail.com");
  await app.get("#driver-car-plate").setValue("AAA9999")

  await app.get("#btn-save-driver").trigger("click")

  expect(app.get("#driver-id")).toBeDefined();
}) 