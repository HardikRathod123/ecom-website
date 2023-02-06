<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2>Add a new category</h2>
          <form action="">
            <div class="a-spacing-top-medium"></div>
            <label>Type</label>
            <input class="a-input-text" style="width: 100%" v-model="type" />

            <!-- //   ?   Button  -->
            <br />
            <div class="a-spacing-top-large" @click="onAddCategory">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text">Add Product</span>
                </span>
              </span>
            </div>

            <br />
            <ul class="list-group">
              <li class="list-group-item" v-for="category in categories" :key="category._id">{{    category.title }}</li>
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
  async asyncData({$axios}){
    try{
        let response  = await $axios.$get("http://localhost:3000/api/category");
        return{
            categories: response.categories
        }
    }
    catch(err){

    }
  },
  data() {
    return {
      type: "",
    };
  },
  methods: {
    async onAddCategory() {
      try {
        let data = { title: this.type };
        let response = await this.$axios.$post(
          "http://localhost:3000/api/category",
          data
        );
        this.categories.push(data);
        this.type = "";        
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
