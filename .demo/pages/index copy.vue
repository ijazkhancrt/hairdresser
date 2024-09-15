<template>
  <div class="container">
    <!-- Navbar -->
    <nav class="custom-navbar">
      <div class="custom-container">
        <!-- Brand Name -->
        <NuxtLink class="navbar-brand" to="/">BrandName</NuxtLink>

        <!-- Toggler for responsive navbar -->
        <button
          class="custom-navbar-toggler"
          type="button"
          @click="toggleNavbar"
        >
          <span class="custom-navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Links -->
        <div
          :class="['custom-navbar-collapse', { show: isNavbarOpen }]"
          id="customNavbarNav"
        >
          <ul class="custom-navbar-nav">
            <li class="custom-nav-item">
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            </li>
            <li class="custom-nav-item">
              <NuxtLink class="nav-link" to="/about">About</NuxtLink>
            </li>
            
            <li class="custom-nav-item">
              <NuxtLink class="nav-link" to="/contact">Contact</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Header Section -->
    <header class="mt-3">
      <div class="row w-100">
        <!-- Column 1 -->
        <div
          class="col-md-4 d-flex flex-column justify-content-center align-items-center header-content"
        >
          <div>
            <h1>
              <b>Your<br />Perfect<br />Hairstyle<br />Awaits</b>
            </h1>
            <p>Book an appointment with our expert</p>
          </div>
        </div>

        <div
          class="col-md-8 d-flex justify-content-center align-items-center header-image"
        >
          <img
            src="/custom/img/header.png"
            alt="Hair Salon"
            height="80%"
            class="img-fluid"
          />
        </div>
      </div>
    </header>

    <div class="services my-5" style="margin-top: 50px">
      <h1><b>Book Your Appointment Online</b></h1>
      <p>
        Convenient and hassle-free booking system for your next hair
        appointment.
      </p>
    </div>

    <!-- =============== wizard =================================== -->
    <div
      class="flex justify-center"
      style="margin-top: 100px; margin-bottom: 100px"
    >
      <div class="grid w-full max-w-4xl gap-10 md:grid-cols-12">
        <div class="md:col-span-3 lg:col-span-4">
          <div
            class="xs:w-full xs:max-w-xs xs:mx-auto flex flex-col gap-4 md:flex-row"
          >
            <div
              class="xs:max-w-xs xs:mx-auto relative flex justify-between gap-7 md:flex-col"
            >
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
            <div
              class="relative flex justify-center gap-7 md:flex-col md:justify-between"
            >
              <!-- Step Labels -->
              <a
                v-for="(label, index) in labels"
                :key="index"
                role="button"
                tabindex="0"
                class="cursor-default h-4 leading-none"
              >
                <span
                  :class="{
                    'text-muted-800 dark:text-muted-100':
                      index + 1 === currentStep,
                    'text-muted-400 dark:text-muted-500':
                      index + 1 !== currentStep,
                  }"
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
              <div class="relative max-w-md space-y-3">
                <!-- Step Content -->
                <div v-show="currentStep === 1">
                  <div class="mb-8 space-y-2">
                    <h2
                      class="nui-heading nui-heading-2xl nui-weight-medium nui-lead-normal md:!3xl text-muted-800 dark:text-white"
                    >
                      What do you want?
                    </h2>
                    <p
                      class="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 max-w-sm"
                    >
                      Choose a service under
                    </p>
                  </div>

                  <div
                    class="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-sm nui-has-icon"
                  >
                    <!-- asdfasdfsdf -->
                    <div class="w-full space-y-4">
                      <!-- Error message -->
                      <span v-if="showError" class="text-danger"
                        >Please select any service</span
                      >

                      <!--Radio groups-->
                      <BaseRadioHeadless
                        v-model="service"
                        v-focus="service == 'Simple haircut for men'"
                        value="Simple haircut for men"
                        name="service"
                        class="nui-focus !appearance-none rounded-lg !opacity-100"
                        required
                      >
                        <div
                          class="peer-checked:child:scale-1 peer-not-checked:child:scale-0 bg-muted-100 text-muted-100 dark:bg-muted-900 dark:text-muted-900 peer-checked:text-primary-500 absolute start-6 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full"
                        >
                          <div
                            class="size-3 rounded-full bg-current transition-colors duration-300"
                          />
                        </div>
                        <div
                          class="dark:bg-muted-800 border-muted-200 dark:border-muted-700 peer-checked:shadow-muted-400/10 dark:peer-checked:shadow-muted-800/10 group-focus-visible:tw-accessibility-static group flex cursor-pointer items-center rounded-lg border bg-white px-6 py-4 transition-shadow duration-300 peer-checked:shadow-xl"
                        >
                          <div
                            class="border-muted-200 flex size-5 items-center justify-center rounded-full border"
                          />
                          <div class="ms-6 flex flex-col">
                            <BaseText
                              weight="medium"
                              class="text-muted-800 dark:text-muted-100"
                            >
                              Simple haircut for men
                            </BaseText>
                          </div>
                          <div class="ms-auto flex w-32 flex-col">
                           
                            <BaseText size="xs" class="text-muted-400">
                              400 kr
                            </BaseText>
                          </div>
                        </div>
                      </BaseRadioHeadless>
                      <BaseRadioHeadless
                        v-model="service"
                        v-focus="service == 'Simple haircut for woman + Wash'"
                        value="Simple haircut for woman + Wash"
                        name="service"
                        class="nui-focus !appearance-none rounded-lg !opacity-100"
                        required
                      >
                        <div
                          class="peer-checked:child:scale-1 peer-not-checked:child:scale-0 bg-muted-100 text-muted-100 dark:bg-muted-900 dark:text-muted-900 peer-checked:text-primary-500 absolute start-6 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full"
                        >
                          <div
                            class="size-3 rounded-full bg-current transition-colors duration-300"
                          />
                        </div>
                        <div
                          class="dark:bg-muted-800 border-muted-200 dark:border-muted-700 peer-checked:shadow-muted-400/10 dark:peer-checked:shadow-muted-800/10 group-focus-visible:tw-accessibility-static group flex cursor-pointer items-center rounded-lg border bg-white px-6 py-4 transition-shadow duration-300 peer-checked:shadow-xl"
                        >
                          <div
                            class="border-muted-200 flex size-5 items-center justify-center rounded-full border"
                          />
                          <div class="ms-6 flex flex-col">
                            <BaseText
                              weight="medium"
                              class="text-muted-800 dark:text-muted-100"
                            >
                              Simple haircut for woman + Wash
                            </BaseText>
                          </div>
                          <div class="ms-auto flex w-32 flex-col">
                            <BaseText size="xs" class="text-muted-400">
                              700
                            </BaseText>
                          </div>
                        </div>
                      </BaseRadioHeadless>
                      <BaseRadioHeadless
                        v-model="service"
                        v-focus="service == 'Simple haircut for woman'"
                        value="Simple haircut for woman"
                        name="service"
                        class="nui-focus !appearance-none rounded-lg !opacity-100"
                        required
                      >
                        <div
                          class="peer-checked:child:scale-1 peer-not-checked:child:scale-0 bg-muted-100 text-muted-100 dark:bg-muted-900 dark:text-muted-900 peer-checked:text-primary-500 absolute start-6 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full"
                        >
                          <div
                            class="size-3 rounded-full bg-current transition-colors duration-300"
                          />
                        </div>
                        <div
                          class="dark:bg-muted-800 border-muted-200 dark:border-muted-700 peer-checked:shadow-muted-400/10 dark:peer-checked:shadow-muted-800/10 group-focus-visible:tw-accessibility-static group flex cursor-pointer items-center rounded-lg border bg-white px-6 py-4 transition-shadow duration-300 peer-checked:shadow-xl"
                        >
                          <div
                            class="border-muted-200 flex size-5 items-center justify-center rounded-full border"
                          />
                          <div class="ms-6 flex flex-col">
                            <BaseText
                              weight="medium"
                              class="text-muted-800 dark:text-muted-100"
                            >
                              Simple haircut for woman
                            </BaseText>
                          </div>
                          <div class="ms-auto flex w-32 flex-col">
                            <BaseText size="xs" class="text-muted-400">
                              400
                            </BaseText>
                          </div>
                        </div>
                      </BaseRadioHeadless>
                      <BaseRadioHeadless
                        v-model="service"
                        v-focus="service == 'Simple haircut for woman + Wash'"
                        value="Simple haircut for woman + Wash"
                        name="service"
                        class="nui-focus !appearance-none rounded-lg !opacity-100"
                        required
                      >
                        <div
                          class="peer-checked:child:scale-1 peer-not-checked:child:scale-0 bg-muted-100 text-muted-100 dark:bg-muted-900 dark:text-muted-900 peer-checked:text-primary-500 absolute start-6 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full"
                        >
                          <div
                            class="size-3 rounded-full bg-current transition-colors duration-300"
                          />
                        </div>
                        <div
                          class="dark:bg-muted-800 border-muted-200 dark:border-muted-700 peer-checked:shadow-muted-400/10 dark:peer-checked:shadow-muted-800/10 group-focus-visible:tw-accessibility-static group flex cursor-pointer items-center rounded-lg border bg-white px-6 py-4 transition-shadow duration-300 peer-checked:shadow-xl"
                        >
                          <div
                            class="border-muted-200 flex size-5 items-center justify-center rounded-full border"
                          />
                          <div class="ms-6 flex flex-col">
                            <BaseText
                              weight="medium"
                              class="text-muted-800 dark:text-muted-100"
                            >
                              Simple haircut for woman + Wash
                            </BaseText>
                          </div>
                          <div class="ms-auto flex w-32 flex-col">
                            <BaseText size="xs" class="text-muted-400">
                              700
                            </BaseText>
                          </div>
                        </div>
                      </BaseRadioHeadless>
                    </div>
                  </div>
                </div>

                <!-- haircutter 2 -->
                <div v-show="currentStep === 2">
                  <div class="mb-8 space-y-2">
                    <h2
                      class="nui-heading nui-heading-2xl nui-weight-medium nui-lead-normal md:!3xl text-muted-800 dark:text-white"
                    >
                      who do you want to cut your hair?
                    </h2>
                    <p
                      class="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 max-w-sm"
                    >
                      Choose a haircutter
                    </p>
                  </div>

                  <!-- Error message -->
                  <span v-if="showHairdresserError" class="text-danger"
                    >Please select any Hairdcutter</span
                  >


                  <!-- Widget -->
                  <div class="col-span-12">
                    <TairoTable rounded="sm">
                      <TairoTableRow>
                        <TairoTableCell>
                          <div class="flex items-center ms-5 space-x-2">
                            <BaseRadio
                              v-model="hairdresser"
                              name="hairdresser"
                              value="1"
                            />
                            <div class="flex items-center space-x-2">
                              <BaseAvatar
                                src="/custom/img/DSC_0006.JPG"
                                size="sm"
                              />
                              <div class="leading-none">
                                <h3 class="font-heading text-sm font-bold">
                                  ijazkhan
                                </h3>
                              </div>
                            </div>
                          </div>
                        </TairoTableCell>
                      </TairoTableRow>
                    </TairoTable>
                  </div>

                  <!-- 2 -->
                  <div class="col-span-12">
                    <TairoTable rounded="sm">
                      <TairoTableRow>
                        <TairoTableCell>
                          <div class="flex items-center ms-5 space-x-2">
                            <!-- Adjust spacing here -->
                            <BaseRadio
                              v-model="hairdresser"
                              name="hairdresser"
                              value="2"
                            />
                            <div class="flex items-center space-x-2">
                              <!-- Adjust spacing between image and text -->
                              <BaseAvatar
                                src="https://tairo.cssninja.io/img/avatars/2.svg"
                                size="sm"
                              />
                              <div class="leading-none">
                                <h3 class="font-heading text-sm font-bold">
                                  <!-- Bold text -->
                                  Lila Monroe
                                </h3>
                              </div>
                            </div>
                          </div>
                        </TairoTableCell>
                      </TairoTableRow>
                    </TairoTable>
                  </div>

                  <div class="col-span-12">
                    <TairoTable rounded="sm">
                      <TairoTableRow>
                        <TairoTableCell>
                          <div class="flex items-center ms-5 space-x-2">
                            <!-- Adjust spacing here -->
                            <BaseRadio
                              v-model="hairdresser"
                              name="haircutter"
                              value="3"
                            />
                            <div class="flex items-center space-x-2">
                              <!-- Adjust spacing between image and text -->
                              <BaseAvatar
                                src="https://tairo.cssninja.io/img/avatars/2.svg"
                                size="sm"
                              />
                              <div class="leading-none">
                                <h3 class="font-heading text-sm font-bold">
                                  <!-- Bold text -->
                                  Nina Carter
                                </h3>
                              </div>
                            </div>
                          </div>
                        </TairoTableCell>
                      </TairoTableRow>
                    </TairoTable>
                  </div>
                </div>

                <!--  -->
                <div v-show="currentStep === 3">
                  <div class="mb-8 space-y-2">
                    <h2
                      class="nui-heading nui-heading-2xl nui-weight-medium nui-lead-normal md:!3xl text-muted-800 dark:text-white"
                    >
                      Choose a date
                    </h2>
                    <p
                      class="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 max-w-sm"
                    >
                      Choose a date for appointment
                    </p>
                  </div>

                  <!-- Error message -->
                  <span v-if="showDateError" class="text-danger"
                    >Please select Date</span
                  >

                  <!-- Widget get date value from celender -->
                  <div>
                    <BaseInput
                      v-model.trim="date"
                      v-focus
                      type="date"
                      label="date"
                    />
                  </div>
                </div>

                <div v-show="currentStep === 4">
                  <div class="mb-4 space-y-1">
                    <!-- Reduced margin-bottom and space between elements -->
                    <h2
                      class="nui-heading nui-heading-xl nui-weight-medium nui-lead-normal md:!2xl text-muted-800 dark:text-white"
                    >
                      Choose a timeslot
                    </h2>
                    <p
                      class="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 max-w-sm"
                    >
                      Choose a timeslot for your appointment
                    </p>
                  </div>

                  <!-- Error message -->
                  <span v-if="showTimeError" class="text-danger"
                    >Please select Time</span
                  >

                  <!-- get time value -->
                  <div class="grid grid-cols-2 gap-5">
                    <!-- Left Section -->
                    <div class="col-span-1">
                      <!-- Time Slot 1 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <!-- Reduced padding in table -->
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <!-- Reduced padding in table cell -->
                            <div class="flex items-center space-x-2 ms-3">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="09:00"
                                class="!h-4 ms-3 !w-4"
                              />
                              <!-- Reduced size of radio button -->
                              <Field name="meeting.frequency" class="text-sm"
                                >09:00</Field
                              >
                              <!-- Adjusted text size -->
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 2 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2 ms-3">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="09:30"
                                class="!h-4 ms-3 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >09:30</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 3 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2 ms-3">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="10:00"
                                class="!h-4 ms-3 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >10:00</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 4 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2 ms-3">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="10:30"
                                class="!h-4 ms-3 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >10:30</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 5 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2 ms-3">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="11:00"
                                class="!h-4 ms-3 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >11:00</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>

                      <!-- Time Slot 6 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <!-- Reduced padding in table -->
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <!-- Reduced padding in table cell -->
                            <div class="flex items-center space-x-2">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="11:30"
                                class="!h-4 !w-4"
                              />
                              <!-- Reduced size of radio button -->
                              <Field name="meeting.frequency" class="text-sm"
                                >11:30</Field
                              >
                              <!-- Adjusted text size -->
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                    </div>

                    <!-- Right Section -->
                    <div class="col-span-1">
                      <!-- Time Slot 7 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="12:00"
                                class="!h-4 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >12:00</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 8 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="12:30"
                                class="!h-4 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >12:30</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 9 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="13:00"
                                class="!h-4 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >13:00</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 10 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="13:30"
                                class="!h-4 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >13:30</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 11 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="14:00"
                                class="!h-4 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >14:00</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                      <!-- Time Slot 12 -->
                      <TairoTable rounded="sm" class="!p-2">
                        <TairoTableRow>
                          <TairoTableCell class="!py-2">
                            <div class="flex items-center space-x-2">
                              <BaseRadio
                                v-model="time"
                                name="time"
                                value="14:00"
                                class="!h-4 !w-4"
                              />
                              <Field name="meeting.frequency" class="text-sm"
                                >14:30</Field
                              >
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                    </div>
                  </div>
                </div>

                <div v-show="currentStep === 5" class="space-y-4">
                  <div class="mb-4 space-y-1">
                    <!-- Reduced margin-bottom and space between elements -->
                    <h2
                      class="nui-heading nui-heading-xl nui-weight-medium nui-lead-normal md:!2xl text-muted-800 dark:text-white"
                    >
                      Contact Information
                    </h2>
                    <p
                      class="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 max-w-sm"
                    >
                      Contact details
                    </p>

                    <!-- Error message -->
                    <span v-if="showContractError" class="text-danger"
                      >Please Add contact details</span
                    >

                    <!-- Grid container for name inputs -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <!-- First Name Input -->
                      <BaseInput
                        v-model="first_name"
                        rounded="md"
                        label="First Name"
                        placeholder="First Name"
                        class="w-full"
                      />
                      <!-- Last Name Input -->
                      <BaseInput
                        v-model="last_name"
                        rounded="md"
                        label="Last Name"
                        placeholder="Last Name"
                        class="w-full"
                      />
                    </div>

                    <!-- Email Input -->
                    <BaseInput
                      v-model="email"
                      rounded="md"
                      label="Email"
                      placeholder="Email"
                      class="w-full"
                    />

                    <!-- Phone Input -->
                    <BaseInput
                      v-model="phone"
                      rounded="md"
                      label="Phone"
                      placeholder="Phone"
                      class="w-full"
                    />
                  </div>
                </div>

                <div v-show="currentStep === 6" class="space-y-4">
                  <div class="mb-4 space-y-1">
                    <!-- Reduced margin-bottom and space between elements -->
                    <h2
                      class="nui-heading nui-heading-xl nui-weight-medium nui-lead-normal md:!2xl text-muted-800 dark:text-white"
                    >
                      Summary
                    </h2>
                    <p
                      class="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-500 dark:text-muted-400 max-w-sm"
                    >
                      Summary
                    </p>
                    <!-- Grid container for name inputs -->
                    <BaseRadioHeadless
                      v-model="service"
                      v-focus="service == '1'"
                      name="selected_service"
                      class="nui-focus !appearance-none rounded-lg !opacity-100"
                    >
                      <div
                        class="peer-checked:child:scale-1 peer-not-checked:child:scale-0 bg-muted-100 text-muted-100 dark:bg-muted-900 dark:text-muted-900 peer-checked:text-primary-500 absolute start-6 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full"
                      >
                        <div
                          class="size-3 rounded-full bg-current transition-colors duration-300"
                        />
                      </div>
                      <div
                        class="dark:bg-muted-800 border-muted-200 dark:border-muted-700 peer-checked:shadow-muted-400/10 dark:peer-checked:shadow-muted-800/10 group-focus-visible:tw-accessibility-static group flex cursor-pointer items-center rounded-lg border bg-white px-6 py-4 transition-shadow duration-300 peer-checked:shadow-xl"
                      >
                        <div
                          class="border-muted-200 flex size-5 items-center justify-center rounded-full border"
                        />
                        <div class="ms-6 flex flex-col">
                          <BaseText
                            weight="medium"
                            class="text-muted-800 dark:text-muted-100"
                          >
                            <!-- {{selected_hairdresser}} -->
                            {{ selected_service_description }}
                          </BaseText>
                        </div>
                        <div class="ms-auto flex w-32 flex-col">
                  
                          <BaseText size="xs" class="text-muted-400">
                            400 kr
                          </BaseText>
                        </div>
                      </div>
                    </BaseRadioHeadless>

                    <!-- Widget with image -->
                    <div class="col-span-12 mt-4">
                      <TairoTable rounded="sm">
                        <TairoTableRow>
                          <TairoTableCell>
                            <div class="flex items-center ms-4 space-x-2">
                              <!-- Adjust spacing here -->
                              <div class="flex items-center space-x-2">
                                <!-- Adjust spacing between image and text -->
                                <BaseAvatar
                                  src="https://tairo.cssninja.io/img/avatars/2.svg"
                                  size="sm"
                                />
                                <div class="leading-none">
                                  <h3 class="font-heading text-sm font-bold">
                                    <!-- Bold text -->
                                    <!-- {{ selected_hairdresser_name}} -->

                                    {{ service }}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </TairoTableCell>
                        </TairoTableRow>
                      </TairoTable>
                    </div>

                    <!-- Time Slot 1 -->
                    <TairoTable rounded="sm" class="!p-2">
                      <!-- Reduced padding in table -->
                      <TairoTableRow>
                        <TairoTableCell class="!py-2">
                          <!-- Reduced padding in table cell -->
                          <div class="flex items-center space-x-2 ms-3">
                            <!-- <BaseRadio v-model="selected" name="time" value="09:00" class="!h-4 ms-3 !w-4" /> -->
                            <!-- Reduced size of radio button -->
                            <Field name="selected_time" class="text-sm">{{
                              selected_time
                            }}</Field>
                            <!-- Adjusted text size -->
                          </div>
                        </TairoTableCell>
                      </TairoTableRow>
                    </TairoTable>

                    <!-- Time Slot 1 -->
                    <TairoTable rounded="sm" class="!p-2">
                      <!-- Reduced padding in table -->
                      <TairoTableRow>
                        <TairoTableCell class="!py-2">
                          <!-- Reduced padding in table cell -->
                          <div class="flex flex-col space-y-2 ms-3">
                            <!-- Use flex-col to stack items vertically -->
                            <Field name="username" class="text-sm block">
                              <b>Name: {{ selected_name }}</b>
                            </Field>
                            <Field name="email" class="text-sm block">
                              <b>Email: {{ selected_email }}</b>
                            </Field>
                            <Field name="phone" class="text-sm block">
                              <b>Phone: {{ selected_phone }}</b>
                            </Field>
                          </div>
                        </TairoTableCell>
                      </TairoTableRow>
                    </TairoTable>
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
    </div>

    <!-- =========================== wizard ======================================== -->
    <!-- Testimonial -->
    <div style="margin-top: 80px; margin-bottom: 80px">
      <div class="text-center main-testimonial my-5">
        <h1 class="mt-5 mb-3"><b>What People Say About Us</b></h1>
        <div class="row">
          <!-- Testimonial 1 -->
          <div class="col-md-4 d-flex justify-content-center">
            <div class="testimonial text-center">
              <div class="testimonial-text">
                <blockquote class="blockquote">
                  <p class="mb-0">
                    “I've been coming to this salon for years and it never
                    disappoints. The quality of service is consistently
                    excellent.”
                  </p>
                </blockquote>
                <div class="d-flex align-items-center justify-content-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg"
                    alt="Person"
                    class="rounded-circle"
                    style="width: 50px; height: auto"
                  />
                  <div class="ms-3">
                    <span class="text-primary"><b>Emily Johnson</b></span>
                    <br />
                    <cite title="Source Title">Regular Customer</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="col-md-4 d-flex justify-content-center">
            <div class="testimonial text-center">
              <div class="testimonial-text">
                <blockquote class="blockquote">
                  <p class="mb-0">
                    “I've been coming to this salon for years and it never
                    disappoints. The quality of service is consistently
                    excellent.”
                  </p>
                </blockquote>
                <div class="d-flex align-items-center justify-content-center">
                  <img
                    src="https://img.freepik.com/premium-photo/female-professional-hair-stylist-hair-dresser-hair-beauty-salon_1061358-4916.jpg"
                    alt="Person"
                    class="rounded-circle"
                    style="width: 50px; height: auto"
                  />
                  <div class="ms-3">
                    <span class="text-primary"><b>Micheel Williams</b></span>
                    <br />
                    <cite title="Source Title">Regular Customer</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <div class="col-md-4 d-flex justify-content-center">
            <div class="testimonial text-center">
              <div class="testimonial-text">
                <blockquote class="blockquote">
                  <p class="mb-0">
                    “I've been coming to this salon for years and it never
                    disappoints. The quality of service is consistently
                    excellent.”
                  </p>
                </blockquote>
                <div class="d-flex align-items-center justify-content-center">
                  <img
                    src="https://img.freepik.com/premium-photo/female-professional-hair-stylist-hair-dresser-hair-beauty-salon_1061358-4884.jpg"
                    alt="Person"
                    class="rounded-circle"
                    style="width: 50px; height: auto"
                  />
                  <div class="ms-3">
                    <span class="text-primary"><b>Sophia Adams</b></span>
                    <br />
                    <cite title="Source Title">Regular Customer</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Accordion -->

</div>
</template>

<script setup>
import { Calendar } from "v-calendar";
import { ref } from "vue";

import "v-calendar/dist/style.css";
import "~/assets/css/vcalendar.css";
import { useHead } from "#app";
import { definePageMeta } from "#imports"; // Ensure this import is correct for Nuxt 3

// define api_route
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

// Set page meta and head elements
useHead({
  title: "mindboost",
  meta: [
    // { name: 'theme-color', content: '#E9C046' }
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    },
  ],
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
    },
  ],
});

definePageMeta({
  layout: "custom",
});

const isNavbarOpen = ref(false);

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

// get haridressers
const users = ref([]);
// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/get-hairdresser`);
    const data = await response.json();
    users.value = data.users;
    console.log(users.value);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});


// State to track which accordion item is open
const activeIndex = ref(null);

// Toggle function to show/hide the accordion body
function toggle(index) {
  activeIndex.value = activeIndex.value === index ? null : index;
}

//  ===================================== datab ================================
import { computed } from "vue";
const progressHeight = computed(() => (currentStep.value / totalSteps) * 100);
const progressWidth = computed(
  () => `${(currentStep.value / totalSteps) * 100}%`
);

const labels = [
  "Services",
  "Hair cutter",
  "Date",
  "Timeslot",
  "Contact Information",
  "Summary",
];

const showError = ref(false);
const showHairdresserError = ref(false);
const showDateError = ref(false);
const showTimeError = ref(false);
const showContractError = ref(false);

// ===================================== validation logic for each step=====================================

function validateStep() {
  switch (currentStep.value) {
    case 1:
      if (!service.value) {
        showError.value = true;
        return false;
      }
      showError.value = false;
      break;
    case 2:
      if (!hairdresser.value) {
        showHairdresserError.value = true;
        return false;
      }
      showHairdresserError.value = false;
      break;
    case 3:
      if (!date.value) {
        showDateError.value = true;
        return false;
      }
      showDateError.value = false;
      break;
    case 4:
      if (!time.value) {
        showTimeError.value = true;
        return false;
      }
      showTimeError.value = false;
      break;
    case 5:
      // Check if all required fields are filled
      if (
        !first_name.value ||
        !last_name.value ||
        !email.value ||
        !phone.value
      ) {
        showContractError.value = true;
        return false;
      }
      showContractError.value = false;
      break;
    default:
      break;
  }
  return true;
}

function handleContinue() {
  if (validateStep()) {
    if (currentStep.value < totalSteps) {
      currentStep.value++;
    } else {
      // Handle the final submission logic
      // For example: router.push('/summary') or submit the form
    }
  }
}

//
// Mapping service values to descriptions
const serviceDescriptions = {
  1: "Simple haircut for men",
  2: "Simple haircut for women + Wash",
  3: "Simple haircut for women",
  4: "Simple haircut for women + Wash",
};

// Computed property to get the selected service description
const selected_service_description = computed(() => {
  return serviceDescriptions[service.value] || "";
});

// =============== hairdressers ============================

// Mapping hairdresser values to names
const hairdresserNames = {
  1: "Maya Roshi",
  2: "Lila Monroe",
  3: "Nina Carter",
};

// Computed property to get the selected hairdresser's name
const selected_hairdresser_name = computed(() => {
  return hairdresserNames[hairdresser.value] || "";
});

// ===================================== ref =====================================
const service = ref("");
const hairdresser = ref("");
const selected = ref("");
const date = ref("");
const time = ref("");
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const phone = ref("");
const currentStep = ref(1);
const totalSteps = 6;
const router = useRouter();

// Use computed properties to reflect changes reactively
const selected_service = computed(() => service.value || "");
const selected_hairdresser = computed(() => hairdresser.value || "");
const selected_time = computed(() => time.value || "");
const selected_name = computed(() => first_name.value || "");
const selected_email = computed(() => email.value || "");
const selected_phone = computed(() => phone.value || "");

// ===================================== submnit handleSubmit s=====================================
function handleSubmit() {
  const payload = {
    service: service.value,
    hairdresser: hairdresser.value,
    date: date.value,
    time: time.value,
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    phone: phone.value,
  };

  const toaster = useToaster();
  fetch(`${apiUrl}/api/v1/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.success === false) {
        // Extract error messages
        const errors = response.data;
        let errorMessage = '';

        for (const [field, messages] of Object.entries(errors)) {
          errorMessage += `${messages.join(' ')} `;
        }

        // Display errors in toaster
        toaster.show({
          title: "Validation Error",
          message: errorMessage.trim(),
          color: "danger",
          icon: "ph:x",
          class: "end-2 top-2",
          closable: true,
        });
      } else {
        // Success
        console.log("Success:", response);
        toaster.clearAll();
        toaster.show({
          title: "Success",
          message: `Booking is sent successfully!`,
          color: "success",
          icon: "ph:check",
          class: "end-2 top-2",
          closable: true,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle the error (e.g., display an error message)
      toaster.show({
        title: "Error",
        message: `An unexpected error occurred.`,
        color: "danger",
        icon: "ph:x",
        class: "end-2 top-2",
        closable: true,
      });
    });
}

</script>

<style scoped>
/* ============================ Add your styles here ============================ */
.testimonial-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  /* Ensures image is treated as a block element */
  margin: 0 auto;
  /* Centers the image horizontally */
}

.testimonial {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  text-align: center;
  /* Centers text inside the testimonial */
}

.testimonial-text {
  margin-left: 10px;
}

.main-testimonial {
  margin-top: 10rem;
}

#accordionPanelsStayOpenExample {
  margin-top: 7rem;
}

.services {
  margin-top: 7rem;
}

/* ============================ navbar style  ============================*/

.custom-navbar {
  padding: 1rem;
}

.custom-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.custom-navbar-brand {
  text-decoration: none;
  font-size: 1.5rem;
}

.custom-navbar-toggler {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  /* Hide by default */
}

.custom-navbar-toggler-icon::before {
  content: "☰";
  /* Use any icon here */
}

.custom-navbar-collapse {
  display: flex;
  flex-direction: row;
  /* Horizontal layout by default */
}

.custom-navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  /* Ensure items are horizontally aligned */
}

.custom-nav-item {
  margin-left: 1rem;
}

.custom-nav-link {
  text-decoration: none;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .custom-navbar-toggler {
    display: block;
    /* Show on mobile */
  }

  .custom-navbar-collapse {
    display: none;
    flex-direction: column;
    /* Vertical layout on mobile */
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #fff;
    /* Optional, for better visibility */
  }

  .custom-navbar-collapse.show {
    display: flex;
  }

  .custom-navbar-nav {
    flex-direction: column;
    /* Stack items vertically on mobile */
  }

  .custom-nav-item {
    margin: 0;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    /* Optional, for better separation */
  }
}

/*============================  Caresol Style ============================*/

header {
  width: 100%;
}

.header-content h1 {
  font-size: 3rem;
  /* Adjust the font size as needed */
  line-height: 1.2;
  /* Adjust line height for better spacing */
  margin: 0;
}

h1 {
  font-size: 2.6rem;
  /* Adjust the font size as needed */
  line-height: 1.2;
  /* Adjust line height for better spacing */
  margin: 0;
}

.header-content p {
  font-size: 1.25rem;
  /* Adjust the font size for the paragraph */
  margin-top: 0.5rem;
}

.header-image img {
  max-width: 100%;
  height: auto;
  /* Ensure the image scales correctly */
}
</style>
