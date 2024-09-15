import { ref, watch, onMounted, toValue } from 'vue';
import type { CalendarCustomAttribute, CalendarEvent } from '../types';
import { addDays, addHours, addMinutes, roundToNearestMinutes } from 'date-fns';

interface UseCalendarEventsProps {
  fromDate: MaybeRefOrGetter<Date>;
  toDate: MaybeRefOrGetter<Date>;
}

// define api_route
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

export function useCalendarEvents(props: UseCalendarEventsProps) {
  const calendarEvents = ref<CalendarCustomAttribute<CalendarEvent>[]>([]);
  const pendingEvents = ref<CalendarEvent[]>([]);
  const eventIds = new Set<string>();


  async function refresh() {
    // Reset the calendar events to avoid duplicates
    eventIds.clear();
    calendarEvents.value = []; // Clear existing events

  // Define a ref to hold booking data
  const bookings = ref([]);

  // Fetch data on component mount
    try {
      const response = await fetch(`${apiUrl}/api/v1/get-all-bookings`);
      const data = await response.json();
      // Assuming the bookings array directly represents pending events
      bookings.value = data.bookings;
      // You might need to filter or transform the data here
      pendingEvents.value = data.bookings; // Example filter
      console.log('get-all-bookings fatching',  pendingEvents.value);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  
    const mydata = pendingEvents.value.map((event) => {
      // Destructure the date and time strings
      const { date, time } = event;
      
      // Split the date string by the hyphen
      const [year, month, day] = date.split('-').map(Number);
    
      // Split the time string by the colon
      const [hours, minutes] = time.split(':').map(Number);
    
      // Create a new Date object
      const startDate = new Date(year, month - 1, day, hours, minutes);
    
      // Add 45 minutes to the startDate to get the endDate
      const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // 45 minutes in milliseconds
    
      // console.log(`Original date and time: ${startDate.toLocaleString()}`);
      // console.log(`Updated date and time: ${endDate.toLocaleString()}`);
    
      // Create the calendarEvent with id as a string
      const calendarEvent: CalendarEvent = {
        id: String(event.id), // Ensure id is a string
        duration: 30,
        startDate,
        endDate,
        first_name: event.first_name,
        last_name: event.last_name,
        title: event.first_name + ' ' + event.last_name,
        phone: event.phone,
        email: event.email,
        category: 'internal'
      };
    
      return calendarEvent;
    }).filter(event => event !== null); // Filter out any null entries
    
    
    
    // console.log('THIS IS CALLED ON REFRESH', mydata);

    const newEvents: CalendarCustomAttribute<CalendarEvent>[] = [];

    for (const event of mydata) {
      const { startDate, endDate, id, title,phone, email,  category } = event;

      // Check if the event has already been added
      if (!eventIds.has(id)) {
        eventIds.add(id);
        newEvents.push({
          key: id,
          customData: {
            id,
            first_name: event.first_name,
            last_name: event.first_name,
            phone: event.phone,
            email: event.email,
            startDate,
            duration: 30,
            endDate,
            title,
            category,
          },
          dates: [startDate, endDate],
        });
      }
    }

    // Only update calendarEvents with new unique events
    calendarEvents.value.push(...newEvents);
  }

  // Refresh on fromDate and toDate change and on mounted
  watch([() => toValue(props.fromDate), () => toValue(props.toDate)], refresh, {
    immediate: true,
  });

  return {
    calendarEvents,
    pendingEvents,
    refresh,
  };
}
