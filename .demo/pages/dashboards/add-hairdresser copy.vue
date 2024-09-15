<script setup lang="ts">
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
const authStore = useAuthStore()

// define api_route
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

const name = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirm_password = ref('')


// submnit handleSubmit
function handleSubmit() {
  // Prepare the data payload
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    confirm_password: confirm_password.value
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
    <!-- Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!--Transactions-->
      <div class="col-span-12">
        <BaseCard rounded="md" shadow="hover" class="p-8">
          <div class="mb-8 flex items-center justify-between">
            <BaseHeading as="h4" size="sm" weight="medium" lead="none" class="text-muted-400 uppercase">
              Add New Hairdresser
            </BaseHeading>
          </div>
          <!-- form -->
          <form @submit.prevent="handleSubmit">
            <BaseInput v-model="name" rounded="md" label="user name" placeholder="Ex: username" />

            <BaseInput v-model="email" rounded="md" label="Email" placeholder="emial@gmail.com" />

            <div class="max-w-md">
              <AddonInputPassword
                v-model="password"
                label="password"
              />
            </div>

            <div class="max-w-md">
              <AddonInputPassword
                v-model="confirm_password"
                label="Confirm Password"
              />
            </div>


            <button type="submit"
              class="nui-button nui-button-lg nui-button-rounded-sm nui-button-solid nui-button-primary w-full mt-3">
              <span>Submit</span>
            </button>

          </form>

          <div class="mt-7 overflow-x-auto">

          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
