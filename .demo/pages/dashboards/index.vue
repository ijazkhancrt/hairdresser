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

const areaCustomers = reactive(useAreaCustomers())
const radialBarTeam = reactive(useRadialBarTeam())
const barProfit = reactive(useBarProfit())

function useAreaCustomers() {
  const { primary, info, success } = useTailwindColors()
  const type = 'area'
  const height = 258

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: [primary.value, info.value, success.value],
    title: {
      show: false,
      text: undefined,
      align: 'left',
    },
    legend: {
      show: true,
      position: 'top',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2, 2, 2],
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2020-09-19T00:00:00.000Z',
        '2020-09-20T01:30:00.000Z',
        '2020-09-21T02:30:00.000Z',
        '2020-09-22T03:30:00.000Z',
        '2020-09-23T04:30:00.000Z',
        '2020-09-24T05:30:00.000Z',
        '2020-09-25T06:30:00.000Z',
      ],
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  }

  const series = shallowRef([
    {
      name: 'Returning',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Newcomers',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: 'Abandonned',
      data: [78, 53, 36, 10, 14, 5, 2],
    },
  ])

  return {
    type,
    height,
    options,
    series,
  }
}

function useRadialBarTeam() {
  const { primary } = useTailwindColors()
  const type = 'radialBar'
  const height = 455

  const options = {
    title: {
      text: undefined,
    },
    chart: {
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [primary.value],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: false,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2,
          },
        },
        hollow: {
          margin: 0,
          size: '40%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '22px',
          },
        },
      },
    },
    grid: {
      padding: {
        top: 80,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ['Average Results'],
  }

  const series = shallowRef([76])

  return {
    type,
    height,
    options,
    series,
  }
}

function useBarProfit() {
  const { primary } = useTailwindColors()
  const type = 'bar'
  const height = 255

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: string) {
        return val + '%'
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: string) {
          return val + '%'
        },
      },
    },
    colors: [primary.value],
    title: {
      text: undefined,
      align: 'left',
    },
  }

  const series = shallowRef([
    {
      name: 'Ratio',
      data: [2.3, 3.1, 4.0, 10.1, 4.0],
    },
  ])

  return {
    type,
    height,
    options,
    series,
  }
}

// my code 
// =============================== my code =========================
import { useAuthStore } from '~/stores/auth'
import { useRoute, useRouter } from 'vue-router';

// define api_route
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

const route = useRoute();
const router = useRouter();


const authStore = useAuthStore()

const data = 1;

// middleware for authentication
definePageMeta({
  middleware: ['auth']
})

 // Send the data using fetch
//  fetch('http://localhost:8000/api/v1/get-active-booking')
//   .then(response => response.json())
//   .then(data => console.log('Success:', data))
//   .catch(error => console.error('Error:', error));


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
    const response = await fetch(`${apiUrl}/api/v1/get-active-booking`);
    const data = await response.json();
    bookings.value = data.bookings;

    console.log('bookings.value', bookings.value);
    

  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
});


// =================== my code =========================

// Method to handle user update
const cancelBooking = async (id: number) => {
  console.log(id);
  const toaster = useToaster();  // Ensure the toaster instance is initialized

  try {
    const response = await fetch(`${apiUrl}/api/v1/cancel-booking/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
    
    // Update the local bookings array
    bookings.value = bookings.value.filter(booking => booking.id !== id);

    // Show the success message
    toaster.clearAll();  // Clear any previous toasts
    toaster.show({
      title: "Success",
      message: `Booking has been successfully canceled!`,
      color: "success",
      icon: "ph:check",
      class: "end-2 top-2",
      closable: true,
    });

    // Optionally navigate to a different page after updating
    // router.push('/dashboards/hairdresser');
  } catch (error) {
    console.error('Error canceling booking:', error);
    // Optionally show an error toaster message
    toaster.clearAll();  // Clear any previous toasts
    toaster.show({
      title: "Error",
      message: `Failed to cancel booking. Please try again.`,
      color: "danger",
      icon: "ph:x",
      class: "end-2 top-2",
      closable: true,
    });
  }
};


// completed Method 
const markCompleted = async (id: number) => {
  console.log(id);
  const toaster = useToaster();  // Ensure the toaster instance is initialized

  try {
    const response = await fetch(`${apiUrl}/api/v1/mark-completed/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
    
    // Update the local bookings array
    bookings.value = bookings.value.filter(booking => booking.id !== id);

    // Show the success message
    toaster.clearAll();  // Clear any previous toasts
    toaster.show({
      title: "Success",
      message: `Booking has been marked completed!`,
      color: "success",
      icon: "ph:check",
      class: "end-2 top-2",
      closable: true,
    });

    // Optionally navigate to a different page after updating
    // router.push('/dashboards/hairdresser');
  } catch (error) {
    console.error('Error canceling booking:', error);
    // Optionally show an error toaster message
    toaster.clearAll();  // Clear any previous toasts
    toaster.show({
      title: "Error",
      message: `Failed to cancel booking. Please try again.`,
      color: "danger",
      icon: "ph:x",
      class: "end-2 top-2",
      closable: true,
    });
  }
};

</script>

<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex flex-col justify-between md:flex-row md:items-center">
      <div
        class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full"
      >
        <BaseAvatar src="/img/avatars/2.svg" size="lg" />
        <div>
          <BaseHeading
            as="h2"
            size="xl"
            weight="light"
            lead="tight"
            class="text-muted-800 dark:text-white"
          >
            <span>Welcome back, {{authStore.user.name ?? ''}} </span>
          </BaseHeading>
          <BaseParagraph>
            <span class="text-muted-500">
              Happy to see you again on your dashboard.
            </span>
          </BaseParagraph>
        </div>
      </div>
      <div
        class="mt-4 flex items-center justify-center gap-2 md:mt-0 md:justify-start"
      >
        <BaseButton>
          <NuxtLink to="/dashboards/history">View All Booking</NuxtLink>
        </BaseButton>
        <BaseButton color="primary">
          <NuxtLink to="/dashboards/calendar">Create New Booking</NuxtLink>
        </BaseButton>
      </div>
    </div>
    <!-- Grid -->
    <div class="grid grid-cols-12 gap-6">
      <!-- Quick stats -->
      <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
        <BaseCard class="p-6">
          <div class="mb-6">
            <BaseHeading
              as="h3"
              size="md"
              weight="semibold"
              lead="tight"
              class="text-muted-800 dark:text-white"
            >
              <span>Your Quick Stats</span>
            </BaseHeading>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <!-- Grid item -->
            <div
              class="bg-muted-100/80 dark:bg-muted-700 flex items-center gap-2 rounded-md px-5 py-10"
            >
              <BaseIconBox
                size="md"
                class="bg-primary-100 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400 dark:border-primary-500 dark:border-2"
                rounded="full"
                color="none"
              >
                <Icon name="ph:nut-duotone" class="size-5" />
              </BaseIconBox>
              <div>
                <BaseHeading
                  as="h2"
                  size="md"
                  weight="semibold"
                  lead="tight"
                  class="text-muted-800 dark:text-white"
                > 
                <span>0</span>
                  <!-- <span>${{authStore.user.sales_this_month ?? }}</span> -->
                </BaseHeading>
                <BaseParagraph size="sm">
                  <span class="text-muted-500 dark:text-muted-400">
                    Sales this month
                  </span>
                </BaseParagraph>
              </div>
            </div>
            <!-- Grid item -->
            <div
              class="bg-muted-100/80 dark:bg-muted-700 flex items-center gap-2 rounded-md px-5 py-10"
            >
              <BaseIconBox
                size="md"
                class="bg-amber-100 text-amber-500 dark:border-2 dark:border-amber-500 dark:bg-amber-500/20 dark:text-amber-400"
                rounded="full"
                color="none"
              >
                <Icon name="ph:handshake-duotone" class="size-5" />
              </BaseIconBox>
              <div>
                <BaseHeading
                  as="h2"
                  size="md"
                  weight="semibold"
                  lead="tight"
                  class="text-muted-800 dark:text-white"
                >
                  <!-- <span>159</span> -->
                  <span>0$</span>
                  <!-- <span>{{authStore.user.new_user_count ?? 0}}$</span> -->
                </BaseHeading>
                <BaseParagraph size="sm">
                  <span class="text-muted-500 dark:text-muted-400">
                    New users
                  </span>
                </BaseParagraph>
              </div>
            </div>
            <!-- Grid item -->
            <div
              class="bg-muted-100/80 dark:bg-muted-700 flex items-center gap-2 rounded-md px-5 py-10"
            >
              <BaseIconBox
                size="md"
                class="bg-green-100 text-green-500 dark:border-2 dark:border-green-500 dark:bg-green-500/20 dark:text-green-400"
                rounded="full"
                color="none"
              >
                <Icon name="ph:sketch-logo-duotone" class="size-5" />
              </BaseIconBox>
              <div>
                <BaseHeading
                  as="h2"
                  size="md"
                  weight="semibold"
                  lead="tight"
                  class="text-muted-800 dark:text-white"
                >
                  <span>$0</span>
                </BaseHeading>
                <BaseParagraph size="sm">
                  <span class="text-muted-500 dark:text-muted-400">
                    Earned today
                  </span>
                </BaseParagraph>
              </div>
            </div>
            <!-- Grid item -->
            <div
              class="bg-muted-100/80 dark:bg-muted-700 flex items-center gap-2 rounded-md px-5 py-10"
            >
              <BaseIconBox
                size="md"
                class="bg-indigo-100 text-indigo-500 dark:border-2 dark:border-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-400"
                rounded="full"
                color="none"
              >
                <Icon name="ph:bank-duotone" class="size-5" />
              </BaseIconBox>
              <div>
                <BaseHeading
                  as="h2"
                  size="md"
                  weight="semibold"
                  lead="tight"
                  class="text-muted-800 dark:text-white"
                >
                  <!-- <span>6816.32</span> -->
                   <span>0</span>
                   <!-- <span>${{authStore.user.sales_this_month ?? 0}}</span> -->
                </BaseHeading>
                <BaseParagraph size="sm">
                  <span class="text-muted-500 dark:text-muted-400">
                    Total balance
                  </span>
                </BaseParagraph>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
      <!-- Area Chart card -->
      <div class="ltablet:col-span-6 col-span-12 lg:col-span-6">
        <BaseCard class="p-6">
          <!-- Title -->
          <div class="mb-6">
            <BaseHeading
              as="h3"
              size="md"
              weight="semibold"
              lead="tight"
              class="text-muted-800 dark:text-white"
            >
              <span>Customers</span>
            </BaseHeading>
          </div>
          <AddonApexcharts v-bind="areaCustomers" class="-ms-4" />
        </BaseCard>
      </div>
  <!--Transactions-->
  <div class="col-span-12">
    <BaseCard rounded="md" shadow="hover" class="p-8">
      <div class="mb-8 flex items-center justify-between">
        <BaseHeading
          as="h4"
          size="sm"
          weight="medium"
          lead="none"
          class="text-muted-400 uppercase"
        >
          Active Booking
        </BaseHeading>
      </div>
  
      <div class="mt-7 overflow-x-auto">
        <div v-if="!data || data.length === 0">
          <BasePlaceholderPage
            title="Nothing to show"
            subtitle="Looks like there are no booking to show for this recipient. Come back latter."
          />
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
                  {{ booking.time }}
                </BaseText>
              </td>
              <td class="px-4 py-2">
                <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                  <button class="btn btn-success bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500" @click="markCompleted(booking.id)">
                    Completed
                  </button>
                </BaseText>
                
                <BaseText size="sm" weight="medium" lead="none" class="text-muted-600 dark:text-muted-300">
                  <button class="btn btn-danger bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" @click="cancelBooking(booking.id)">
                    Cancel
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
