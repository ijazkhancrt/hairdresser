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
const toaster = useToaster()

// define api_route
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

definePageMeta({
    middleware: ['auth']
})

// api calls 
const users = ref([]);
// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/get-hairdresser`);
    const data = await response.json();
    users.value = data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

// Method to handle user deletion
const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/delete-user/${id}`, {
      method: 'POST',
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Failed to delete user');
    }
    
    // Update the local users array
    users.value = users.value.filter((user) => user.id !== id);

    // Show success toaster message
    const toaster = useToaster();
    toaster.clearAll(); // Clear previous messages if any
    toaster.show({
      title: 'Success',
      message: `Hairdresser deleted successfully!`,
      color: 'success',
      icon: 'ph:check',
      class: 'end-2 top-2',
      closable: true,
    });
  } catch (error) {
    console.error('Error deleting user:', error);

    // Show error toaster message
    const toaster = useToaster();
    toaster.clearAll(); // Clear previous messages if any
    toaster.show({
      title: 'Error',
      message: `Failed to delete user: ${error.message}`,
      color: 'danger',
      icon: 'ph:x',
      class: 'end-2 top-2',
      closable: true,
    });
  }
}



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
                         Hairdresser
                        </BaseHeading>
                        
                        <BaseButton color="default" class="w-full sm:w-auto">
                          <NuxtLink  to="/dashboards/add-hairdresser">Create New Booking</NuxtLink>
                        </BaseButton>
                        
                      </div>
                      
                   

                    <div class="mt-7 overflow-x-auto">
                        <div v-if="data === 0">
                            <BasePlaceholderPage title="Nothing to show"
                                subtitle="Looks like there are no transactions to show for this recipient. Come back one you have sent or received money from this recipient." />
                        </div>
                        <table v-else class="w-full whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th class="py-2 text-left">#</th>
                                    <th class="py-2 text-left">Name</th>
                                    <th class="px-4 py-2 text-left">Email</th>
                                    <th class="px-4 py-2 text-left">Phone</th>
                                    <th class="px-4 py-2 text-left">Service</th>
                                    <th class="px-4 py-2 text-left">Register at</th>
                                    <th class="px-4 py-2 text-left">Edit</th>
                                    <th class="px-4 py-2 text-left">Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(user, index) in users" :key="user.id" tabindex="0">
                                  <td class="py-2">
                                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-400">
                                      {{ index + 1 }}
                                    </BaseText>
                                  </td>
                                  <td class="py-2">
                                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                                      {{ user.name ?? 'N/A' }}
                                    </BaseText>
                                  </td>
                                  <td class="px-4 py-2">
                                    <BaseText size="sm" weight="semibold" lead="none" class="text-muted-800 dark:text-muted-100">
                                      {{ user.email ?? 'N/A' }}
                                    </BaseText>
                                  </td>
                                  <td class="px-4 py-2">
                                    <BaseText size="sm" weight="semibold" lead="none" class="text-muted-800 dark:text-muted-100">
                                      {{ user.phone ?? 'N/A' }}
                                    </BaseText>
                                  </td>
                                  <td class="px-4 py-2">
                                    <BaseText size="sm" weight="semibold" lead="none" class="text-muted-800 dark:text-muted-100">
                                      {{ user.service ?? 'N/A' }}
                                    </BaseText>
                                  </td>

                                  <td class="px-4 py-2">
                                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                                      {{ new Date(user.created_at).toLocaleDateString() }}
                                    </BaseText>
                                  </td>
                                  <td class="px-4 py-2">
                                    <NuxtLink :to="`/dashboards/edit-user/${user.id}`" class="text-blue-500 hover:underline">Edit</NuxtLink>
                                  </td>
                                  <td class="px-4 py-2">
                                    <button @click="deleteUser(user.id)" class="text-red-500 hover:underline">Delete</button>
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
