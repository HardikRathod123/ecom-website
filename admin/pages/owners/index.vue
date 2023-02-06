<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Add a new Owner</h2>
          <form action="">
            <!-- //   ?   Name -->
            <div class="a-spacing-top-medium"></div>
            <label>Name</label>
            <input class="a-input-text" style="width: 100%" v-model="name" />

            <!-- //   ?   About -->
            <div class="a-spacing-top-medium"></div>
            <label>About</label>
            <input class="a-input-text" style="width: 100%" v-model="about" />

            <!-- //   ?   Photo  -->
            <div class="a-spacing-top-medium">
              <label for="" style="margin-bottom: 0px">Add Photo</label>
              <div class="a-row a-spacing-top-medium">
                <label class="choosefile-button">
                  <i class="fal fa-plus" />
                  <input type="file" @change="onFileSelected" />
                  <p style="margin-top: -70px">{{ fileName }}</p>
                </label>
              </div>
            </div>

            <!-- //   ?   Button  -->
            <br />
            <div class="a-spacing-top-large" @click="onAddOwner">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text">Add Owner</span>
                </span>
              </span>
            </div>

            <br />
            <ul class="list-group">
              <li class="list-group-item" v-for="owner in owners" :key="owner._id">{{ owner.name }}</li>
            </ul>
          </form>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/owner");
      return {
        owners: response.owners,
      };
    } catch (err) {}
  },
  data() {
    return {
      name: "",
      about: "",
      selectedFile: null,
      fileName: "",
    };
  },
  methods: {
    async onAddOwner() {
      try {
        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);

        let response = await this.$axios.$post(
          "http://localhost:3000/api/owner",
          data
        );
        this.owners.push({name: this.name});
        this.name = "";
      } catch (err) {
        console.log(err);
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
  },
};
</script>

<style></style>
