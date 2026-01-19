<template>
<div class="relative w-full h-[520px] overflow-hidden mb-10">
  <img
    :src="slides[currentSlide].image"
    :alt="slides[currentSlide].title"
    class="w-full h-full object-cover"
  />

  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

  <div class="absolute inset-0 flex flex-col justify-center px-20">
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

<section class="max-w-7xl mx-auto py-10">
  <div class="text-center mb-10">
    <h2 class="text-4xl font-bold mt-2 mb-3">Discounts & Offers</h2>
    <p class="text-slate-600 dark:text-slate-300">Limited time travel deals</p>
  </div>

  <div class="relative overflow-hidden">
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${index * 33.3333}%)` }"
    >
      <div
        v-for="offer in offers"
        :key="offer.id"
        class="w-full md:w-1/3 px-3 flex-shrink-0"
      >
        <div class="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-900">
          <div class="relative">
            <span class="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {{ offer.badge }}
            </span>
            <img :src="offer.image || '/placeholder.jpg'" class="h-52 w-full object-cover" />
          </div>

          <div class="p-5">
            <h3 class="text-lg font-bold mb-1">{{ offer.title }}</h3>
            <p class="text-emerald-600 font-bold text-xl mb-2">
              {{ offer.price }} {{ offer.currency }}
            </p>
            <span class="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
              {{ offer.duration }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-2 mt-6" v-if="offers.length">
      <button
        v-for="(_, i) in offers"
        :key="i"
        @click="goTo(i)"
        class="h-2.5 rounded-full transition-all"
        :class="i === index ? 'w-8 bg-purple-600' : 'w-2.5 bg-slate-300 dark:bg-slate-600'"
      />
    </div>
  </div>
</section>

<section id="discover-tours" class="max-w-7xl mx-auto py-10">
    <div>
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-bold mt-2 mb-3">Discover amazing tours</h1>
        <p class="text-slate-600 dark:text-slate-300">
          Browse packages and plan your next trip.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          v-model="search"
          type="text"
          placeholder="Search by tour or city"
          class="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        />

        <select
          v-model="selectedCountry"
          class="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
        >
          <option
            v-for="country in countries"
            :key="country"
            :value="country"
          >
            {{ country === 'all' ? 'All countries' : country }}
          </option>
        </select>
      </div>

      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="tour in filteredTours"
          :key="tour.id"
          class="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden flex flex-col"
        >
          <img :src="tour.image" class="h-52 w-full object-cover" />

          <div class="p-4 flex-1 flex flex-col">
            <h2 class="text-lg font-semibold mb-1">{{ tour.title }}</h2>
            <p class="text-sm text-slate-500 mb-1">
              {{ tour.city }}, {{ tour.country }} • {{ tour.duration_days }} days
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
              {{ tour.description }}
            </p>

            <div class="mt-auto flex items-center justify-between">
              <p class="text-base font-bold text-emerald-600">
                From {{ tour.start_price }} {{ tour.currency }}
              </p>
              <button
                @click="goToTour(tour)"
                class="px-4 py-2 text-sm font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
              >
                View Details →
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

<section
  class="relative mt-12 min-h-[80vh] flex items-center justify-center
         bg-fixed bg-center bg-cover"
  style="background-image: url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg')"
>

  <div class="absolute inset-0 bg-black/40"></div>

  <div class="relative z-10 max-w-4xl mx-auto px-12 py-20 text-center">
    <p class="text-white/80 italic mb-4">
      Make Meet Happiness.
    </p>

    <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-6">
      Travel isn’t a luxury,<br />
      it’s a way of life!
    </h1>

    <p class="text-white/80 mb-1">Mr. Gabriel Harington</p>
    <p class="text-white/60 text-sm mb-10">CEO, GoFly</p>

    <button
      class="px-8 py-4 rounded-full
             bg-blue-600 hover:bg-blue-700
             text-white font-semibold shadow-lg"
    >
      Grab the Deal Now ↗
    </button>
  </div>
</section>

<section class="max-w-7xl mx-auto mt-12 py-10">
  <div class="bg-white dark:bg-slate-900 rounded-3xl px-10 py-16 text-center">

    <h2 class="text-3xl md:text-4xl font-bold mb-10">
      We’re Providing Best Service Ever!
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

      <div class="flex flex-col items-center text-center gap-3">
        <div class="h-14 w-14 rounded-full bg-yellow-400 flex items-center justify-center">
          <svg class="h-7 w-7 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 12l2 2 4-4M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold">Local Guidance</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Travel agencies have experienced professionals guidance.
        </p>
      </div>

      <div class="flex flex-col items-center text-center gap-3">
        <div class="h-14 w-14 rounded-full bg-sky-500 flex items-center justify-center">
          <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9 14l6-6M9 8h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold">Deals & Discounts</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Agencies have special discounts on flights, hotels & packages.
        </p>
      </div>

      <div class="flex flex-col items-center text-center gap-3">
        <div class="h-14 w-14 rounded-full bg-amber-400 flex items-center justify-center">
          <svg class="h-7 w-7 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m9-4a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold">Saves Money</h3>
        <p class="text-slate-600 dark:text-slate-400">
          Avoids hidden fees & tourist traps with budget-friendly options.
        </p>
      </div>

    </div>

    <div class="flex justify-center">
      <button
        class="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition inline-flex items-center gap-2">
        Flat 30% Discounts All Packages
        <span class="text-xl">↗</span>
      </button>
    </div>
  </div>
</section>

<section class="max-w-7xl mx-auto mt-12 mb-8 px-4">
  <div class="text-center mb-16">
    <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">Hear It from Travelers</h2>
    <p class="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
      We go beyond just booking trips — we create unforgettable travel experiences that match your dreams.
    </p>
  </div>

  <div class="relative overflow-hidden">
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${testimonialIndex * 33.3333}%)` }"
    >
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.id"
        class="w-full md:w-1/3 px-3 flex-shrink-0"
      >
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-800">
          <div class="flex items-center gap-4 mb-6">
            <img
              :src="testimonial.avatar"
              class="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-200 dark:ring-slate-700"
            />
            <div>
              <h4 class="font-bold text-lg text-slate-900 dark:text-white">{{ testimonial.name }}</h4>
              <p class="text-sm text-emerald-600 font-semibold">{{ testimonial.role }}</p>
            </div>
          </div>

          <div class="flex gap-1 text-emerald-500 mb-4 text-lg">
            {{ testimonial.stars }}
          </div>

          <h5 class="font-bold text-xl mb-3 text-slate-900 dark:text-white">{{ testimonial.title }}</h5>

          <p class="text-slate-600 dark:text-slate-300 leading-relaxed">{{ testimonial.review }}</p>
        </div>
      </div>
    </div>

    <!--<div class="flex justify-center gap-2 mt-12">
      <button
        v-for="(_, i) in testimonials"
        :key="i"
        @click="goToTestimonial(i)"
        class="h-2.5 rounded-full transition-all duration-300"
        :class="i === testimonialIndex ? 'w-10 bg-purple-600 shadow-lg' : 'w-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'"
      />
    </div>-->
  </div>

  <div class="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16 text-sm text-slate-600 dark:text-slate-400">
    <div class="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-6 py-3 rounded-xl">
      <span class="font-bold text-slate-900 dark:text-white">Tripadvisor</span>
      <span class="text-emerald-500 text-lg">★★★★★</span>
      <span>2,847 Reviews</span>
    </div>

    <div class="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
      <span class="font-bold text-2xl text-emerald-600">4.8</span>
      <span class="text-emerald-500 text-lg">★★★★★</span>
      <span>Trustpilot (12K reviews)</span>
    </div>
  </div>
</section>

<section class="max-w-7xl mx-auto py-16 px-4 mb-8">
  <div class="bg-white dark:bg-slate-900 rounded-3xl px-10 py-16 text-center">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-slate-900 dark:text-white mb-3">Questions & Answer</h2>
      <p class="text-slate-500 dark:text-slate-300">
        We’re committed to offering more than just products—we provide exceptional experiences.
      </p>
    </div>

    <div class="max-w-3xl mx-auto space-y-4">
      <div
        v-for="(faq, i) in faqs"
        :key="i"
        @click="toggle(i)"
        :class="[
          'rounded-xl px-6 py-5 cursor-pointer border transition-colors',
          activeIndex === i
            ? 'bg-white dark:bg-slate-900 border-purple-500'
            : 'bg-slate-100 dark:bg-slate-800 border-transparent'
        ]"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <p class="font-semibold text-slate-900 dark:text-white">
              {{ faq.q }}
            </p>

            <p v-if="activeIndex === i" class="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {{ faq.a }}
            </p>
          </div>

          <svg
            class="w-5 h-5 mt-1 transition-transform text-slate-500 dark:text-slate-300"
            :class="activeIndex === i ? '-rotate-180 text-purple-600' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/*Static data (slides/testimonials)*/
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

const testimonials = [
  {
    id: 1,
    name: 'Robert Karerry',
    role: 'GoFly Traveler',
    avatar: 'https://i.pravatar.cc/80?img=11',
    stars: '★★★★★',
    title: 'Excellent Tourist Place!',
    review: 'Our honeymoon package to the Maldives was beyond amazing! The travel agency took care of every detail.'
  },
  {
    id: 2,
    name: 'Selina Henry',
    role: 'GoFly Traveler',
    avatar: 'https://i.pravatar.cc/80?img=32',
    stars: '★★★★★',
    title: 'Great Experience!',
    review: 'This was the best trip of my life! Everything was perfectly planned and executed flawlessly. Highly recommended!'
  },
  {
    id: 3,
    name: 'James Bonde',
    role: 'GoFly Traveler',
    avatar: 'https://i.pravatar.cc/80?img=52',
    stars: '★★★★☆',
    title: 'Very Good Service',
    review: 'The tour was well organized though I wish we had more free time to explore independently. Overall good experience.'
  },
  {
    id: 4,
    name: 'Maria Gonzalez',
    role: 'GoFly Traveler',
    avatar: 'https://i.pravatar.cc/80?img=21',
    stars: '★★★★★',
    title: 'Perfect Vacation!',
    review: 'Switzerland trip was magical! The itinerary, guides, and accommodations were all top-notch. Will book again!'
  },
  {
    id: 5,
    name: 'Ahmed Khan',
    role: 'GoFly Traveler',
    avatar: 'https://i.pravatar.cc/80?img=41',
    stars: '★★★★★',
    title: 'Outstanding!',
    review: 'Dubai desert safari was thrilling! Professional team made our adventure safe and unforgettable.'
  },
  {
    id: 6,
    name: 'Lisa Chen',
    role: 'GoFly Traveler',
    avatar: 'https://i.pravatar.cc/80?img=62',
    stars: '★★★★★',
    title: 'Dream Come True',
    review: 'Bali was paradise! Every moment was perfect from beach resorts to cultural tours. Thank you!'
  }
]

const faqs = ref([
  {
    q: 'What Services Does Your Travel Agency Provide?',
    a: 'A travel agency typically provides a wide range of services to ensure a smooth and enjoyable travel experience. As like- Hotel booking, Flight Booking, Visa & Customized Travel Pakcge etc.'
  },
  {
    q: 'Do You Offer Customized Travel Packages?',
    a: 'Absolutely! We offer fully customized travel packages based on your interests, budget, and schedule. Whether you are planning a solo adventure, a family vacation, a romantic getaway, or a group tour, our team will tailor every detail to create a personalized travel experience just for you.'
  },
  {
    q: 'Can I Book Flights, Hotels, and Tours Separately?',
    a: 'Yes, you can! We provide the flexibility to book flights, hotels, and tours separately based on your specific needs. Whether you need just a flight, only accommodation, or want to add a tour later — we’re here to help you plan each part of your trip your way.'
  },
  {
    q: 'Do You Provide Visa Assistance?',
    a: 'Yes, we do! Our team offers complete visa assistance services to help you navigate the application process smoothly. From providing guidance on required documents to scheduling appointments and submitting applications, we are here to support you every step of the way.'
  },
  {
    q: 'What Payment Methods Do You Accept?',
    a: 'We accept a variety of payment methods to make your booking process easy and convenient. These include cash, bank transfers, mobile payments (such as bKash, Nagad), and major debit/credit cards. If you have a preferred payment option, feel free to let us know!'
  },
  {
    q: 'What Travel Documents are Required for International Travel?',
    a: 'For international travel, you’ll typically need several important travel documents, including a valid passport, visa (if required), airline tickets, travel insurance, and any COVID-19 related health certificates. Depending on your destination, additional documents may be necessary. Our team will guide you through the specific requirements for your trip.'
  }
])

// Start with one open (image me ek open dikh raha)
const activeIndex = ref(0)

// One open = others auto close:
const toggle = (i) => {
  activeIndex.value = activeIndex.value === i ? -1 : i
}

/*Reactive state (refs)*/
const currentSlide = ref(0)

const testimonialIndex = ref(0)
let testimonialTimer = null

const index = ref(0) // offers slider index
let offersTimer = null

let slideTimer = null

const toursRaw = ref([])
const cities = ref([])
const states = ref([])
const countriesData = ref([])
const packages = ref([])

const search = ref('')
const selectedCountry = ref('all')
const countries = ref(['all'])

/*GraphQL helper + queries*/
const fetchGraphQL = async (query) => {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })

  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0].message)
  return data
}

const TOURS_QUERY = `
  query {
    tours {
      id
      title
      description
      duration_days
      city_id
      images { file_url }
    }
  }
`

const CITIES_QUERY = `
  query {
    cities {
      id
      name
      stateId
    }
  }
`

const STATES_QUERY = `
  query {
    states {
      id
      name
      countryId
    }
  }
`

const COUNTRIES_QUERY = `
  query {
    countries {
      id
      name
    }
  }
`

const PACKAGES_QUERY = `
  query {
    packages {
      id
      tour_id
      package_name
      price
      currency
      is_featured
      images { file_url }
    }
  }
`

const fetchToursData = async () => {
  const [t, c, s, co, p] = await Promise.all([
    fetchGraphQL(TOURS_QUERY),
    fetchGraphQL(CITIES_QUERY),
    fetchGraphQL(STATES_QUERY),
    fetchGraphQL(COUNTRIES_QUERY),
    fetchGraphQL(PACKAGES_QUERY)
  ])

  toursRaw.value = t.tours
  cities.value = c.cities
  states.value = s.states
  countriesData.value = co.countries
  packages.value = p.packages

  countries.value = ['all', ...new Set(countriesData.value.map(x => x.name))]
}

/*Maps + main computed*/
const cityMap = computed(() =>
  Object.fromEntries(cities.value.map(c => [String(c.id), c]))
)

const stateMap = computed(() =>
  Object.fromEntries(states.value.map(s => [String(s.id), s]))
)

const countryMap = computed(() =>
  Object.fromEntries(countriesData.value.map(c => [String(c.id), c]))
)

const packageMap = computed(() =>
  Object.fromEntries(packages.value.map(p => [String(p.tour_id), p]))
)

const filteredTours = computed(() =>
  toursRaw.value
    .map(t => {
      const city = cityMap.value[String(t.city_id)]
      const state = city ? stateMap.value[String(city.stateId)] : null
      const country = state ? countryMap.value[String(state.countryId)] : null
      const pkg = packageMap.value[String(t.id)]

      return {
        id: t.id,
        title: t.title,
        description: t.description,
        duration_days: t.duration_days,
        city: city?.name || '',
        country: country?.name || '',
        start_price: pkg?.price || '',
        currency: pkg?.currency || '',
        image: t.images?.[0]?.file_url || '/placeholder.jpg'
      }
    })
    .filter(t => {
      const q = search.value.toLowerCase()

      if (selectedCountry.value !== 'all' && t.country !== selectedCountry.value) return false
      if (!q) return true

      return (
        t.title.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q)
      )
    })
    .slice(0, 6)
)

/*Offers (Discounts & Offers)*/
const getBadge = (price) => {
  if (price <= 300) return 'Save More'
  if (price <= 450) return 'Hot Deal'
  if (price <= 600) return 'Best Deal'
  return 'Luxury'
}

const offers = computed(() => {
  const featured = packages.value.filter(p => p.is_featured)

  return featured.slice(0, 6).map(p => {
    const tour = toursRaw.value.find(t => String(t.id) === String(p.tour_id))

    return {
      id: p.id,
      title: p.package_name,
      price: p.price,
      currency: p.currency,
      duration: tour ? `${tour.duration_days} Days` : '',
      badge: getBadge(Number(p.price)),
      image: p.images?.[0]?.file_url || '/placeholder.jpg'
    }
  })
})

const maxIndex = computed(() => Math.max(0, offers.value.length - 3))

const goTo = (i) => {
  index.value = i > maxIndex.value ? maxIndex.value : i
  resetOffers()
}

const startOffers = () => {
  offersTimer = setInterval(() => {
    if (offers.value.length <= 3) return
    index.value = index.value >= maxIndex.value ? 0 : index.value + 1
  }, 5000)
}

const resetOffers = () => {
  clearInterval(offersTimer)
  startOffers()
}

/*Testimonials slider*/
const maxTestimonialIndex = testimonials.length - 3

/*const goToTestimonial = (i) => {
  testimonialIndex.value = i > maxTestimonialIndex ? maxTestimonialIndex : i
  resetTestimonial()
}*/

const startTestimonial = () => {
  testimonialTimer = setInterval(() => {
    testimonialIndex.value = testimonialIndex.value >= maxTestimonialIndex ? 0 : testimonialIndex.value + 1
  }, 5000)
}

const resetTestimonial = () => {
  clearInterval(testimonialTimer)
  startTestimonial()
}

/*Hero slides auto-advance*/
const startSlides = () => {
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 5000)
}

/*Lifecycle hooks*/
onMounted(async () => {
  await fetchToursData()
  startOffers()
  startTestimonial()
  startSlides()
})

onBeforeUnmount(() => {
  clearInterval(offersTimer)
  clearInterval(testimonialTimer)
  clearInterval(slideTimer)
})

const goToTour = (tour) => {
  navigateTo(`/tour/${tour.id}`)
}
</script>

