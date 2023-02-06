<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a new Product</h2>
            <form action="">
              <!-- //   ?   Category DropDown -->
              <div class="a-spacing-top-medium">
                <label for="">Category</label>
                <select class="a-select-option" v-model="categoryID">
                  <option
                    v-for="category in categories"
                    :value="category._id"
                    :key="category._id"
                  >
                    {{ category.title }}
                  </option>
                </select>
              </div>

              <!-- //   ?   Owner DropDown -->
              <div class="a-spacing-top-medium">
                <label for="">Owner</label>
                <select name="" id="" class="a-select-option" v-model="ownerID">
                  <option
                    v-for="owner in owners"
                    :value="owner._id"
                    :key="owner._id"
                  >
                    {{ owner.name }}
                  </option>
                </select>
              </div>

              <!-- //   ?   Title  -->
              <div class="a-spacing-top-medium">
                <label for="" style="margin-bottom: 0px">Title</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="title"
                />
              </div>

              <!-- //   ?   Price  -->
              <div class="a-spacing-top-medium">
                <label for="" style="margin-bottom: 0px">Price</label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="price"
                />
              </div>

              <!-- //   ?   Stock quantity  -->
              <div class="a-spacing-top-medium">
                <label for="" style="margin-bottom: 0px">Stock Quantity</label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="stockQuantity"
                />
              </div>

              <!-- //   ?   Description  -->
              <div class="a-spacing-top-medium">
                <label for="" style="margin-bottom: 0px">Description</label>
                <textarea
                  style="width: 100%"
                  placeholder="Provide details such as a product description"
                  v-model="description"
                ></textarea>
              </div>

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
              <div class="a-spacing-top-large" @click="onAddProduct">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text">Add Product</span>
                  </span>
                </span>
              </div>
            </form>
          </div>
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
      let categories = $axios.$get("http://localhost:3000/api/category");
      let owners = $axios.$get("http://localhost:3000/api/owner");

      const [catResponse, ownerResponse] = await Promise.all([
        categories,
        owners,
      ]);

      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners,
      };
    } catch (err) {}
  },

  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: "",
      price: 0,
      description: "",
      selectedFile: null,
      fileName: "",
      stockQuantity: 1,
    };
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },

    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("description", this.description);
      data.append("ownerID", this.ownerID);
      data.append("categoryID", this.categoryID);
      data.append("photo", this.selectedFile, this.selectedFile.name);
      data.append("stockQuantity", this.stockQuantity);
      let result = await this.$axios.$post(
        "http://localhost:3000/api/products",
        data
      );

      this.$router.push("/");
    },
  },
};
</script>

<style></style>
