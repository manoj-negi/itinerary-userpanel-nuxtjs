<template>
  <div
    class="min-h-screen
           bg-gradient-to-br from-slate-50 to-blue-50
           dark:from-slate-950 dark:to-slate-900
           text-slate-900 dark:text-slate-100"
  >
    <!-- banner section -->
    <div class="banner relative h-80 overflow-hidden">
      <div
        class="absolute inset-0
               bg-gradient-to-r
               from-blue-600/80 via-indigo-600/80 to-purple-600/80
               dark:from-blue-900/80 dark:via-indigo-900/80 dark:to-purple-900/80"
      ></div>

      <div class="relative z-10 flex items-center justify-center h-full px-6">
        <div class="text-center text-white drop-shadow-2xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            Explore the World
          </h1>
          <p class="text-xl md:text-2xl opacity-95 font-medium">
            Contact Us For More Information
          </p>
        </div>
      </div>
    </div>

    <!-- card section -->
    <section class="py-12 px-24">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(office, index) in offices"
            :key="index"
            :class="office.bg"
            class="rounded-2xl p-8 text-center
                   shadow-md hover:shadow-xl
                   transition-all duration-300
                   dark:bg-slate-800 dark:text-slate-100"
          >
            <div class="flex justify-center mb-5">
              <div
                class="w-14 h-14 flex items-center justify-center
                       rounded-full border
                       border-black/10 dark:border-white/20
                       text-xl"
              >
                <i class="fa-solid fa-location-dot"></i>
              </div>
            </div>

            <h3 class="text-2xl font-semibold mb-4">
              {{ office.title }}
            </h3>

            <p class="font-semibold mb-3">
              Contact : {{ office.phone }}
            </p>

            <p class="text-sm leading-relaxed opacity-80">
              {{ office.address }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- form section -->
    <section class="pb-24 px-6">
      <div
        class="max-w-4xl mx-auto
               bg-indigo-50 dark:bg-slate-800
               rounded-3xl p-10 md:p-14
               shadow-xl"
      >
        <h2 class="text-4xl font-bold text-center mb-3">
          Get in Touch!
        </h2>

        <p class="text-center text-sm opacity-70 mb-10">
          We're excited to hear from you! Whether you have a question about
          our services, want to discuss a new project.
        </p>

        <form
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
          @submit.prevent="submitInquiry"
        >
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium mb-2 dark:text-slate-200">
              Full Name
            </label>
            <input
              v-model="form.fullName"
              placeholder="Enter your full name"
              type="text"
              class="w-full px-4 py-3 rounded-lg border
                     bg-white text-slate-900
                     dark:bg-slate-700 dark:text-slate-100
                     dark:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-2 dark:text-slate-200">
              Email Address
            </label>
            <input
              v-model="form.email"
              placeholder="user@gmail.com"
              type="email"
              class="w-full px-4 py-3 rounded-lg border
                     bg-white text-slate-900
                     dark:bg-slate-700 dark:text-slate-100
                     dark:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium mb-2 dark:text-slate-200">
              Phone Number
            </label>
            <input
              v-model="form.phone"
              placeholder="+ 9874561230"
              type="tel"
              class="w-full px-4 py-3 rounded-lg border
                     bg-white text-slate-900
                     dark:bg-slate-700 dark:text-slate-100
                     dark:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Destination -->
          <div>
            <label class="block text-sm font-medium mb-2 dark:text-slate-200">
              Where are you going?
            </label>
            <select
              v-model="form.destination"
              class="w-full px-4 py-3 rounded-lg border
                     bg-white text-slate-900
                     dark:bg-slate-700 dark:text-slate-100
                     dark:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Maldives</option>
              <option>Dubai</option>
              <option>Switzerland</option>
              <option>United Kingdom</option>
            </select>
          </div>

          <!-- Message -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium mb-2 dark:text-slate-200">
              Inquiry Message
            </label>
            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Write your Inquiry message..."
              class="w-full px-4 py-3 rounded-lg border
                     bg-white text-slate-900
                     dark:bg-slate-700 dark:text-slate-100
                     dark:border-slate-600
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Checkbox -->
          <div class="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              v-model="form.agree"
              class="rounded
                     border-slate-300
                     dark:border-slate-500
                     dark:bg-slate-700
                     text-blue-600 focus:ring-blue-500"
            />
            <p class="text-sm opacity-70 dark:text-slate-300">
              I agree with privacy policy & terms & conditions.
            </p>
          </div>

          <!-- Button -->
          <div class="md:col-span-2">
            <button
              type="submit"
              :disabled="loading"
              class="bg-blue-600 hover:bg-blue-700
                     text-white px-6 py-3
                     rounded-lg font-semibold
                     disabled:opacity-60"
            >
              {{ loading ? "Submitting..." : "Submit Now" }}
            </button>
          </div>

          <!-- Messages -->
          <div v-if="successMsg" class="md:col-span-2 text-green-500 font-semibold">
            {{ successMsg }}
          </div>

          <div v-if="errorMsg" class="md:col-span-2 text-red-500 font-semibold">
            {{ errorMsg }}
          </div>
        </form>
      </div>
    </section>

    <!-- map section -->
    <section class="relative h-[500px] w-full">
      <iframe
        class="absolute inset-0 w-full h-full"
        src="https://www.google.com/maps?q=3B2%20Market%20Mohali&z=17&output=embed"
        style="border:0;"
        loading="lazy"
      ></iframe>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  fullName: "",
  email: "",
  phone: "",
  destination: "Maldives",
  message: "",
  agree: false,
});

const loading = ref(false);
const successMsg = ref("");
const errorMsg = ref("");

const submitInquiry = async () => {
  errorMsg.value = "";
  successMsg.value = "";

  if (!form.value.agree) {
    errorMsg.value = "Please accept terms & conditions";
    return;
  }

  loading.value = true;

  try {
    const res = await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation SubmitInquiry($input: InquiryInput!) {
            submitInquiry(input: $input) {
              success
              refId
            }
          }
        `,
        variables: {
          input: {
            fullName: form.value.fullName,
            email: form.value.email,
            phone: form.value.phone,
            destination: form.value.destination,
            message: form.value.message,
          },
        },
      }),
    });

    const data = await res.json();

    if (data.errors) {
      errorMsg.value = data.errors[0].message;
      return;
    }

    if (data.data.submitInquiry.success) {
      successMsg.value = "✅ Inquiry submitted successfully.";
      // Reset form
      form.value = {
        fullName: "",
        email: "",
        phone: "",
        destination: "Maldives",
        message: "",
        agree: false,
      };
    }

  } catch {
    errorMsg.value = "❌ Server error. Try later.";
  } finally {
    loading.value = false;
  }
};

const offices = [
  {
    title: "United State",
    phone: "+9874563210",
    address: "Los Angeles, USA",
    bg: "bg-lime-200",
  },
  {
    title: "Dubai Office",
    phone: "+9578964123",
    address: "Business Bay, Dubai",
    bg: "bg-blue-100",
  },
  {
    title: "United Kingdom",
    phone: "+9420794612",
    address: "London, UK",
    bg: "bg-emerald-200",
  },
];
</script>
