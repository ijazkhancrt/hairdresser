<script setup>

// define api_route
const config = useRuntimeConfig()
const apiUrl = config.public.apiUrl

definePageMeta({
  layout: "default",
});


import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const first_name = ref("");
const last_name = ref("");
const email = ref("");
const phone = ref("");
const service = ref("");
const address = ref("");
const city = ref("");
const state = ref("");
const zipcode = ref("");

onMounted(async () => {
  try {
    const id = route.params.id;
    const response = await fetch(`${apiUrl}/api/v1/get-user/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Initialize the form fields with fetched data
    first_name.value = data.user.name.split(" ")[0] || ""; // Assuming name contains first and last names
    last_name.value = data.user.name.split(" ")[1] || ""; // Adjust if the name structure is different
    email.value = data.user.email || "";
    phone.value = data.user.phone || "";
    service.value = data.user.service || "";
    address.value = data.user.address || "";
    city.value = data.user.city || "";
    state.value = data.user.state || "";
    zipcode.value = data.user.zipcode || "";
    console.log("User data fetched:", data.user); // Log fetched data for debugging
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
});

const handleSubmit = async () => {
  try {
    const id = route.params.id;
    const updatedUser = {
      name: `${first_name.value} ${last_name.value}`, // Concatenate first and last names
      email: email.value,
      phone: phone.value,
      service: service.value,
      address: address.value,
      city: city.value,
      state: state.value,
      zipcode: zipcode.value,
    };

    const response = await fetch(
      `${apiUrl}/api/v1/update-user/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      }
    );

    const result = await response.json();

    if (response.ok) {
      if (result.status === "success") {
        // Show success toaster
        const toaster = useToaster();
        toaster.show({
          title: "Success",
          message: "Hairdresser Updated Successfully",
          color: "success",
          icon: "ph:x",
          class: "end-2 top-2",
          closable: true,
        });
        const router = useRouter();
        router.push("/dashboards/hairdresser");
      } else {
        const toaster = useToaster();
        // Assuming you want to display the first validation error message
        const validationErrors = Object.values(result.data).flat();
        toaster.show({
          title: "Validation Error",
          message: validationErrors.join(", "), // Join multiple errors with a comma
          color: "danger",
          icon: "ph:x",
          class: "end-2 top-2",
          closable: true,
        });
    }
  }
} catch (error) {
    console.error("Error updating user data:", error);
    // Show a general error toaster for exceptions
    const toaster = useToaster();
    toaster.show({
      title: "Error",
      message: "An unexpected error occurred",
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
    <form @submit.prevent="handleSubmit">
      <!-- ========================================================= -->
      <div class="ltablet:col-span-8 col-span-12 lg:col-span-8">
        <BaseCard rounded="sm" class="p-4 md:p-8">
          <div class="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-12">
            <div class="col-span-12 mb-10 text-gray-600 sm:col-span-3 sm:mb-0">
              <BaseHeading as="h2" size="lg" weight="medium">
                Edit Doctor
              </BaseHeading>
              <BaseText size="xs" class="text-muted-400">
                Fill in the required fields
              </BaseText>
            </div>

            <div
              class="ltablet:col-span-9 col-span-12 space-y-10 lg:col-span-9"
            >
              <TairoFormGroup
                label="General info"
                sublabel="Some general information"
              >
                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-12 md:col-span-6">
                    <Field name="doctor.firstName">
                      <BaseInput
                        label="First name"
                        icon="ph:user-duotone"
                        placeholder="Ex: John"
                        v-model="first_name"
                        type="text"
                      />
                    </Field>
                  </div>

                  <div class="col-span-12 md:col-span-6">
                    <Field name="doctor.lastName">
                      <BaseInput
                        label="Last name"
                        icon="ph:user-duotone"
                        placeholder="Ex: Doe"
                        v-model="last_name"
                        type="text"
                      />
                    </Field>
                  </div>

                  <div class="col-span-12 md:col-span-6">
                    <Field name="doctor.email">
                      <BaseInput
                        label="Email Address"
                        icon="ph:envelope-duotone"
                        placeholder="Ex: johndoe@gmail.com"
                        v-model="email"
                        type="email"
                      />
                    </Field>
                  </div>
                  <div class="col-span-12 md:col-span-6">
                    <Field name="doctor.service">
                      <BaseSelect
                        label="Service"
                        icon="ph:scissors-duotone"
                        v-model="service"
                      >
                        <option value="" hidden />
                        <option value="Haircut">Haircut</option>
                        <option value="Coloring">Coloring</option>
                        <option value="Styling">Styling</option>
                        <option value="Perm">Perm</option>
                        <option value="Treatment">Treatment</option>
                      </BaseSelect>
                    </Field>
                  </div>

                  <div class="col-span-12">
                    <Field name="doctor.phone">
                      <AddonInputPhone
                        ref="inputPhoneRef"
                        label="Emergency Phone"
                        placeholder="Ex: +1 555 555 5555"
                        icon="lucide:phone"
                        v-model="phone"
                      />
                    </Field>
                  </div>
                </div>
              </TairoFormGroup>

              <TairoFormGroup
                label="Personal info"
                sublabel="Some personal information"
              >
                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-12">
                    <Field name="doctor.address">
                      <BaseInput
                        label="Address / Street"
                        icon="ph:map-pin-duotone"
                        placeholder="Ex: App 2 suite g3 santa monica"
                        v-model="address"
                      />
                    </Field>
                  </div>
                  <div class="col-span-12 sm:col-span-4">
                    <Field name="doctor.city">
                      <BaseInput
                        label="City"
                        icon="ph:buildings-duotone"
                        placeholder="Ex: Los Angeles"
                        v-model="city"
                      />
                    </Field>
                  </div>
                  <div class="col-span-12 sm:col-span-4">
                    <Field name="doctor.state">
                      <BaseInput
                        label="State/Province"
                        icon="ph:globe-duotone"
                        placeholder="Ex: CA"
                        v-model="state"
                      />
                    </Field>
                  </div>
                  <div class="col-span-12 sm:col-span-4">
                    <Field name="doctor.zipcode">
                      <BaseInput
                        type="text"
                        label="Zip Code"
                        icon="ph:paper-plane-tilt-duotone"
                        placeholder="Ex: 912656"
                        v-model="zipcode"
                      />
                    </Field>
                  </div>
                </div>
              </TairoFormGroup>

              <div class="text-right md:col-span-12">
                <div
                  class="-mt-4 inline-flex w-full items-center justify-end gap-2 sm:w-auto"
                >
                  <BaseButton
                    type="submit"
                    color="primary"
                    class="!h-12 w-full sm:w-40"
                  >
                    Submit
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </form>
  </div>
</template>
