<script setup lang="ts">

// my code 
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

definePageMeta({
  middleware: ['auth']
})

// define api_route
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

// functions

// Define the service descriptions
const serviceDescriptions = {
  "1": "Simple haircut for men",
  "2": "Simple haircut for men + Wash",
  "3": "Simple haircut for woman",
  "4": "Simple haircut for woman + Wash"
};

// Define a ref to hold booking data
const bookings = ref([]);

// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/get-all-bookings`);
    const data = await response.json();
    bookings.value = data.booking;
    console.log(data.booking);
    console.log(bookings.value);


  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
});


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
              Active Booking
            </BaseHeading>

            <BaseButton color="default" class="w-full sm:w-auto">
              <span>Create New Booking</span>
            </BaseButton>
            <!-- <BaseButton
                  color="primary"
                  size="sm"
                  variant="pastel"
                  rounded="md"
                >
                  View all
                </BaseButton> -->
          </div>

          <div class="mt-7 overflow-x-auto">
            <div v-if="!bookings || bookings.length === 0">
              <BasePlaceholderPage title="Nothing to show"
                subtitle="Looks like there are no transactions to show for this recipient. Come back once you have sent or received money from this recipient." />
            </div>
            <table v-else class="w-full whitespace-nowrap">
              <thead>
                <tr>
                  <th class="py-2 text-left">Name</th>
                  <th class="py-2">Email</th>
                  <th class="py-2">Phone</th>
                  <th class="py-2">Date</th>
                  <th class="py-2">Service</th>
                  <th class="py-2">Time</th>
                  <th class="py-2">Status</th>
                  <th class="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in bookings" :key="booking.id">
                  <td class="py-2">
                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                      {{ booking.first_name }} {{ booking.last_name }}
                    </BaseText>
                  </td>
                  <td class="px-4 py-2">
                    <BaseText size="sm" weight="semibold" lead="none" class="text-muted-800 dark:text-muted-100">
                      {{ booking.email }}
                    </BaseText>
                  </td>
                  <td class="px-4 py-2">
                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                      {{ booking.phone }}
                    </BaseText>
                  </td>
                  <td class="px-4 py-2">
                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                      {{ booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A' }}
                    </BaseText>
                  </td>
                  <td class="px-4 py-2">
                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                      {{ serviceDescriptions[booking.service] || 'Unknown Service' }}
                    </BaseText>
                  </td>
                  <td class="px-4 py-2">
                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                      actiave
                    </BaseText>
                  </td>
                  <td class="px-4 py-2">
                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                      {{ booking.time }}
                    </BaseText>
                  </td>
                  <td class="px-4 py-2">
                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                      <button
                        class="btn btn-danger bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Cancel Booking
                      </button>
                    </BaseText>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
