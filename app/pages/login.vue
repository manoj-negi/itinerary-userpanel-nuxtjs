<template>
  <div class="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Log in</h1>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 rounded-full
              bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700
              border border-slate-200 dark:border-slate-700
              px-4 py-2
              text-sm font-semibold text-slate-900 dark:text-slate-100
              transition-all hover:scale-105 shadow-sm hover:shadow-md"
      >
        <svg class="w-4 h-4 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </NuxtLink>
    </div>
    <div v-if="status.message" :class="statusClasses" class="mb-4 text-xs rounded-lg px-3 py-2">{{ status.message }}</div>

    <form class="space-y-4" @submit.prevent="submitLogin">
      <div>
        <label class="block text-sm font-medium mb-1" for="email">Email</label>
        <input v-model="form.email" id="email" type="email" required class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-slate-500" placeholder="abc@gmail.com"/>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1" for="password">Password</label>
        <input v-model="form.password" id="password" type="password" required class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-slate-500" placeholder="••••••••"/>
      </div>

      <button type="submit" class="w-full py-2.5 mt-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700">Log in</button>

      <p class="text-sm text-slate-600 dark:text-slate-400 text-center mt-3">
        New here?
        <NuxtLink to="/signup" class="text-purple-600 font-medium">Create an account</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup>
import { navigateTo } from '#app'

const { setAuth } = useAuth()
const route = useRoute()
const form = reactive({
  email: '',
  password: ''
})

const status = reactive({
  type: '',
  message: ''
})

const statusClasses = computed(() => {
  if (status.type === 'success') {
    return 'border border-emerald-400/70 bg-emerald-500/10 text-emerald-500 dark:text-emerald-200'
  }
  if (status.type === 'error') {
    return 'border border-rose-500/70 bg-rose-500/10 text-rose-700 dark:text-rose-200'
  }
  return ''
})

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        full_name
        email
        # if your schema exposes something like is_admin, use that instead
        role_id
      }
    }
  }
`

const submitLogin = async () => {
  status.type = ''
  status.message = ''

  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: LOGIN_MUTATION,
        variables: {
          email: form.email,
          password: form.password
        }
      })
    })

    if (!res.ok) {
      status.type = 'error'
      status.message = 'HTTP error ' + res.status
      return
    }

    const { data, errors } = await res.json()

    if (errors && errors.length) {
      status.type = 'error'
      status.message = errors[0].message || 'Login failed'
      return
    }

    const { token, user } = data.login
    const roleId = user.role_id
    if (roleId === '1') {
      status.type = 'error'
      status.message = 'Admin accounts cannot log in here. Use the admin login page.'
      return
    }

    setAuth(user, token)
    status.type = 'success'
    status.message = 'Login successful. Redirecting...'

    const route = useRoute()
    const redirectUrl = route.query.redirect
    if (redirectUrl) {
      return await navigateTo(decodeURIComponent(String(redirectUrl)))
    }
    await navigateTo('/')
  } catch (err) {
    console.error('Network error:', err)
    status.type = 'error'
    status.message = 'Network error. Please try again.'
  }
}
</script>