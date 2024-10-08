<script setup lang="ts">
import {
  format,
  isPast,
  isToday,
  startOfWeek,
  startOfDay,
  endOfWeek,
  endOfDay,
  addDays,
  addMinutes,
  roundToNearestMinutes,
} from "date-fns";
import { Calendar } from "v-calendar";
import { Container, Draggable } from "vue3-smooth-dnd";

import "v-calendar/dist/style.css";
import "~/assets/css/vcalendar-weekly.css";
import "~/assets/css/vcalendar.css";

import {
  type VCalendarAttribute,
  type CalendarCustomAttribute,
  type CalendarSettings,
  type CalendarEvent,
  dateToTop,
  datesToHeight,
  topToDate,
  categoryTheme,
  useCalendarEvents,
  useDateRange,
  useNowMarker,
  useDragEvent,
  useDragEventPending,
  useCreateEvent,
  useViewPan,
} from "~/utils/bundles/calendar";

definePageMeta({
  title: "Calendar",
  layout: "empty",
  preview: {
    title: "Calendar app",
    description: "For email and messaging apps",
    categories: ["dashboards"],
    src: "/img/screens/dashboard-calendar.png",
    srcDark: "/img/screens/dashboard-calendar-dark.png",
    order: 25,
  },
});

const scrollCalendarRef = ref<HTMLElement>();
const showSettings = ref(false);
const settings = reactive<CalendarSettings>({
  hideWeekends: false,
  hourOpen: 8,
  hourClose: 18,
  hourPrecision: 15,
  hourHeight: 160,
  dayOffsetY: 0,
  weekStartsOn: 0,
});
function getChildPayload(index: number) {
  return pendingEvents.value?.[index - 1];
}

const { fromDate, toDate, weekdays, onPageChange } = useDateRange(settings);
const { calendarEvents, pendingEvents } = useCalendarEvents({
  fromDate,
  toDate,
});

const {
  isHeightDragging,
  isPositionDragging,
  onHeightDragStart,
  onPositionDragStart,
} = useDragEvent(
  settings,
  calendarEvents,
  // on drag end
  async (event) => {
    // update event
  }
);

const { onCalendarClick, clearNew, hasNew } = useCreateEvent(
  settings,
  calendarEvents,
  // new event template
  (date) => ({
    startDate: date,
    endDate: addMinutes(date, 30),
    duration: 30,
    category: "none",
    title: "",
    participants: [],
  }),
  // can create new event
  () => {
    return !(
      isHeightDragging.value ||
      isPositionDragging.value ||
      isViewPaning.value
    );
  },
  // on create
  async (event) => {
    calendarEvents.value.push(event);
    onSelectEvent(event.customData);
  }
);

const selectedEventId = ref<string>();
// const selectedEvent = computed(() => {
//   return (
//     calendarEvents.value.find(
//       event => event?.customData?.id === selectedEventId.value,
//     )?.customData
//     || pendingEvents.value.find(event => event.id === selectedEventId.value)
//   )
// })
function onSelectEvent(event: CalendarEvent) {
  if (event.id !== "new" && hasNew.value) {
    clearNew();
  }

  selectedEventId.value = event.id;
}

const { now, showNow } = useNowMarker(scrollCalendarRef, settings);
const { isViewPaning, isViewMoved } = useViewPan(scrollCalendarRef, () => {
  return !(isHeightDragging.value || isPositionDragging.value);
});

const { isPendingEventDragging, onPendingEventDragStart } = useDragEventPending(
  settings,
  calendarEvents,
  // on drag end
  (event) => {
    onSelectEvent(event.customData);
    calendarEvents.value.push(event);

    const idx = pendingEvents.value.findIndex(
      (item) => item.id === event.customData.id
    );
    if (idx === -1) {
      return;
    }
    pendingEvents.value.splice(idx, 1);
  }
);

const isDragging = computed(
  () =>
    isPendingEventDragging.value ||
    isPositionDragging.value ||
    isHeightDragging.value
);

function scrollCalendarToTop(top = 0, behavior: ScrollBehavior = "smooth") {
  if (!scrollCalendarRef.value) {
    return;
  }

  scrollCalendarRef.value.scrollTo({
    top,
    behavior,
  });
}

function updateHeight(height = 160) {
  if (!scrollCalendarRef.value) {
    return;
  }

  const top = scrollCalendarRef.value.scrollTop;
  const initialDate = topToDate(settings, top);

  settings.hourHeight = height;

  if (!initialDate) {
    return;
  }

  nextTick(() => {
    scrollCalendarToTop(dateToTop(settings, initialDate), "instant");
  });
}
const selectedEventFeatures = computed({
  get() {
    return selectedEvent.value?.features
      ? Object.keys(selectedEvent.value?.features)
      : [];
  },
  set(values: string[]) {
    if (!selectedEvent.value) {
      return;
    }

    selectedEvent.value.features = values.reduce((acc, value) => {
      acc[value] = true;
      return acc;
    }, {} as Record<string, boolean>);
  },
});

// my coden
// Function to send booking data to the backend
import { ref, computed, reactive } from "vue";
import { useAuthStore } from '~/stores/auth'
const { token } = useAuthStore()

// define api_route
const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

const categories = [
  { title: "Simple haircut for men", value: "Simple haircut for men" },
  {
    title: "Simple haircut for men + wash",
    value: "Simple haircut for men + wash",
  },
  { title: "Simple haircut for women", value: "Simple haircut for women" },
  {
    title: "Simple haircut for women + wash",
    value: "Simple haircut for women + wash",
  },
];

const hairdresser = ref([]);
const hairdresser_filter = ref([]);
const offDayBooking = ref({
  date: null,
  hairdresser: null,
});

const selectedEvent = ref({
  firstname: "",
  lastname: null,
  email: null,
  phone: null,
  service: null,
  hairdresser: null,
  date: null,
  time: null,
  participants: [],
  // Other fields...
});
const toaster = useToaster();
async function sendBookingData(event: CalendarEvent) {
  try {
    const response = await fetch("http://localhost:8000/api/v1/admin-booking", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Use backticks for template literals
        "Content-Type": "application/json", // Ensure this is included
      },
      body: JSON.stringify({
        firstname: event.firstname,
        lastname: event.lastname,
        email: event.email,
        phone: event.phone,
        service: event.service,
        hairdresser: event.hairdresser,
        date: event.date,
        time: event.time,
      }),
    });

    const data = await response.json();

   
      // Display server validation errors
      if (data.response === false && data.message === "Validation Error.") {
        // Get the first validation error message
        const firstErrorKey = Object.keys(data.data)[0];
        const firstErrorMessage = data.data[firstErrorKey][0];
        
        toaster.clearAll();
        toaster.show({
          title: "Validation Error",
          message: `Error: ${firstErrorMessage}`,
          color: "danger",
          icon: "ph:x",
          class: "end-2 top-2",
          closable: true,
        });
      } else if(data.response === false && data.message == "off day"){
        // Get the first validation error message
        toaster.show({
          title: "Validation Error",
          message: `The hairdresser has an off day on ${event.date}.`,
          color: "danger",
          icon: "ph:x",
          class: "end-2 top-2",
          closable: true,
        });
      
      } else {
      // Success
      console.log("Booking data sent successfully:", data);
      toaster.clearAll();
      toaster.show({
        title: "Success",
        message: "Hairdresser saved successfully!",
        color: "success",
        icon: "ph:check",
        class: "end-2 top-2",
        closable: true,
      });
    }
  } catch (error) {
    console.error("Error sending booking data:", error);
    toaster.clearAll();
    toaster.show({
      title: "Error",
      message: `An error occurred: ${error.message}`,
      color: "danger",
      icon: "ph:x",
      class: "end-2 top-2",
      closable: true,
    });
  }
}

async function offSDayForm() {
  try {
    const response = await fetch("http://localhost:8000/api/v1/booking-off", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Use backticks for template literals
        "Content-Type": "application/json", // Ensure this is included
      },
      body: JSON.stringify({
        hairdresser_id: offDayBooking.value.hairdresser,
        date: offDayBooking.value.date,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Off day booking data sent successfully:", data);
    if (data.response) {
      toaster.clearAll();
      toaster.show({
        title: "Success",
        message: "Off day Hairdresser saved successfully!",
        color: "success",
        icon: "ph:check",
        class: "end-2 top-2",
        closable: true,
      });
    } else {
      // Extract and display each error message separately
      toaster.clearAll();
      toaster.show({
        title: "error",
        message: "Please select hairdresser and date!",
        color: "danger",
        icon: "ph:cross",
        class: "end-2 top-2",
        closable: true,
      });  
      
    }
  } catch (error) {
    console.error("Error sending booking data:", error);
  }
}

function handleSubmit() {
  if (selectedEvent.value) {
    sendBookingData(selectedEvent.value);
  }
}

// get pending events
// Define the service descriptions
const serviceDescriptions = {
  "1": "Simple haircut for men",
  "2": "Simple haircut for men + Wash",
  "3": "Simple haircut for woman",
  "4": "Simple haircut for woman + Wash",
};

// Define a ref to hold booking data
const bookings = ref([]);
// get haridressers
const users = ref([]);

// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/get-active-booking",
    { method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Use backticks for template literals
        "Content-Type": "application/json", // Ensure this is included

      }
    });
    const data = await response.json();
    // Assuming the bookings array directly represents pending events
    bookings.value = data.booking;
    // You might need to filter or transform the data here
    pendingEvents.value = data.booking; // Example filter
    console.log('pendingEvents.value', pendingEvents.value);
    
    console.log(pendingEvents.value);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }

  // Fetch data on component mount
  try {
    const response = await fetch("http://localhost:8000/api/v1/get-hairdresser",
      { method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Use backticks for template literals
        "Content-Type": "application/json", // Ensure this is included

      }
    }
    );
    const data = await response.json();
    users.value = data.users;

    // Transform the data to match the expected format
    hairdresser.value = data.users.map((user:any) => ({
      name: user.name,
      value: user.id,
    }));

    // Transform the data to match the expected format and add the "all" option
    hairdresser.value = [
      { name: "all", value: 0 }, // Add this line to include the "all" option
      ...data.users.map((user:any) => ({
        name: user.name,
        value: user.id,
      })),
    ];

    console.log("users.value", users.value);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});
</script>

<template>
  <div
    class="dark:bg-muted-900 flex h-screen w-full select-none overflow-x-auto bg-white lg:overflow-hidden"
  >
    <!-- Sidebar -->
    <div
      class="border-muted-200 dark:border-muted-800/40 dark:bg-muted-800 fixed start-0 top-0 z-50 flex h-full w-20 flex-col items-center border-r bg-white lg:static"
    >
      <NuxtLink
        to="/dashboards"
        class="flex size-16 items-center justify-center"
      >
        <TairoLogo class="text-primary-600 h-10" />
      </NuxtLink>
      <nav class="relative flex h-full flex-col">
        <!-- dashboard -->
        <NuxtLink
          href="/dashboards"
          class="relative flex size-16 items-center justify-center"
        >
          <div
            class="bg-muted-100 dark:bg-muted-700/60 text-muted-600 dark:text-muted-400 relative flex size-12 items-center justify-center rounded-xl"
          >
            <Icon name="ph:bookmark-simple-duotone" class="size-5" />
          </div>
        </NuxtLink>
        <!-- calandar -->
        <NuxtLink
          to="/dashboards/calendar"
          class="relative flex size-16 items-center justify-center"
        >
          <div
            class="bg-primary-500/10 text-primary-500 relative flex size-12 items-center justify-center rounded-xl"
          >
            <Icon name="ph:calendar-blank-duotone" class="size-5" />
          </div>
        </NuxtLink>

        <div class="mt-auto flex flex-col items-center">
          <div class="relative flex size-16 items-center justify-center">
            <DemoAccountMenu />
          </div>
        </div>
      </nav>
    </div>

    <div
      class="border-muted-200 dark:border-muted-800 ms-20 flex w-[1500px] border-t lg:ms-0 lg:w-full"
    >
      <!-- scrollable area -->
      <div
        ref="scrollCalendarRef"
        class="nui-slimscroll relative h-screen w-[1500px] grow space-y-14 overflow-auto lg:w-auto lg:overflow-x-hidden"
      >
        <!-- sticky header -->
        <div
          role="button"
          tabindex="-1"
          class="dark:bg-muted-900 sticky top-0 z-20 flex bg-white"
          @click="() => scrollCalendarToTop()"
        >
          <div class="border-muted-200 dark:border-muted-800 w-10 border-b" />
          <div
            class="border-muted-200 dark:border-muted-800 grid grow border-b"
            :class="[settings.hideWeekends ? 'grid-cols-5' : 'grid-cols-7']"
          >
            <span
              v-for="day of weekdays"
              :key="day.toISOString()"
              class="day-label text-muted-900 dark:text-muted-400 pointer-events-none flex h-[52px] items-center gap-2 p-3 text-sm"
              :class="[isPast(endOfDay(day)) ? 'opacity-50' : '']"
            >
              <span>{{ capitalize(format(day, "EEEE d")) }}</span>
              <span v-if="isToday(day)" class="text-primary-500 mb-[2px]">
                <Icon name="ph:calendar-blank-duotone" />
              </span>
            </span>
          </div>
        </div>
        <div class="!mt-0 flex">
          <!-- hours grid -->
          <div class="w-10">
            <div class="h-16" />
            <div>
              <div
                class="border-muted-200 dark:border-muted-800 pointer-events-none grow border-t"
              >
                <div
                  v-for="i in settings.hourClose - settings.hourOpen"
                  :key="i"
                  class="border-muted-200 dark:border-muted-800 relative border-b"
                  :style="{
                    height: `${settings.hourHeight}px`,
                  }"
                >
                  <span
                    class="dark:bg-muted-900 text-muted-900 dark:text-muted-300 absolute -top-2 left-1 bg-white px-2 text-xs"
                  >
                    {{ i + (settings.hourOpen - 1) }}h
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- calendar -->
          <div class="grow">
            <Calendar
              class="custom-calendar"
              :class="{
                'hide-weekend': settings.hideWeekends,
              }"
              view="weekly"
              expanded
              trim-weeks
              disable-page-swipe
              title-position="left"
              :first-day-of-week="
                settings.weekStartsOn !== undefined
                  ? ((settings.weekStartsOn + 1) as any)
                  : 1
              "
              :attributes="(calendarEvents as VCalendarAttribute[])"
              @update:pages="onPageChange"
            >
              <template #header-left-button="{ movePrev }">
                <BaseButtonIcon
                  rounded="full"
                  small
                  @click="movePrev"
                  @keydown.space.enter="movePrev"
                >
                  <Icon
                    name="lucide:chevron-left"
                    class="!top-auto !h-4 !w-4"
                  />
                </BaseButtonIcon>
              </template>
              <template #header-right-button="{ moveNext }">
                <BaseButtonIcon
                  rounded="full"
                  small
                  @click="moveNext"
                  @keydown.space.enter="moveNext"
                >
                  <Icon
                    name="lucide:chevron-right"
                    class="!top-auto !h-4 !w-4"
                  />
                </BaseButtonIcon>
              </template>
              <template
                #day-content="{
                  day,
                  attributes,
                }: {
                  day: any
                  attributes: CalendarCustomAttribute<CalendarEvent>[]
                }"
              >
                <div
                  role="button"
                  tabindex="0"
                  class="group relative z-10 flex h-full flex-col p-0"
                  :data-day="day.date"
                  :class="{
                    'pointer-events-none': isViewMoved,
                  }"
                  @dblclick="(event) => onCalendarClick(event, day.date)"
                >
                  <!-- current time marker -->
                  <div
                    v-if="day.isToday && showNow"
                    class="pointer-events-none absolute inset-x-0 z-50 h-px bg-red-500 before:block before:size-2 before:-translate-x-full before:translate-y-[-3px] before:rounded-full before:bg-red-600 before:content-['']"
                    :style="{
                      top: `${dateToTop(settings, now, day.date)}px`,
                    }"
                  />

                  <!-- hours grid -->
                  <div
                    class="border-muted-200 dark:border-muted-800 pointer-events-none grow border-t"
                  >
                    <div
                      v-for="i in settings.hourClose - settings?.hourOpen"
                      :key="i"
                      class="border-muted-200 dark:border-muted-800 relative border-b border-dashed"
                      :style="{
                        height: `${settings.hourHeight}px`,
                      }"
                    >
                      <div
                        v-for="j in 4"
                        :key="j"
                        class="border-muted-400 dark:border-muted-700 relative z-50 w-2 border-b"
                        :style="{
                          height: `${settings.hourHeight / 4}px`,
                        }"
                      >
                        <div
                          v-for="k in 2"
                          :key="k"
                          class="border-muted-300 dark:border-muted-800 relative z-50 w-1 border-b"
                          :style="{
                            height: `${settings.hourHeight / 12}px`,
                          }"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- day events -->
                  <template v-for="event in attributes" :key="event.key">
                    <div
                      class="pointer-events-none absolute end-4 start-4 z-50 rounded-md outline-2 outline-offset-2"
                      :class="{
                        'outline-dashed':
                          event.customData.id === 'new' &&
                          event.customData.id === selectedEventId,
                        outline:
                          event.customData.id !== 'new' &&
                          event.customData.id === selectedEventId,
                        [categoryTheme[event.customData.category].outline]:
                          event.customData.id === selectedEventId,
                      }"
                      :style="{
                        top: `${dateToTop(
                          settings,
                          event.customData.startDate,
                          day.date
                        )}px`,
                        height: `${
                          datesToHeight(
                            settings,
                            event.customData.startDate,
                            event.customData.endDate,
                            day.date
                          ) + 4
                        }px`,
                      }"
                    />

                    <div
                      role="button"
                      tabindex="0"
                      class="bg-muted-50 dark:bg-muted-800 border-muted-200 dark:border-muted-700 absolute end-4 start-4 z-10 cursor-pointer overflow-hidden rounded-t-md border border-b-0 text-xs"
                      :class="{
                        'opacity-50': isPast(endOfDay(day.date)),
                        'pointer-events-none': isDragging,
                      }"
                      :style="{
                        top: `${dateToTop(
                          settings,
                          event.customData.startDate,
                          day.date
                        )}px`,
                        height: `${datesToHeight(
                          settings,
                          event.customData.startDate,
                          event.customData.endDate,
                          day.date
                        )}px`,
                      }"
                      @click.stop="() => onSelectEvent(event.customData)"
                    >
                      <DemoCalendarEvent
                        :event="event"
                        @positiondrag="(e) => onPositionDragStart(event, e)"
                      />
                    </div>
                    <div
                      class="dark:border-muted-800 dark:bg-muted-700/50 dark:hover:bg-muted-700/80 absolute bottom-0 end-4 left-0 start-4 h-[4px] cursor-n-resize rounded-b-md border border-t-0 bg-slate-50 hover:bg-slate-200"
                      :style="{
                        top: `${
                          dateToTop(
                            settings,
                            event.customData.startDate,
                            day.date
                          ) +
                          datesToHeight(
                            settings,
                            event.customData.startDate,
                            event.customData.endDate,
                            day.date
                          )
                        }px`,
                      }"
                      :class="{
                        'pointer-events-none': isDragging,
                      }"
                      @pointerdown="(e) => onHeightDragStart(event, e)"
                    />
                  </template>
                </div>
              </template>
            </Calendar>
          </div>
        </div>
      </div>

      <!-- left panel -->
      <div
        class="border-muted-200 dark:border-muted-800 hidden w-72 shrink-0 border-s sm:block"
      >
        <!-- toolbar -->
        <div class="relative z-20 flex items-center justify-between p-2">
          <div>
            <button
              type="button"
              class="border-muted-200 hover:ring-muted-200 dark:hover:ring-muted-700 dark:border-muted-800 dark:bg-muted-800 dark:ring-offset-muted-900 flex size-9 items-center justify-center rounded-full border bg-white ring-1 ring-transparent transition-all duration-300 hover:ring-offset-4"
              @click="showSettings = !showSettings"
            >
              <Icon name="ph:gear-six-duotone" class="text-muted-400 size-5" />
            </button>
          </div>
          <TairoSidebarTools />
        </div>

        <!-- settings -->
        <div
          v-if="showSettings"
          class="dark:bg-muted-900 border-muted-300 dark:border-muted-800 border-y bg-white px-6 py-4"
        >
          <div class="grid grid-cols-2 gap-x-2">
            <BaseInputNumber
              v-model="settings.hourOpen"
              :min="0"
              :max="settings.hourClose - 1"
              label="Open from"
              size="sm"
            />
            <BaseInputNumber
              v-model="settings.hourClose"
              :min="settings.hourOpen + 1"
              :max="24"
              label="Close at"
              size="sm"
            />
            <BaseInputNumber
              v-model="settings.hourPrecision"
              :min="5"
              :step="5"
              :max="30"
              label="Precision"
              size="sm"
              :classes="{ wrapper: 'col-span-2' }"
            />
          </div>
          <div class="grid grid-cols-3 items-end gap-x-2 gap-y-4">
            <BaseSelect
              v-model.number="settings.weekStartsOn"
              label="Week starts on"
              size="sm"
              :classes="{
                wrapper: 'col-span-2',
              }"
            >
              <option :value="0">Sunday</option>
              <option :value="1">Monday</option>
              <option :value="2">Tuesday</option>
              <option :value="3">Wednesday</option>
              <option :value="4">Thursday</option>
              <option :value="5">Friday</option>
              <option :value="6">Saturday</option>
            </BaseSelect>
            <BaseButtonGroup>
              <BaseButtonAction
                rounded="lg"
                :color="settings.hourHeight === 480 ? 'muted' : 'default'"
                @click="() => updateHeight(480)"
              >
                <Icon name="carbon:maximize" />
              </BaseButtonAction>
              <BaseButtonAction
                rounded="lg"
                :color="settings.hourHeight === 160 ? 'muted' : 'default'"
                @click="() => updateHeight()"
              >
                <Icon name="carbon:minimize" />
              </BaseButtonAction>
            </BaseButtonGroup>
          </div>

          <div class="mt-4">
            <BaseSwitchThin
              v-model="settings.hideWeekends"
              label="Hide weekends"
            />
          </div>
        </div>

        <!-- content -->
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="translate-x-0 opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-active-class="transition-all duration-100 ease-in"
          leave-from-class="translate-x-0 opacity-100"
          :leave-to-class="
            selectedEvent
              ? '-translate-x-20 opacity-0'
              : 'translate-x-20 opacity-0'
          "
        >
          <div
            v-if="selectedEvent"
            class="nui-slimscroll relative h-[calc(100vh_-_53px)] p-6 pt-4"
            :class="{
              'overflow-y-auto overflow-x-hidden': !showSettings,
              'overflow-hidden': showSettings,
            }"
          >
            <div
              v-if="showSettings"
              role="button"
              tabindex="0"
              class="absolute inset-0 z-50 cursor-pointer backdrop-blur-[2px]"
              @click="showSettings = false"
            />
            <BaseHeading
              size="sm"
              weight="medium"
              lead="snug"
              class="text-muted-400 dark:text-muted-500 mb-4 flex items-center justify-between uppercase"
            >
              <span>Booking Details</span>
              <BaseButtonClose
                color="default"
                class="dark:bg-muted-800 bg-white"
                @click="selectedEventId = undefined"
              />
            </BaseHeading>

            <div class="flex flex-col gap-2">
              <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                  <BaseInput
                    v-model.trim="selectedEvent.title"
                    v-focus
                    label="Title"
                  />

                  <BaseInput
                    v-model.trim="selectedEvent.firstname"
                    v-focus
                    label="First name"
                  />

                  <BaseInput
                    v-model.trim="selectedEvent.lastname"
                    v-focus
                    label="Last name"
                  />

                  <BaseInput
                    v-model.trim="selectedEvent.email"
                    v-focus
                    type="email"
                    label="Eamil name"
                  />
                  <BaseInput
                    v-model.trim="selectedEvent.phone"
                    v-focus
                    type="phone"
                    label="phone"
                  />

                  <BaseInput
                    v-model.trim="selectedEvent.date"
                    v-focus
                    type="date"
                    label="date"
                  />

                  <BaseInput
                    v-model.trim="selectedEvent.time"
                    v-focus
                    type="time"
                    label="time"
                  />

                  <!-- Category Dropdown -->
                  <BaseListbox
                    v-model.prop="selectedEvent.service"
                    label="Service"
                    :properties="{ value: 'value', label: 'title' }"
                    :items="categories"
                  />

                  <!-- Assignee Dropdown -->

                  <BaseListbox
                    v-model.prop="selectedEvent.hairdresser"
                    label="Hair Dresser"
                    :properties="{ value: 'value', label: 'name' }"
                    :items="hairdresser"
                  />

                  <!-- Submit Button -->
                  <BaseButton type="submit" color="primary" class="mt-4">
                    Submit
                  </BaseButton>
                </div>
              </form>

              <hr />
              <span class="mt-5">Off Day</span>
              <form @submit.prevent="offSDayForm">
                <div class="flex flex-col gap-2">
                  <BaseListbox
                    v-model="offDayBooking.hairdresser"
                    label="Hair Dresser"
                    :properties="{ value: 'value', label: 'name' }"
                    :items="hairdresser"
                  />

                  <BaseInput
                    v-model.trim="offDayBooking.date"
                    v-focus
                    type="date"
                    label="Date"
                  />

                  <!-- Submit Button -->
                  <BaseButton type="submit" color="primary" class="mt-4">
                    Submit
                  </BaseButton>
                </div>
              </form>

              <!-- off day -->
            </div>
          </div>
          <div
            v-else
            class="nui-slimscroll relative h-[calc(100vh_-_53px)] p-6"
            :class="{
              'overflow-y-auto overflow-x-hidden': !showSettings,
              'overflow-hidden': showSettings,
            }"
          >
            <div
              v-if="showSettings"
              tabindex="0"
              role="button"
              class="absolute inset-0 z-50 cursor-pointer backdrop-blur-[2px]"
              @click="showSettings = false"
            />

            <!-- Draggable pending events cards -->
            <Container
              class="flex !min-h-[300px] flex-col"
              tag="div"
              orientation="vertical"
              group-name="unscheduled"
              drag-class="transform cursor-grabbing drop-shadow rotate-2 transform-gpu"
              drag-handle-selector=".dnd-drag-handler"
              :should-accept-drop="() => false"
              :get-child-payload="(idx: number) => getChildPayload(idx)"
              :drop-placeholder="{
                className:
                  'border-muted-200 border-dashed dark:border-muted-800 dark:bg-muted-800 group relative flex cursor-pointer flex-col items-start rounded-lg border bg-white p-4 hover:bg-white',
              }"
              @drag-start="
              (ctx: any) => {
                  clearNew()
                  onPendingEventDragStart(ctx)
                }
              "
            >
              <!-- pending event -->
              <template>
                <div v-if="pendingEvents.length">
                  <BaseHeading
                    size="sm"
                    weight="medium"
                    lead="snug"
                    class="text-muted-400 dark:text-muted-500 mb-4 uppercase"
                  >
                    Pending events
                  </BaseHeading>
                  <Draggable
                    v-for="pendingEvent in pendingEvents"
                    :key="pendingEvent.id"
                  >
                    <DemoCalendarEventPending
                      :event="pendingEvent"
                      role="button"
                      @click="() => onSelectEvent(pendingEvent)"
                    />
                  </Draggable>
                </div>
                <div v-else>
                  <!-- empty state -->
                  <div class="p-4">
                    <img
                      class="mx-auto block max-w-[200px] dark:hidden"
                      src="/img/illustrations/placeholders/flat/placeholder-projects.svg"
                      alt=""
                    />
                    <img
                      class="mx-auto hidden max-w-[200px] dark:block"
                      src="/img/illustrations/placeholders/flat/placeholder-projects-dark.svg"
                      alt=""
                    />
                    <div class="mt-4 text-center">
                      <BaseHeading
                        as="h4"
                        size="lg"
                        weight="light"
                        class="mb-1"
                      >
                        <span>No pending events</span>
                      </BaseHeading>
                      <BaseParagraph
                        size="xs"
                        lead="tight"
                        class="text-muted-400 mx-auto max-w-[200px] !font-sans"
                      >
                        <span
                          >You've planned all your events for this week.</span
                        >
                      </BaseParagraph>
                      <NuxtLink
                        href="#"
                        class="text-primary-500 nui-focus dark:text-sunny pointer-events-auto mx-auto mt-2 flex items-center justify-center gap-1 font-sans text-xs underline-offset-4 hover:underline"
                      >
                        <Icon name="lucide:plus" class="size-3" />
                        <span>New event</span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </template>

              <!-- pending end -->
            </Container>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
