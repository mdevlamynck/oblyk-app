<template>
  <v-form
    @submit.prevent="newPassword()"
  >
    <v-text-field
      outlined
      v-model="oblyk_full_name"
      required
      hide-details
      tabindex="-1"
      autocomplete="off"
      value=""
      :label="$t('models.oblyk_full_name')"
      class="mb-2 full-name-field-form"
    />

    <v-text-field
      outlined
      v-model="password"
      :label="$t('models.user.password')"
      :type="showPassword ? 'text' : 'password'"
      required
      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="showPassword = !showPassword"
    />

    <v-text-field
      outlined
      v-model="passwordConfirmation"
      :label="$t('models.user.confirm_password')"
      :type="showPasswordConfirmation ? 'text' : 'password'"
      required
      :append-icon="showPasswordConfirmation ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append="showPasswordConfirmation = !showPasswordConfirmation"
    />

    <submit-form
      submit-local-key="actions.changeMyPassword"
      :overlay="overlay"
    />
  </v-form>
</template>

<script>
import SubmitForm from '@/components/forms/SubmitForm'

export default {
  name: 'NewPasswordForm',
  components: { SubmitForm },

  data () {
    return {
      overlay: false,
      rememberMe: true,
      password: null,
      oblyk_full_name: null,
      passwordConfirmation: null,
      showPassword: false,
      showPasswordConfirmation: false,
      token: null
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.token = urlParams.get('token')
  },

  methods: {
    newPassword: function () {
      this.overlay = true
      this.$store
        .dispatch('auth/newPassword', {
          token: this.token,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          oblyk_full_name: this.oblyk_full_name
        })
        .then(() => {
          this.$router.push('/')
        }).catch(() => {
          this.$root.$emit('alertSimpleError', this.$t('components.session.newPasswordError'))
        }).finally(() => {
          this.overlay = false
        })
    }
  }
}
</script>
