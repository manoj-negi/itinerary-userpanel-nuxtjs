<template>
  <div
    class="tour-page min-h-screen
    bg-gradient-to-br from-slate-50 to-blue-50
    dark:from-slate-950 dark:to-slate-900
    text-slate-900 dark:text-slate-100"
  >
    <!-- Banner -->
    <div class="banner relative h-80 overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600"
          alt="Banner"
          class="w-full h-full object-cover brightness-75"
        />
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600"
          alt="Banner Overlay"
          class="absolute inset-0 w-full h-full object-cover brightness-75 mix-blend-overlay opacity-60"
        />
      </div>

      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-purple-600/80"></div>

      <div class="relative z-10 flex items-center justify-center h-full px-6">
        <div class="text-center text-white drop-shadow-2xl">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            Explore the World
          </h1>
          <p class="text-xl md:text-2xl opacity-95 font-medium">
            Discover Amazing Adventures
          </p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-32">
      <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-300 border-t-blue-600"></div>
    </div>

    <!-- Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Tabs -->
      <div class="flex flex-wrap gap-3 justify-center mb-12">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="[
            activeTab === tab
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border dark:border-slate-700',
            'px-6 py-3 rounded-2xl hover:shadow-md transition'
          ]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div
          v-if="filteredTours.length === 0"
          class="col-span-full text-center py-16 text-gray-500 dark:text-gray-400"
        >
          No tours in {{ activeTab }}
        </div>

        <!-- CARD -->
        <div
          v-for="tour in filteredTours"
          :key="tour.id"
          class="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2"
        >
          <!-- Image -->
          <div
            class="w-full h-48 rounded-3xl overflow-hidden shadow-lg
            bg-white dark:bg-slate-800"
          >
            <img
              :src="tour.image_url"
              :alt="tour.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <!-- Location -->
          <div class="mt-4 flex items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
            </svg>

            <span class="text-sm text-gray-900 dark:text-gray-200">
              {{ tour.title }}
            </span>
          </div>
        </div>
        <!-- END CARD -->
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const loading = ref(true)
const tours = ref<any[]>([])

const tabs = ["Europe", "Asia", "Middle East", "Africa", "North America", "Oceania"]
const activeTab = ref("Europe")

const GET_TOURS = `
  query GetTours {
    tours {
      UUID
      title
      description
      category_id
      city_id
      duration_days
      created_by
      images {
        file_url
        alt_text
      }
    }
  }
`
// const fetchData = async () => {
//   try {
//     loading.value = true
//     const response = await $fetch('/api/graphql', {
//       method: 'POST',
//       body: { query: GET_TOURS }
//     })

//     const toursData = response?.data?.tours || []
//     tours.value = toursData.map((tour: any) => ({
//       id: tour.id,
//       title: tour.title || 'Rome, Italy',
//       description: tour.description || '',
//       category_id: Number(tour.category_id) || 1,
//       city_id: Number(tour.city_id) || 1,
//       duration_days: Number(tour.duration_days) || 7,
//       created_by: Number(tour.created_by) || 1,
//       // image_url:
//       //   tour.images?.[0]?.file_url ||
//       //   'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
//       image_url: '/dummy/goa.jpg',
//       region: 'Europe'
//     }))
//   } catch (error) {
//     console.error('Error:', error)
//   } finally {
//     loading.value = false
//   }
// }

const filteredTours = computed(() => {
  return tours.value.filter(
    tour => tour.region?.toLowerCase() === activeTab.value.toLowerCase()
  )
})

// onMounted(fetchData)
</script>
