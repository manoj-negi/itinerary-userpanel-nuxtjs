<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
    <div class="max-w-5xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-14">
        <h1 class="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">
          Complete Your Booking
        </h1>
        <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Secure your adventure with just a few details
        </p>
      </div>

      <!-- Selected Package Summary -->
      <div
        v-if="bookingData"
        class="bg-white/90 dark:bg-slate-900/80 backdrop-blur rounded-3xl shadow-xl p-8 mb-10
               border border-slate-200/70 dark:border-slate-800 ring-1 ring-slate-900/5 dark:ring-white/5"
      >
        <div class="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                           bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 ring-1 ring-emerald-200/60 dark:ring-emerald-400/20">
                Max Occupancy: {{ bookingData.occupancy }}
              </span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                           bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 ring-1 ring-slate-200/70 dark:ring-slate-700">
                Fixed price
              </span>
            </div>

            <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              {{ bookingData.package_name }}
            </h2>

            <p class="text-slate-600 dark:text-slate-300">
              {{ bookingData.tour_title }} • {{ bookingData.duration_days }} Days
            </p>

            <div class="mt-5 h-px bg-slate-200/70 dark:bg-slate-800"></div>

            <div class="mt-5 flex items-end justify-between gap-4">
              <div>
                <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Package price
                </p>
                <p class="text-3xl font-black text-emerald-600">
                  {{ bookingData.price }}
                  <span class="text-sm font-bold text-slate-500 dark:text-slate-400">{{ bookingData.currency }}</span>
                </p>
              </div>

              <div class="text-right">
                <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Total
                </p>
                <p class="text-3xl font-black text-slate-900 dark:text-white">
                  {{ totalPrice }}
                  <span class="text-sm font-bold text-slate-500 dark:text-slate-400">{{ bookingData.currency }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Form -->
      <div class="grid lg:grid-cols-2 gap-8 mb-10">
        <!-- Traveler Details -->
        <div class="bg-white/90 dark:bg-slate-900/80 backdrop-blur rounded-3xl shadow-xl p-8
                    border border-slate-200/70 dark:border-slate-800 ring-1 ring-slate-900/5 dark:ring-white/5">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-extrabold text-slate-900 dark:text-white">Traveler Details</h3>
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Required *</span>
          </div>

          <form @submit.prevent="submitBooking" class="space-y-5">
            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Full Name *
              </label>
              <input
                v-model="form.name"
                required
                type="text"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700
                       bg-white dark:bg-slate-800 outline-none
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Email Address *
              </label>
              <input
                v-model="form.email"
                required
                type="email"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700
                       bg-white dark:bg-slate-800 outline-none
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Phone Number
              </label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700
                       bg-white dark:bg-slate-800 outline-none
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Travel Start Date *
              </label>
              <input
                v-model="form.date"
                required
                type="date"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700
                       bg-white dark:bg-slate-800 outline-none
                       focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                min="2026-02-01"
              />
            </div>
          </form>
        </div>

        <!-- Summary & Payment -->
        <div class="lg:sticky lg:top-8 space-y-6">
          <div class="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-3xl p-8 shadow-2xl">
            <div class="text-center">
              <p class="text-sm font-semibold opacity-90">Total payable</p>

              <div class="text-5xl font-black mt-3">
                {{ totalPrice }} <span class="text-lg font-bold opacity-90">{{ bookingData?.currency }}</span>
              </div>

              <div class="bg-white/15 rounded-2xl p-4 mt-6">
                <p class="text-sm opacity-90">No hidden fees • Secure payment</p>
              </div>

              <button
                @click="submitBooking"
                :disabled="submitting || loading"
                class="w-full bg-white text-emerald-700 font-black py-4 px-6 rounded-2xl text-lg
                       shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {{ submitting ? 'Processing...' : 'Confirm & Pay Now' }}
              </button>
            </div>
          </div>

          <div class="bg-white/90 dark:bg-slate-900/80 backdrop-blur rounded-2xl shadow-xl p-6
                      border border-slate-200/70 dark:border-slate-800 ring-1 ring-slate-900/5 dark:ring-white/5">
            <h4 class="font-extrabold text-lg mb-4 text-slate-900 dark:text-white text-center">
              Secure Payment
            </h4>
            <div class="flex flex-wrap gap-2 justify-center">
              <div class="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">VISA</div>
              <div class="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">Mastercard</div>
              <div class="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">Razorpay</div>
              <div class="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">UPI</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div
        v-if="message"
        :class="[
          'p-6 rounded-2xl text-center font-semibold text-lg mb-10',
          success
            ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-800 dark:bg-emerald-900/30'
            : 'bg-red-100 border-2 border-red-400 text-red-800 dark:bg-red-900/30'
        ]"
      >
        {{ message }}
      </div>
    </div>

    <!-- Bottom bookings (same data, nicer look) -->
    <div v-if="userBookings.length" class="px-4 pb-12">
      <div class="max-w-5xl mx-auto bg-white/90 dark:bg-slate-900/80 backdrop-blur rounded-3xl shadow-xl p-8
                  border border-slate-200/70 dark:border-slate-800 ring-1 ring-slate-900/5 dark:ring-white/5">
        <div class="flex items-center gap-2 mb-6">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white">
            Your Bookings
          </h2>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold
                       bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 ring-1 ring-slate-200/70 dark:ring-slate-700">
            {{ userBookings.length }}
          </span>
        </div>

        <div class="space-y-5">
          <div
            v-for="b in userBookings"
            :key="b.id"
            class="flex items-center justify-between gap-4 p-4 rounded-2xl
                   bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800
                   hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition"
          >
            <div>
              <div class="font-semibold text-slate-900 dark:text-white text-lg">
                Booking #{{ String(b.id).slice(-6).toUpperCase() }}
              </div>
              <div class="text-sm text-slate-500 dark:text-slate-400">
                {{ b.status }} • {{ b.travel_start_date }}
              </div>
            </div>

            <div class="font-black text-emerald-600 text-lg">
              ₹{{ b.total_price }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { user } = useAuth()

const loading = ref(true)
const submitting = ref(false)
const success = ref(false)
const message = ref('')
const bookingData = ref(null)
const userBookings = ref([])

const form = reactive({
  name: '',
  email: '',
  phone: '',
  date: ''
})

const fetchGraphQL = async (query, variables = {}) => {
  const res = await $fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  })
  if (res.errors?.length) throw new Error(res.errors[0].message)
  return res.data
}

const PACKAGE_QUERY = `
  query ($id: UUID!) {
    package(id: $id) {
      id
      package_name
      price
      currency
      tour_id
      occupancy
    }
  }
`

const TOUR_QUERY = `
  query ($id: UUID!) {
    tour(id: $id) {
      title
      duration_days
    }
  }
`

const BOOKINGS_QUERY = `
  query {
    bookings {
      id
      user_id
      package_id
      total_price
      status
      travel_start_date
    }
  }
`

const loadBookingData = async () => {
  loading.value = true
  message.value = ''

  try {
    const packageId = route.query.packageId || route.params.id
    if (!packageId) throw new Error('No package selected')

    const pData = await fetchGraphQL(PACKAGE_QUERY, { id: String(packageId) })
    const pkg = pData.package
    if (!pkg) throw new Error('Package not found')

    const tData = await fetchGraphQL(TOUR_QUERY, { id: String(pkg.tour_id) })

    bookingData.value = {
      ...pkg,
      tour_title: tData.tour?.title || '',
      duration_days: tData.tour?.duration_days || 0
    }

    // load my bookings (simple)
    if (user.value?.id) {
      const all = await fetchGraphQL(BOOKINGS_QUERY)
      userBookings.value = (all.bookings || []).filter(b => String(b.user_id) === String(user.value.id))
    }
  } catch (e) {
    message.value = e.message || 'Failed to load'
  } finally {
    loading.value = false
  }
}

const totalPrice = computed(() => {
  if (!bookingData.value) return '0'
  return String(bookingData.value.price) // fixed
})

const submitBooking = async () => {
  submitting.value = true
  message.value = ''
  success.value = false

  try {
    if (!user.value?.id) {
      // optional: send to login
      await navigateTo(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
      return
    }

    if (!bookingData.value?.id) throw new Error('Package not loaded')
    if (!form.date) throw new Error('Select travel date')

    const CREATE_BOOKING_MUTATION = `
      mutation CreateBooking(
        $user_id: UUID!
        $package_id: UUID!
        $total_price: String!
        $status: String!
        $travel_start_date: String!
        $travel_end_date: String!
      ) {
        createBooking(
          user_id: $user_id
          package_id: $package_id
          total_price: $total_price
          status: $status
          travel_start_date: $travel_start_date
          travel_end_date: $travel_end_date
        ) {
          id
          status
        }
      }
    `

    await fetchGraphQL(CREATE_BOOKING_MUTATION, {
      user_id: String(user.value.id),
      package_id: String(bookingData.value.id),
      total_price: String(totalPrice.value),
      status: 'pending',
      travel_start_date: form.date,
      travel_end_date: form.date
    })

    success.value = true
    message.value = 'Booking confirmed!'

    Object.assign(form, { name: '', email: '', phone: '', date: '' })

    // refresh bookings list
    const all = await fetchGraphQL(BOOKINGS_QUERY)
    userBookings.value = (all.bookings || []).filter(b => String(b.user_id) === String(user.value.id))

    await navigateTo('/bookings/confirmed')
  } catch (e) {
    message.value = e.message || 'Booking failed'
  } finally {
    submitting.value = false
  }
}

onMounted(loadBookingData)
</script>
