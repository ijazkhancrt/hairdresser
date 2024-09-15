<template>
  <div class="grid w-full gap-10 md:grid-cols-12">
    <div class="md:col-span-3 lg:col-span-4">
      <div class="xs:w-full xs:max-w-xs xs:mx-auto flex flex-col gap-4 md:flex-row">
        <div class="xs:max-w-xs xs:mx-auto relative flex justify-between gap-7 md:flex-col">
          <!-- Progress Bar -->
          <div
            class="xs:top-1.5 xs:inset-x-0 bg-muted-200 dark:bg-muted-700 absolute start-2 top-2 z-0 mx-auto h-1 w-[calc(100%_-_1rem)] md:h-[calc(100%_-_1rem)] md:w-1 md:-translate-x-1/2"
          ></div>
          <div
            class="bg-primary-500 absolute start-2 top-0 z-10 mx-auto hidden w-0.5 -translate-x-1/2 rounded-full transition-all duration-300 md:block"
            :style="{ height: progressHeight + '%' }"
          ></div>
          <div
            class="bg-primary-500 absolute start-1.5 top-[7px] z-10 h-0.5 rounded-full transition-all duration-300 md:hidden"
            :style="{ width: progressWidth }"
          ></div>
          <!-- Steps Indicator -->
          <div
            v-for="index in totalSteps"
            :key="index"
            class="bg-muted-200 dark:bg-muted-700 relative z-20 flex size-4 items-center justify-center rounded-full"
          >
            <span
              :class="['scale-0', { 'scale-1': index <= currentStep }]"
              class="bg-primary-500 block size-2 rounded-full transition-transform duration-300"
            ></span>
          </div>
        </div>
        <div class="relative flex justify-center gap-7 md:flex-col md:justify-between">
          <!-- Step Labels -->
          <a v-for="(label, index) in labels" :key="index" role="button" tabindex="0" class="cursor-default h-4 leading-none">
            <span :class="{'text-muted-800 dark:text-muted-100': index + 1 === currentStep, 'text-muted-400 dark:text-muted-500': index + 1 !== currentStep}"
              class="font-heading block text-xs"
            >
              {{ label }}
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="md:col-span-9 lg:col-span-8">
      <form @submit.prevent="handleSubmit">
        <div class="w-full">
          <div class="mb-8 space-y-2">
            <h2 class="nui-heading nui-heading-2xl nui-weight-medium nui-lead-normal md:!3xl text-muted-800 dark:text-white">
              What do you want?
            </h2>
            <p class="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 max-w-sm">
              Choose a service under
            </p>
          </div>
          <div class="relative max-w-md space-y-3">
            <!-- Step Content -->
            <div v-show="currentStep === 1">
              <div class="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-sm nui-has-icon">
                <input
                  type="text"
                  class="nui-input !p-4 !ps-12 !h-12"
                  placeholder="Ex: Service Name"
                  v-model="step1Data"
                />
                <div class="!h-12 !w-12 nui-input-icon">
                  <!-- Icon SVG -->
                </div>
              </div>
            </div>
            <div v-show="currentStep === 2">
              <div class="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-sm nui-has-icon">
                <input
                  type="text"
                  class="nui-input !p-4 !ps-12 !h-12"
                  placeholder="Ex: Recipient Name"
                  v-model="step2Data"
                />
                <div class="!h-12 !w-12 nui-input-icon">
                  <!-- Icon SVG -->
                </div>
              </div>
            </div>
            <div v-show="currentStep === 3">
              <div class="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-sm nui-has-icon">
                <input
                  type="text"
                  class="nui-input !p-4 !ps-12 !h-12"
                  placeholder="Ex: Recipient Address"
                  v-model="step3Data"
                />
                <div class="!h-12 !w-12 nui-input-icon">
                  <!-- Icon SVG -->
                </div>
              </div>
            </div>
            <div v-show="currentStep === 4">
              <div class="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-sm nui-has-icon">
                <input
                  type="number"
                  class="nui-input !p-4 !ps-12 !h-12"
                  placeholder="Ex: Amount"
                  v-model="step4Data"
                />
                <div class="!h-12 !w-12 nui-input-icon">
                  <!-- Icon SVG -->
                </div>
              </div>
            </div>
            <div v-show="currentStep === 5">
              <div class="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-sm nui-has-icon">
                <textarea
                  class="nui-input !p-4 !ps-12 !h-12"
                  placeholder="Review details"
                  v-model="step5Data"
                ></textarea>
                <div class="!h-12 !w-12 nui-input-icon">
                  <!-- Icon SVG -->
                </div>
              </div>
            </div>
            <!-- Navigation Buttons -->
            <div class="flex gap-2">
              <button
                v-if="currentStep < totalSteps"
                type="button"
                @click="handleContinue"
                class="nui-button nui-button-lg nui-button-rounded-sm nui-button-solid nui-button-primary w-full"
              >
                <span>Continue</span>
              </button>
              <button
                v-if="currentStep === totalSteps"
                type="submit"
                class="nui-button nui-button-lg nui-button-rounded-sm nui-button-solid nui-button-primary w-full"
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentStep = ref(1);
const step1Data = ref('');
const step2Data = ref('');
const step3Data = ref('');
const step4Data = ref('');
const step5Data = ref('');
const totalSteps = 5; // Number of steps in the wizard

const progressHeight = computed(() => (currentStep.value / totalSteps) * 100);
const progressWidth = computed(() => `${(currentStep.value / totalSteps) * 100}%`);

const labels = ['Services', 'Recipient details', 'Recipient address', 'Amount', 'Review'];

function handleContinue() {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
}

// function handleSubmit() {
//   // Handle form submission
//   console.log('Form submitted', { step1Data, step2Data, step3Data, step4Data, step5Data });
// }

function handleSubmit() {
  // Prepare the data payload
  const payload = {
    step1Data: step1Data.value,
    step2Data: step2Data.value,
    step3Data: step3Data.value,
    step4Data: step4Data.value,
    step5Data: step5Data.value
  };

  // Send the data using fetch
  fetch('/api/booking', {
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
</script>

<style scoped>
/* Scoped styles */
</style>
