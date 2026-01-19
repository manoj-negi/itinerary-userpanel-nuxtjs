<!-- pages/signup.vue -->
<template>
  <div class="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Create account</h1>
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
    <form class="space-y-4" @submit.prevent="submitSignup">
      <div>
        <label class="block text-sm font-medium mb-1">Full name</label>
        <input
          v-model="form.full_name"
          type="text"
          required
          class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Phone</label>
        <input
          v-model="form.phone"
          type="tel"
          class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
          v-model="form.password"
          type="password"
          required
          class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        class="w-full py-2.5 mt-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700"
      >
        Create account
      </button>

      <p class="text-sm text-slate-600 dark:text-slate-400 text-center mt-3">
        Already have an account?
        <NuxtLink to="/login" class="text-purple-600 font-medium">Log in</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  full_name: '',
  email: '',
  password: '',
  phone: '',
})

const CREATE_USER = `
  mutation CreateUser(
    $full_name: String!
    $email: String!
    $password: String!
    $phone: String
  ) {
    createUser(
      full_name: $full_name
      email: $email
      password: $password
      phone: $phone
    ) {
      id
      full_name
      email
      phone
    }
  }
`

const submitSignup = async () => {
  try {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: CREATE_USER,
        variables: {
          full_name: form.full_name,
          email: form.email,
          password: form.password,
          phone: form.phone || null,
        },
      }),
    })

    if (!res.ok) {
      alert('HTTP error ' + res.status)
      return
    }

    const { data, errors } = await res.json()

    if (errors && errors.length) {
      console.error(errors)
      alert(errors[0].message || 'Signup failed')
      return
    }

    console.log('User created:', data.createUser)
    alert('Account created!')
    await navigateTo('/login')
  } catch (err) {
    console.error('Network error:', err)
    alert('Network error')
  }
}
</script>

