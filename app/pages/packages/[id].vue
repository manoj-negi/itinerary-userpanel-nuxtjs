<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <!-- FULL SCREEN HERO -->
    <!-- COMPLETE HERO SECTION - Replace your entire first <section> -->
    <section v-if="loading" class="relative w-full h-[calc(100vh-133px)] bg-gradient-to-br from-slate-900 to-emerald-900 flex items-center justify-center">
    <div class="text-center text-white px-6">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-6"></div>
        <h1 class="text-3xl md:text-4xl font-bold mb-2">Loading Package Details</h1>
        <p class="text-xl opacity-90">Please wait while we fetch everything...</p>
    </div>
    </section>

    <section v-else class="relative w-full h-[calc(100vh-133px)] overflow-hidden">
    <img
        :src="pkg?.image || '/placeholder.jpg'"
        :alt="pkg?.title || 'Package image'"
        class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>

    <div class="absolute inset-0 flex items-end pb-10 md:pb-16">
        <div class="w-full max-w-6xl mx-auto px-6">
        <div class="flex items-center gap-4 mb-6">
            <span class="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-bold">
            {{ tour?.country || 'Worldwide' }}
            </span>
            <span class="px-3 py-1 bg-white/20 text-white rounded-full text-sm">
            {{ tour?.duration_days || 0 }} Days
            </span>
        </div>

        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight drop-shadow-2xl text-white">
            {{ pkg?.title || 'Loading...' }}
        </h1>

        <p class="text-xl md:text-2xl opacity-90 drop-shadow-lg text-white">
            {{ pkg?.tour_title || tour?.title || 'Premium Package' }} • {{ pkg?.price || '' }} {{ pkg?.currency || '' }}
        </p>
        </div>
    </div>
    </section>

    <!-- ERROR -->
    <section v-if="!loading && error" class="max-w-3xl mx-auto px-4 -mt-16 relative z-10">
      <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-10 border border-red-200 dark:border-red-900">
        <h2 class="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">Package Not Found</h2>
        <p class="text-slate-600 dark:text-slate-300 mb-6">{{ error }}</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          ← Back to Home
        </NuxtLink>
      </div>
    </section>

    <!-- CONTENT -->
    <section v-if="!loading && !error && pkg" class="relative -mt-8 max-w-7xl mx-auto px-4 pb-16">
      <div class="grid lg:grid-cols-3 gap-10">
        <!-- LEFT -->
        <main class="lg:col-span-2 space-y-8">
          <!-- Overview -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 lg:p-12 border border-slate-100 dark:border-slate-800">
            <h2 class="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Package Overview</h2>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ pkg?.description || tour?.description || 'Loading details...' }}
            </p>
          </div>

          <!-- Tour Info -->
          <div v-if="tour" class="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 lg:p-12 border border-slate-100 dark:border-slate-800">
            <h2 class="text-3xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
              <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Tour Details
            </h2>
            <p class="text-lg mb-4">{{ tour.title }}</p>
            <p class="text-slate-600 dark:text-slate-300">{{ tour.description }}</p>
          </div>
        </main>

        <!-- RIGHT -->
        <aside class="lg:sticky lg:top-8 space-y-6">
          <!-- Price -->
          <div class="bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-3xl p-8 shadow-2xl">
            <div class="text-center">
              <div class="mb-6">
                <div class="text-4xl font-black mb-2">{{ pkg.price }} {{ pkg.currency }}</div>
                <p class="text-md opacity-75">{{ tour?.duration_days }} Days</p>
              </div>

              <button
                @click="bookNow"
                class="w-full bg-white text-emerald-600 font-bold py-4 px-6 rounded-2xl text-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
              >
                Book This Package →
              </button>
            </div>
          </div>

          <!-- Quick Info -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-800">
            <h4 class="font-bold text-xl mb-6 text-slate-900 dark:text-white text-center">Quick Facts</h4>
            <div class="space-y-4 text-sm">
              <div class="flex justify-between py-3 border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                <span class="text-slate-600 dark:text-slate-400">📍 Location</span>
                <span class="font-semibold text-slate-900 dark:text-white">{{ tour?.city }}</span>
              </div>
              <div class="flex justify-between py-3 border-b border-slate-200 dark:border-slate-800 last:border-b-0">
                <span class="text-slate-600 dark:text-slate-400">⏱️ Duration</span>
                <span class="font-semibold text-slate-900 dark:text-white">{{ tour?.duration_days }} days</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-600 dark:text-slate-400">💰 Price</span>
                <span class="font-semibold text-emerald-600 dark:text-emerald-400">
                  {{ pkg.price }} {{ pkg.currency }}
                </span>
              </div>
            </div>
          </div>

          <!-- Back -->
          <NuxtLink
            :to="`/tour/${pkg?.tour_id || ''}#packages-section`"
            class="block w-full text-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700
                   text-slate-800 dark:text-slate-200 py-4 px-6 rounded-2xl font-semibold transition-colors"
          >
            ← Explore All Packages
          </NuxtLink>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()
const { token } = useAuth()
const packageId = computed(() => String(route.params.id))

const loading = ref(true)
const error = ref('')
const pkg = ref(null)
const tour = ref(null)

const fetchGraphQL = async (query, variables = {}) => {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })
  const result = await res.json()
  if (result.errors?.length) throw new Error(result.errors[0].message)
  return result.data
}

const PACKAGE_QUERY = `
  query ($id: UUID!) {
    package(id: $id) {
      id
      package_name
      price
      currency
      images { file_url }
      tour_id
    }
  }
`

const TOUR_QUERY = `
  query ($id: UUID!) {
    tour(id: $id) {
      id
      title
      description
      duration_days
      city_id
      images { file_url }
    }
  }
`

const CITY_QUERY = `query ($id: UUID!) { city(id: $id) { id name stateId } }`
const STATE_QUERY = `query ($id: UUID!) { state(id: $id) { id name countryId } }`
const COUNTRY_QUERY = `query ($id: UUID!) { country(id: $id) { id name } }`

const load = async () => {
  loading.value = true
  error.value = ''
  pkg.value = null
  tour.value = null

  try {
    const pRes = await fetchGraphQL(PACKAGE_QUERY, { id: packageId.value })
    const pItem = pRes.package
    if (!pItem) throw new Error(`Package not found for id=${packageId.value}`)

    pkg.value = {
      id: pItem.id,
      title: pItem.package_name,
      price: pItem.price,
      currency: pItem.currency,
      image: pItem.images?.[0]?.file_url || '/placeholder.jpg',
      tour_id: pItem.tour_id
    }

    const tRes = await fetchGraphQL(TOUR_QUERY, { id: pItem.tour_id })
    const tItem = tRes.tour

    const cityRes = await fetchGraphQL(CITY_QUERY, { id: String(tItem.city_id) })
    const city = cityRes.city

    const stateRes = city?.stateId ? await fetchGraphQL(STATE_QUERY, { id: String(city.stateId) }) : { state: null }
    const state = stateRes.state

    const countryRes = state?.countryId ? await fetchGraphQL(COUNTRY_QUERY, { id: String(state.countryId) }) : { country: null }
    const country = countryRes.country

    tour.value = {
      id: tItem.id,
      title: tItem.title,
      description: tItem.description,
      duration_days: tItem.duration_days,
      city: city?.name || '',
      country: country?.name || '',
      image: tItem.images?.[0]?.file_url || '/placeholder.jpg'
    }
  } catch (e) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, load, { immediate: true })

const bookNow = async () => {
  const id = pkg.value?.id
  if (!id) return
  
  // Simple check: token exists = logged in
  if (!token.value) {
    return navigateTo(`/login?redirect=/bookings/${id}`)
  }
  
  await navigateTo(`/bookings/${id}`)
}

</script>
