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
    const response = await fetch(`${apiUrl}/api/v1/get-clients`);
    const data = await response.json();
    users.value = data.clients;
    console.log('users.value', users.value);
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});

const deleteUser = async (id: number) => {
    const toaster = useToaster(); // Initialize toaster

    try {
        // Make the API call to delete the user
        await fetch(`${apiUrl}/api/v1/delete-user/${id}`, {
            method: 'POST',
        });

        // Update the users list by filtering out the deleted user
        users.value = users.value.filter((user) => user.id !== id);

        // Show a success toaster message
        toaster.clearAll();
        toaster.show({
            title: 'Success',
            message: 'Client deleted successfully!',
            color: 'success',
            icon: 'ph:check',
            class: 'end-2 top-2',
            closable: true,
        });

    } catch (error) {
        // Handle errors and show an error toaster message
        console.error('Error deleting Client:', error);
        toaster.clearAll();
        toaster.show({
            title: 'Error',
            message: 'Failed to delete Client. Please try again.',
            color: 'danger',
            icon: 'ph:x',
            class: 'end-2 top-2',
            closable: true,
        });
    }
};


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
                          All Clients
                        </BaseHeading>
                    </div>

                    <div class="mt-7 overflow-x-auto">
                        <div v-if="!users || users.length === 0">
                            <BasePlaceholderPage title="Nothing to show"
                                subtitle="It looks like there are no clients in the database at the moment. Please add or import client information to see it listed here." />
                        </div>
                        <table v-else class="w-full whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th class="py-2 text-left">#</th>
                                    <th class="py-2 text-left">Name</th>
                                    <th class="px-4 py-2 text-left">Email</th>
                                    <th class="px-4 py-2 text-left">Register at</th>
                                    <!-- <th class="px-4 py-2 text-left">Edit</th> -->
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
                                      {{ user.first_name ?? '' }} {{ user.last_name  ?? ''}}
                                    </BaseText>
                                  </td>
                                  <td class="px-4 py-2">
                                    <BaseText size="sm" weight="semibold" lead="none" class="text-muted-800 dark:text-muted-100">
                                      {{ user.email }}
                                    </BaseText>
                                  </td>
                                  <td class="px-4 py-2">
                                    <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                                      {{ new Date(user.created_at).toLocaleDateString() }}
                                    </BaseText>
                                  </td>
                                  <!-- <td class="px-4 py-2">
                                    <NuxtLink :to="`/dashboards/edit-user/${user.id}`" class="text-blue-500 hover:underline">Edit</NuxtLink>
                                  </td> -->
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
