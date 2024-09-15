<script setup lang="ts">

import { Field, useFieldError, useForm } from 'vee-validate'
import { AddonInputPhone } from '#components'

definePageMeta({
  title: 'Activity',
  preview: {
    title: 'Personal dashboard v1',
    description: 'For personal usage and reports',
    categories: ['dashboards'],
    src: '/img/screens/dashboards-personal-1.png',
    srcDark: '/img/screens/dashboards-personal-1-dark.png',
    order: 1,
  },
})


// my code 
import { useAuthStore } from '~/stores/auth'
const route = useRoute()
const authStore = useAuthStore()
const toaster = useToaster()

// define api_route
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

// Define reactive form fields
const first_name = ref('')
const last_name = ref('')

const email = ref('')
const phone = ref('')
const service = ref('')
const address = ref('')
const city = ref('')
const state = ref('')
const zipcode = ref('')


// submnit handleSubmit
function handleSubmit() {
  // Prepare the data payload
  const payload = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    phone: phone.value,
    service: service.value,
    address: address.value,
    city: city.value,
    state: state.value,
    zipcode: zipcode.value,
    
    // password: password.value,
    // confirm_password: confirm_password.value
  }

  // Send the data using fetch
  fetch(`${apiUrl}/api/v1/add-hairdresser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle the response data (e.g., navigate to a confirmation page)
      
      toaster.clearAll()
      toaster.show({
        title: 'Success',
        message: `Hairdresser Save successfully!`,
        color: 'success',
        icon: 'ph:check',
        class: 'end-2 top-2',
        closable: true,
      })
     
      navigateTo('/dashboards/hairdresser')
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error (e.g., display an error message)
    });
}

definePageMeta({
  middleware: ['auth']
})

</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
    <!-- ========================================================= -->
     <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
      <BaseCard rounded="sm" class="p-4 md:p-8">
        <div class="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-12">
          <div class="col-span-12 mb-10 text-gray-600 sm:col-span-3 sm:mb-0">
            <BaseHeading
              as="h2"
              size="lg"
              weight="medium"
            >
              New Doctor
            </BaseHeading>
            <BaseText
              size="xs"
              class="text-muted-400"
            >
              Fill in the required fields
            </BaseText>
          </div>

          <div class="ltablet:col-span-9 col-span-12 space-y-10 lg:col-span-9">
            <TairoFormGroup
              label="General info"
              sublabel="Some general information"
            >
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12 md:col-span-6">
                  <Field
                    name="doctor.firstName"
                  >
                    <BaseInput
                      label="First name"
                      icon="ph:user-duotone"
                      placeholder="Ex: John"
                      v-model="first_name"
                      type="text"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-6">
                  <Field
                    name="doctor.lastName"
                  >
                    <BaseInput
                      label="Last name"
                      icon="ph:user-duotone"
                      placeholder="Ex: Doe"
                      v-model="last_name"
                      type="text"
                    />
                  </Field>
                </div>

                <div class="col-span-12 md:col-span-6">
                  <Field
                    name="doctor.email"
                  >
                    <BaseInput
                      label="Email Address"
                      icon="ph:envelope-duotone"
                      placeholder="Ex: johndoe@gmail.com"
                      v-model="email"
                      type="email"
                    />
                  </Field>
                </div>
                <div class="col-span-12 md:col-span-6">
                <Field
                    name="hairdresser.service"
                  >
                    <BaseSelect
                      label="Service"
                      icon="ph:scissors-duotone"
                      v-model="service"
                    >
                      <option value="service" hidden />
                      <option value="Haircut">
                        Haircut
                      </option>
                      <option value="Coloring">
                        Coloring
                      </option>
                      <option value="Styling">
                        Styling
                      </option>
                      <option value="Perm">
                        Perm
                      </option>
                      <option value="Treatment">
                        Treatment
                      </option>
                    </BaseSelect>
                  </Field>
                  </div>


                <div class="col-span-12">
                  <Field
                    name="phone"
                  >
                    <AddonInputPhone
                      ref="inputPhoneRef"
                      label="Emergency Phone"
                      placeholder="Ex: +1 555 555 5555"
                      icon="lucide:phone"
                      v-model="phone"
                    />
                  </Field>
                </div>

                <!-- <div class="col-span-12">
                  <Field
                    name="discription"
                  >
                    <BaseTextarea
                      label="Discription"
                      placeholder="Ex: General Orthopedic Surgery, Foot & Ankle Surgery"
                      rows="3"
                      v-model="discription"
                    />
                  </Field>
                </div> -->

              </div>
            </TairoFormGroup>

            <TairoFormGroup
              label="Personal info"
              sublabel="Some personal information"
            >
              <div class="grid grid-cols-12 gap-4">
                <div class="col-span-12">
                  <Field
                    name="address"
                  >
                    <BaseInput
                      label="Address / Street"
                      icon="ph:map-pin-duotone"
                      placeholder="Ex: App 2 suite g3 santa monica"
                      v-model="address"
                    />
                  </Field>
                </div>
                <div class="col-span-12 sm:col-span-4">
                  <Field
                    name="city"
                  >
                    <BaseInput
                      label="City"
                      icon="ph:buildings-duotone"
                      placeholder="Ex: Los Angeles"
                      v-model="city"
                    />
                  </Field>
                </div>
                <div class="col-span-12 sm:col-span-4">
                  <Field
                    name="doctor.state"
                  >
                    <BaseInput
                      label="State/Province"
                      icon="ph:globe-duotone"
                      placeholder="Ex: CA"
                      v-model="state"
                    />
                  </Field>
                </div>
                <div class="col-span-12 sm:col-span-4">
                  <Field
                    
                    name="zipcode"
                  >
                    <BaseInput
                      type="text"
                      label="Zip Code"
                      icon="ph:paper-plane-tilt-duotone"
                      placeholder="Ex: 912656"
                      v-model="zipcode"
                    />
                  </Field>
                </div>
                
              </div>
            </TairoFormGroup>

            <div class="text-right md:col-span-12">
              <div
                class="-mt-4 inline-flex w-full items-center justify-end gap-2 sm:w-auto"
              >
                <BaseButton
                  type="submit"
                  color="primary"
                  class="!h-12 w-full sm:w-40"
                >
                  Submit
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
</form>

  </div>
</template>
