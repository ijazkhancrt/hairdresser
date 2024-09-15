import { ref, watch, onMounted, toValue } from 'vue';
import type { CalendarCustomAttribute, CalendarEvent } from '../types';
import { addDays, addHours, addMinutes, roundToNearestMinutes } from 'date-fns';

interface UseCalendarEventsProps {
  fromDate: MaybeRefOrGetter<Date>;
  toDate: MaybeRefOrGetter<Date>;
}

export function useCalendarEvents(props: UseCalendarEventsProps) {
  const calendarEvents = ref<CalendarCustomAttribute<CalendarEvent>[]>([]);
  const pendingEvents = ref<CalendarEvent[]>([]);
  const eventIds = new Set<string>();

  // Define a ref to hold booking data
  const bookings = ref([]);

  // Fetch data on component mount
  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/get-all-bookings');
      const data = await response.json();
      // Assuming the bookings array directly represents pending events
      bookings.value = data.booking;
      // You might need to filter or transform the data here
      pendingEvents.value = data.booking; // Example filter
      console.log(pendingEvents.value);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  });

  async function refresh() {
    // Reset the calendar events to avoid duplicates
    eventIds.clear();
    calendarEvents.value = []; // Clear existing events

    // Example of event data, replace with real data in production
    pendingEvents.value = [
      {
        id: '1',
        duration: 45,
        startDate: new Date(2024, 8, 7, 11, 0),
        endDate: new Date(2024, 8, 7, 12, 45),
        title: 'Sprint planning',
        category: 'team',
        features: {
          conversation: true,
          record: true,
          drive: true,
        },
        participants: [],
      },
      {
        id: '2', // Ensure this ID is unique
        duration: 45,
        startDate: new Date(2024, 8, 7, 8, 0),
        endDate: new Date(2024, 8, 7, 9, 45),
        title: 'Sprint planning',
        category: 'team',
        features: {
          conversation: true,
          record: true,
          drive: true,
        },
        participants: [],
      },
    ];

    const newEvents: CalendarCustomAttribute<CalendarEvent>[] = [];

    for (const event of pendingEvents.value) {
      const { startDate, endDate, id, title, category, features, participants } = event;

      // Check if the event has already been added
      if (!eventIds.has(id)) {
        eventIds.add(id);
        newEvents.push({
          key: id,
          customData: {
            id,
            startDate,
            duration: 45,
            endDate,
            title,
            category,
            features,
            participants,
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
