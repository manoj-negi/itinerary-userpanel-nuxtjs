<template>
  <div class="min-h-screen bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50">
    <header
      class="fixed inset-x-0 top-0 z-50 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 backdrop-blur"
    >
      <nav class="mx-auto px-8 py-5 flex items-center justify-between">
        <NuxtLink to="/" class="text-3xl font-bold text-purple-600">
          Infinite Horizons Travel Studio
        </NuxtLink>

        <div class="flex items-center gap-4">
          <template v-if="!user">
            <NuxtLink
              to="/login"
              class="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Log in
            </NuxtLink>
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
          </template>

          <template v-else>
            <button
              class="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-100 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              @click="toggleTheme"
              title="Toggle dark mode"
            >
              <span v-if="colorMode.value === 'dark'">☀</span>
              <span v-else>🌙</span>
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

    <main class="max-w-full mx-auto pt-16 pb-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

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
