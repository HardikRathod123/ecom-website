<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Update {{ product.title }}</h2>
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
                  :placeholder="product.title"
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
                  :placeholder="product.price"
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
                  :placeholder="product.stockQuantity"
                />
              </div>

              <!-- //   ?   Description  -->
              <div class="a-spacing-top-medium">
                <label for="" style="margin-bottom: 0px">Description</label>
                <textarea
                  style="width: 100%"
                  :placeholder="product.description"
                  v-model="description"
                ></textarea>
              </div>

              <!-- //   ?   Photo  -->
              <div class="a-spacing-top-medium">
                <label for="" style="margin-bottom: 0px">Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus" />
                    <input
                      type="file"
                      @change="onFileSelected"
                      :placeholder="product.photo"
                    />
                    <p style="margin-top: -70px">{{ fileName }}</p>
                  </label>
                </div>
              </div>

              <!-- //   ?   Button  -->
              <div class="a-spacing-top-large" @click="onUpdateProduct">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text">Update Product</span>
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
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("http://localhost:3000/api/category");
      let owners = $axios.$get("http://localhost:3000/api/owner");
      let product = $axios.$get(
        `http://localhost:3000/api/products/${params.id}`
      );

      const [catResponse, ownerResponse, productResponse] = await Promise.all([
        categories,
        owners,
        product,
      ]);

      console.log(productResponse);

      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners,
        product: productResponse.product,
      };
    } catch (err) {}
  },

  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: "",
      price: "",
      description: "",
      selectedFile: null,
      fileName: "",
      stockQuantity: "",
    };
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },

    //   ?   Update Product
    async onUpdateProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("description", this.description);
      data.append("ownerID", this.ownerID);
      data.append("categoryID", this.categoryID);
      data.append("photo", this.selectedFile, this.selectedFile.name);
      data.append("stockQuantity", this.stockQuantity);

      let result = await this.$axios.$put(
        `http://localhost:3000/api/products/${this.$route.params.id}`,
        data
      );

      this.$router.push("/");
    },
  },
};
</script>

<style></style>
