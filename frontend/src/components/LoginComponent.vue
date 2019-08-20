<template>
  <div>
    <h1 class="page-header text-center mb-4 display-4">Login</h1>

    <div v-if="auth.authError" class="alert alert-danger" role="alert">
      Please check your credentials and try again
    </div>

    <div v-if="auth.setConnectionError" class="alert alert-danger" role="alert">
      Please check your connection and try again later
    </div>

    <form @submit="submitLoginForm">
      <div class="form-group">
        <label for="loginInputEmail">Email address</label>
        <input required type="email" class="form-control" id="loginInputEmail" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>

      <div class="form-group">
        <label for="loginInputPassword">Password</label>
        <input required type="password" class="form-control" id="loginInputPassword" placeholder="Password" v-model="password">
      </div>

      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="loginRememberCheckbox" v-model="rememberMe">
        <label class="form-check-label" for="loginRememberCheckbox">Remember me</label>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginComponent',

  data() {
    return {
      email : "",
      password : "",
      rememberMe: true
    }
  },

  computed: {
    auth: function() {
      return this.$store.state.auth
    }
  },

  methods: {
    ...mapActions({
      login: 'auth/login'
    }),

    submitLoginForm: function (e) {
      e.preventDefault()

      const email = this.email
      const password = this.password
      const rememberMe = this.rememberMe


      this.login({
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      }).then(() => {
        if (this.$store.state.auth.loggedIn) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>