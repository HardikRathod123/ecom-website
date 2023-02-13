<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Update Your Profile</h2>
          <a href="#" @click="onLogout">Logout</a>
          <form action="">
            <!-- //   ?   Name -->
            <div class="a-spacing-top-medium"></div>
            <label>Name</label>
            <input
              class="a-input-text"
              style="width: 100%"
              v-model="name"
              :placeholder="$auth.$state.user.name"
            />

            <!-- //   ?   Email -->
            <div class="a-spacing-top-medium"></div>
            <label>Email</label>
            <input
              class="a-input-text"
              style="width: 100%"
              v-model="email"
              :placeholder="$auth.$state.user.email"
            />

            <!-- //   ?   Password -->
            <div class="a-spacing-top-medium"></div>
            <label>Password</label>
            <input
              class="a-input-text"
              style="width: 100%"
              v-model="password"
            />

            <!-- //   ?   Button  -->
            <br />
            <div class="a-spacing-top-large" @click="onUpdateProfile">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text">Update Profile</span>
                </span>
              </span>
            </div>
            <br />
          </form>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async onUpdateProfile() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
        };

        let response = await this.$axios.$put("api/auth/user", data);
        console.log(response.success);

        if (response.success) {
          this.name = "";
          this.email = "";
          this.password = "";
          await this.$auth.fetchUser();
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err);
      }
    },

    async onLogout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style></style>
