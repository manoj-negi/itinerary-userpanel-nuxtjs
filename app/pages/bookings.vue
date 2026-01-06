<template>
  <div class="max-w-6xl mx-auto mt-20 mb-10 px-4">

    <header class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-50">Your bookings</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm">
        All your upcoming & past trips in one place.
      </p>
    </header>

    <section class="space-y-6">
      <div
        v-if="bookings.length === 0"
        class="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl
               border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <p class="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
          No bookings yet
        </p>
        <p class="text-slate-500 dark:text-slate-400 text-sm mb-4">
          Start exploring destinations and plan your next journey.
        </p>

        <NuxtLink
          to="/"
          class="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white
                 rounded-lg font-medium hover:bg-purple-700"
        >
          Book your first trip
        </NuxtLink>
      </div>

      <div
        v-for="(b, i) in bookings"
        :key="i"
        class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm
               border border-slate-200 dark:border-slate-800 p-5 flex gap-5 items-start"
      >
        <div
          class="min-w-[200px] h-32 rounded-xl bg-cover bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${b.image})` }"
        ></div>

        <div class="flex-1 flex flex-col justify-between">
          <div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-slate-50">
              {{ b.destination }}
            </h2>

            <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {{ b.start_date }} → {{ b.end_date }}
            </p>

            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
              {{ b.description }}
            </p>
          </div>
        </div>

        <div class="flex flex-col justify-between items-end min-w-[110px] text-right">
          <span
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-full',
              b.status === 'upcoming'
                ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                : b.status === 'completed'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200'
                  : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
            ]"
          >
            {{ b.status }}
          </span>

          <NuxtLink
            :to="`/bookings/${b.id}`"
            class="mt-4 px-4 py-2 text-sm rounded-lg bg-slate-900 text-white
                   dark:bg-slate-100 dark:text-slate-900
                   hover:bg-slate-800 dark:hover:bg-slate-200"
          >
            View details
          </NuxtLink>
        </div>
      </div>

    </section>

  </div>
</template>

<script setup lang="ts">
const bookings = reactive([
  {
    id: 1,
    destination: "Dubai, UAE",
    start_date: "10 Jan 2025",
    end_date: "15 Jan 2025",
    status: "upcoming",
    description: "A luxury desert trip with dune safari and Burj Khalifa visit.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
  },
  {
    id: 2,
    destination: "Bali, Indonesia",
    start_date: "5 Aug 2024",
    end_date: "12 Aug 2024",
    status: "completed",
    description: "A relaxing beach vacation with temple sightseeing.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4"
  }
])
</script>
