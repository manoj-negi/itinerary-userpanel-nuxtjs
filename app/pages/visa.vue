<template>
  <div
    class="min-h-screen
           bg-gradient-to-br from-slate-50 to-blue-50
           dark:from-slate-950 dark:to-slate-900
           text-slate-900 dark:text-slate-100"
  >
<!-- Banner -->
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
             Visa Package 01
          </h1>
          <p class="text-xl md:text-2xl opacity-95 font-medium">
            Visa Package 01
          </p>
        </div>
      </div>
    </div>

  <!-- Visa Card Section -->
  <section class="py-12 px-24">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14"
      >
        <div
          v-for="country in countries"
          :key="country.name"
          class="rounded-2xl p-8 text-center
                   hover:-translate-y-2 transition
                   transition-all duration-300
                   dark:bg-slate-800 dark:text-slate-100"
          >
                      <div class="flex justify-center">
            <div
              class="w-48 h-48 overflow-hidden
                     rounded-[60%]
                     bg-white dark:bg-slate-700"
            >
              <img
                :src="country.image"
                :alt="country.name"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <h3 class="text-xl font-bold mt-6 mb-3">
            {{ country.name }}
          </h3>

          <p
            class="text-sm font-semibold
                   text-blue-600 dark:text-blue-400"
          >
            Processing Time -
            <span class="font-bold">
              ({{ country.processing }})
            </span>
          </p>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="bg-white dark:bg-slate-900 py-24">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <!-- Badge -->
        <div
          class="inline-block mb-4 px-6 py-2
                 rounded-full border
                 text-sm font-semibold
                 text-slate-700 dark:text-slate-300
                 border-slate-300 dark:border-slate-600"
        >
          100% Trusted Agency!
        </div>

        <!-- Heading -->
        <h2 class="text-3xl md:text-5xl font-bold mb-16">
          Why Choose Our Visa Agency?
        </h2>

        <!-- Cards -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left"
        >
          <div
            v-for="card in cards"
            :key="card.title"
           class="rounded-3xl p-8 min-h-[320px]
         hover:-translate-y-2 transition
         shadow-md dark:shadow-lg
         text-slate-900 dark:text-slate-100"
         :class="card.bg"
          >
            <h3 class="text-xl font-bold mb-4">
              {{ card.title }}
            </h3>
            <p class="text-sm leading-relaxed">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const countries = [
  {
    name: "Australia",
    processing: "15 - 30 Days",
    image: "/dummy/goa.jpg",
  },
  {
    name: "Canada",
    processing: "10 - 20 Days",
    image: "/dummy/kerala.jpg",
  },
  {
    name: "United Kingdom",
    processing: "01 - 02 Months",
    image: "/dummy/leh.jpg",
  },
  {
    name: "United States",
    processing: "01 - 03 Months",
    image: "/dummy/manali.jpg",
  }
];

const cards = [
  {
    title: "High Visa Approval Rate",
    description: "99% success rate with hassle-free processing.",
    bg: "bg-lime-200 dark:bg-slate-800",
  },
  {
    title: "Fast Processing",
    description: "Get approval within 48 hours.",
    bg: "bg-slate-100 dark:bg-slate-800",
  },
  {
    title: "Secure & Confidential",
    description: "Your data is always protected.",
    bg: "bg-indigo-100 dark:bg-slate-800",
  },
  {
    title: "24/7 Support",
    description: "Always available for your assistance.",
    bg: "bg-emerald-200 dark:bg-slate-800",
  },
];

</script>
