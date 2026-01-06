<template>
<div class="relative w-full h-[500px] overflow-hidden mb-10">
  <img
    :src="slides[currentSlide].image"
    :alt="slides[currentSlide].title"
    class="w-full h-full object-cover"
  />

  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

  <div class="absolute inset-0 flex flex-col justify-center px-6">
    <p class="text-sm font-semibold text-emerald-300 mb-2">Explore the world</p>
    <h1 class="text-3xl font-bold text-white mb-3">{{ slides[currentSlide].title }}</h1>
    <p class="text-slate-200 max-w-xl mb-5">{{ slides[currentSlide].subtitle }}</p>
    <button class="w-max px-6 py-2 bg-purple-600 text-white font-semibold rounded-full">{{ slides[currentSlide].cta }}</button>
  </div>

  <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
    <button
      v-for="(slide, index) in slides"
      :key="slide.id"
      @click="currentSlide = index"
      :class="[
        'w-2.5 h-2.5 rounded-full',
        index === currentSlide ? 'bg-white' : 'bg-white/40'
      ]"
    />
  </div>
</div>
  <section class="max-w-6xl mx-auto pt-10">
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mt-2 mb-2">Discover amazing tours</h1>
      <p class="text-slate-600 dark:text-slate-300">Browse packages and plan your next trip.</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 mb-8">
      <input v-model="search" type="text" placeholder="Search by tour or city" class="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"/>
      <select v-model="selectedCountry" class="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" >
        <option v-for="country in countries" :key="country" :value="country">{{ country === 'all' ? 'All countries' : country }}</option>
      </select>
    </div>

    <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="tour in filteredTours" :key="tour.id" class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <img :src="tour.image" alt="" class="h-40 w-full object-cover"/>

        <div class="p-4 flex-1 flex flex-col">
          <h2 class="text-lg font-semibold mb-1">{{ tour.title }}</h2>
          <p class="text-sm text-slate-500 mb-1">{{ tour.city }}, {{ tour.country }} • {{ tour.duration_days }} days</p>
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">{{ tour.description }}</p>

          <div class="mt-auto flex items-center justify-between">
            <p class="text-base font-bold text-emerald-600">From {{ tour.start_price }} {{ tour.currency }}</p>
            <button class="px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700">View details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script setup>
const tours = [
  {
    id: 1,
    title: 'Paris City Highlights',
    city: 'Paris',
    country: 'France',
    duration_days: 3,
    description: 'See the Eiffel Tower, Louvre, and more with a local guide.',
    start_price: 399,
    currency: 'EUR',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&w=800'
  },
  {
    id: 2,
    title: 'Swiss Alps Adventure',
    city: 'Interlaken',
    country: 'Switzerland',
    duration_days: 5,
    description: 'Mountains, lakes, and scenic train rides.',
    start_price: 499,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=800'
  },
  {
    id: 3,
    title: 'Tokyo City Lights',
    city: 'Tokyo',
    country: 'Japan',
    duration_days: 4,
    description: 'Modern city life, temples, and amazing food.',
    start_price: 599,
    currency: 'USD',
    image: 'https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&w=800'
  },
  {
  id: 4,
  title: 'Bali Beach Retreat',
  city: 'Kuta',
  country: 'Indonesia',
  duration_days: 6,
  description: 'Relax on tropical beaches, visit temples, and enjoy vibrant nightlife.',
  start_price: 549,
  currency: 'USD',
  image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&w=800'
},
{
  id: 5,
  title: 'New York City Explorer',
  city: 'New York',
  country: 'USA',
  duration_days: 4,
  description: 'Discover iconic landmarks, museums, and diverse neighborhoods.',
  start_price: 699,
  currency: 'USD',
  image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&w=800'
},
{
  id: 6,
  title: 'Desert Safari Experience',
  city: 'Dubai',
  country: 'UAE',
  duration_days: 2,
  description: 'Enjoy dune bashing, camel rides, and an evening desert camp.',
  start_price: 299,
  currency: 'USD',
  image: 'https://images.pexels.com/photos/240040/pexels-photo-240040.jpeg?auto=compress&w=800'
}
]

const search = ref('')
const selectedCountry = ref('all')

// list of countries
const countries = ref(['all'])

// filtered list
const filteredTours = computed(() =>
  tours.filter(tour => {
    const q = search.value.toLowerCase()

    // country check
    if (selectedCountry.value !== 'all' && tour.country !== selectedCountry.value) {
      return false
    }

    // search check
    if (!q) return true
    return (
      tour.title.toLowerCase().includes(q) ||
      tour.city.toLowerCase().includes(q)
    )
  })
)

const slides = [
  {
    id: 1,
    title: 'Find your next city escape',
    subtitle: 'From Paris to Tokyo, discover vibrant cities, iconic sights, and unforgettable nights.',
    cta: 'Start exploring',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&w=1600'
  },
  {
    id: 2,
    title: 'Adventure in the mountains',
    subtitle: 'Breathe fresh air, hike scenic trails, and relax by crystal-clear lakes.',
    cta: 'View mountain tours',
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&w=1600'
  },
  {
    id: 3,
    title: 'Experience the city lights',
    subtitle: 'Immerse yourself in food, culture, and nightlife in the world’s biggest cities.',
    cta: 'See city breaks',
    image: 'https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&w=1600'
  },
  {
    id: 4,
    title: 'Relax on stunning beaches',
    subtitle: 'Soft sand, warm water, and sunsets that feel like a dream.',
    cta: 'Browse beach trips',
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&w=1600'
  }
]

const currentSlide = ref(0)

// auto‑slide every 5 seconds
onMounted(async () => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)

  try {
    // 1. Countries from API
    const response = await $fetch('https://restcountries.com/v3.1/all?fields=name') // [file:1]
    const apiNames = response
      .map((country) => country.name?.common)
      .filter((name) => !!name)

    // 2. Countries from tours
    const tourNames = tours.map((tour) => tour.country)

    // 3. Merge both, remove duplicates, sort
    const allNames = Array.from(new Set([...apiNames, ...tourNames])).sort()

    // 4. Final list for dropdown
    countries.value = ['all', ...allNames]
  } catch (error) {
    // Fallback: only tour countries
    const tourNames = Array.from(new Set(tours.map((tour) => tour.country))).sort()
    countries.value = ['all', ...tourNames]
  }
})

</script>
