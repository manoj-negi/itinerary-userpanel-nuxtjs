<template>
  <div class="min-h-screen bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50">
    <header
      v-if="!isAuthPage" class="fixed inset-x-0 top-0 z-50 bg-white/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 backdrop-blur"
    >
      <nav class="mx-auto px-20 py-5 flex items-center justify-between">
        <NuxtLink to="/" class="text-3xl font-bold text-purple-600">
          Infinite Horizons Travel Studio
        </NuxtLink>

        <div class="flex-1 mx-10 max-w-2xl hidden lg:block">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
              </svg>
            </span>

            <input
              v-model="headerSearch"
              type="text"
              placeholder="Find Your Perfect Tour Package"
              class="w-full h-11 rounded-full pl-12 pr-4
                    bg-slate-100/80 dark:bg-slate-800/60
                    border border-slate-200 dark:border-slate-700
                    text-slate-800 dark:text-slate-100
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div class="flex items-center gap-4">
          <template v-if="!user">
            <NuxtLink to="/support" class="text-md font-bold text-purple-600">
              Need Help?
            </NuxtLink>

            <div class="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>

            <button
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                    border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-800
                    text-slate-700 dark:text-slate-100
                    shadow-md hover:shadow-lg
                    hover:bg-slate-50 dark:hover:bg-slate-700
                    transition"
              @click="toggleTheme"
            >
              <span class="text-base leading-none">
                {{ colorMode.value === 'dark' ? '☀' : '🌙' }}
              </span>
              {{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
            </button>

            <NuxtLink
              to="/login"
              class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
                    text-white
                    bg-gradient-to-r from-slate-900 to-slate-700
                    hover:from-slate-950 hover:to-slate-800
                    shadow-md hover:shadow-lg
                    transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </NuxtLink>

            <!--
            <NuxtLink
              to="/signup"
              class="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 shadow-sm"
            >
              Sign up
            </NuxtLink> 
            

            <button
              class="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-100 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              @click="toggleTheme"
              title="Toggle dark mode"
            >
              <span v-if="colorMode.value === 'dark'">☀</span>
              <span v-else>🌙</span>
            </button>
            -->
          </template>

          <template v-else>
            <NuxtLink to="/support" class="text-md font-bold text-purple-600">
              Need Help?
            </NuxtLink>

            <div class="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>

            <button
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                    border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-800
                    text-slate-700 dark:text-slate-100
                    shadow-md hover:shadow-lg
                    hover:bg-slate-50 dark:hover:bg-slate-700
                    transition"
              @click="toggleTheme"
            >
              <span class="text-base leading-none">
                {{ colorMode.value === 'dark' ? '☀' : '🌙' }}
              </span>
              {{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
            </button>

            <div class="flex items-center gap-4">
              <div class="flex flex-col leading-tight">
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-300 tracking-wide">
                  WELCOME BACK
                </span>
                <span class="text-sm font-semibold text-slate-800 dark:text-slate-50">
                  {{ user.full_name }}
                </span>
              </div>

              <div class="relative" ref="menuRef">
                <button
                  type="button"
                  class="flex items-center gap-1 rounded-full bg-gradient-to-br from-purple-500 to-sky-500 pl-1 pr-2 py-1 text-white shadow-md hover:shadow-lg transition"
                  @click.stop="showMenu = !showMenu"
                >
                  <span
                    class="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold"
                  >
                    {{ user.full_name.charAt(0).toUpperCase() }}
                  </span>
                  <svg
                    class="h-4 w-4 text-white transition-transform"
                    :class="showMenu ? 'rotate-180' : ''"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  v-if="showMenu"
                  class="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden"
                >
                  <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p class="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                    <p class="text-sm font-medium text-slate-800 dark:text-slate-50 truncate">
                      {{ user.email }}
                    </p>
                  </div>

                  <NuxtLink
                    to="/"
                    class="block px-4 py-2.5 text-sm text-slate-800 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800"
                    @click="showMenu = false"
                  >
                    Home
                  </NuxtLink>
                  <NuxtLink
                    to="/profile"
                    class="block px-4 py-2.5 text-sm text-slate-800 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800"
                    @click="showMenu = false"
                  >
                    Profile
                  </NuxtLink>
                  <NuxtLink
                    to="/bookings"
                    class="block px-4 py-2.5 text-sm text-slate-800 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800"
                    @click="showMenu = false"
                  >
                    Bookings
                  </NuxtLink>

                  <button
                    class="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                    @click="handleLogout"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </nav>
    </header>

    <!-- SECOND BAR (below your main header) -->
    <div
      v-if="!isAuthPage" class="fixed inset-x-0 top-[84px] z-40 bg-white/90 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 backdrop-blur"
    >
      <nav class="mx-auto px-20 flex items-center justify-between">
        <div class="flex items-center gap-6 text-md font-bold text-slate-700 dark:text-slate-100">
            <NuxtLink to="/" class="flex items-center gap-1 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Home
            </NuxtLink>
            <NuxtLink to="/tourDetails" class="flex items-center gap-1 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Destination
            </NuxtLink>
            <NuxtLink to="/packages" class="flex items-center gap-1 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Travel Package
            </NuxtLink>
            <NuxtLink to="/visa" class="flex items-center gap-1 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Visa
            </NuxtLink>
            <NuxtLink to="/pages" class="flex items-center gap-1 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Pages
            </NuxtLink>
            <NuxtLink to="/contact" class="px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              Contact
            </NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <a
            href="https://wa.me/919345533865"
            class="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm transition inline-flex items-center gap-2"
          >
            WhatsApp
          </a>

          <a
            href="tel:+919345533865"
            class="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition inline-flex items-center gap-2"
          >
            +91 345 533 865
          </a>
        </div>
      </nav>
    </div>

    <main class="max-w-full mx-auto pt-[133px]">
      <slot />
    </main>

    <footer
      v-if="!isAuthPage" class="relative bg-white dark:bg-slate-900
            text-slate-700 dark:text-slate-200
            border-t border-slate-200 dark:border-slate-800"
    >
      <!-- Top Inquiry Bar -->
      <div class="py-6 px-6 border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <!-- Inquiry -->
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-comments text-indigo-600 dark:text-indigo-400 text-2xl"></i>
            <div>
              <h4 class="font-semibold text-slate-900 dark:text-white">To More Inquiry</h4>
              <p class="text-sm text-slate-600 dark:text-slate-400">
                Don't hesitate to call Infinite Horizons Travel Studio.
              </p>
            </div>
          </div>

          <!-- WhatsApp -->
          <div class="flex items-center gap-3">
            <i class="fa-brands fa-whatsapp text-green-600 dark:text-green-400 text-2xl"></i>
            <div>
              <p class="text-sm text-slate-600 dark:text-slate-400">WhatsApp</p>
              <a
                href="https://wa.me/919345533865"
                class="font-semibold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                +91 345 533 865
              </a>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-envelope text-blue-600 dark:text-blue-400 text-2xl"></i>
            <div>
              <p class="text-sm text-slate-600 dark:text-slate-400">Mail Us</p>
              <a
                href="mailto:info@example.com"
                class="font-semibold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                info@example.com
              </a>
            </div>
          </div>

          <!-- Call -->
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-phone text-indigo-600 dark:text-indigo-400 text-2xl"></i>
            <div>
              <p class="text-sm text-slate-600 dark:text-slate-400">Call Us</p>
              <a
                href="tel:+919345533865"
                class="font-semibold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition"
              >
                +91 456 453 345
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Content -->
      <div class="py-14 px-6">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <!-- Company -->
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Infinite Horizons Travel Studio
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Skyline Plaza, 5th Floor,<br />
              Los Angeles, CA 90001, USA
            </p>

            <div class="flex gap-4 mt-6 text-lg text-slate-600 dark:text-slate-400">
              <!-- Facebook -->
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
                title="Facebook"
              >
                <i class="fa-brands fa-facebook-f"></i>
              </a>

              <!-- LinkedIn -->
              <a
                href="https://linkedin.com/company/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
                title="LinkedIn"
              >
                <i class="fa-brands fa-linkedin-in"></i>
              </a>

              <!-- Instagram -->
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                class="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-110"
                title="Instagram"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>

          <!-- Destinations -->
          <div>
            <h4 class="font-semibold mb-4 text-slate-900 dark:text-white">Top Destination</h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Maldives Tour</li>
              <li>Bali Tour</li>
              <li>Thailand Tour</li>
              <li>Switzerland Tour</li>
            </ul>
          </div>

          <!-- Popular -->
          <div>
            <h4 class="font-semibold mb-4 text-slate-900 dark:text-white">Popular Search</h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Adventure</li>
              <li>Holiday Packages</li>
              <li>Flights & Hotels</li>
              <li>Honeymoon Trip</li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="font-semibold mb-4 text-slate-900 dark:text-white">Resources</h4>
            <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>About GoFly</li>
              <li>Visa Processing</li>
              <li>Customize Tour</li>
              <li>Travel Reviews</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="px-6 py-5 border-t border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-sm text-slate-600 dark:text-slate-400">
            © {{ new Date().getFullYear() }} Infinite Horizons Travel Studio. All rights reserved.
          </p>
          <div class="flex gap-5 text-sm text-slate-600 dark:text-slate-400">
            <NuxtLink to="/privacy" class="hover:text-purple-600 dark:hover:text-purple-400 transition">Privacy</NuxtLink>
            <NuxtLink to="/terms" class="hover:text-purple-600 dark:hover:text-purple-400 transition">Terms</NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

  const route = useRoute()
const isAuthPage = computed(() => 
  ['/login', '/signup'].includes(route.path)
)
const colorMode = useColorMode()
const headerSearch = ref('')


const { user, clearAuth } = useAuth()
const showMenu = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const handleLogout = () => {
  user.value = null
  showMenu.value = false
  clearAuth() 
  navigateTo('/')
}

onMounted(() => {
  const handler = (e: MouseEvent) => {
    if (!showMenu.value) return
    const el = menuRef.value
    if (el && !el.contains(e.target as Node)) {
      showMenu.value = false
    }
  }
  window.addEventListener('click', handler)
  onBeforeUnmount(() => window.removeEventListener('click', handler))
})
</script>
