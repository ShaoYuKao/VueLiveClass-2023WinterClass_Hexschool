import productModal from './userProductModal.js';

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({
  generateMessage: localize('zh_TW'),
});

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = '202401-vue-shaoyu';

Vue.createApp({
  data() {
    return {
      products: [],
      productId: '',
      cart: {},
      loadingItem: '',  // 存 id
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    }
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/products/all`;
      axios.get(url).then((res) => {
        console.log('產品列表', res);
        this.products = res.data.products;
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    openModal(id) {
      this.productId = id;
    },
    addToCart(product_id, qty = 1) {
      this.loadingItem = product_id;
      const url = `${apiUrl}/api/${apiPath}/cart`;
      const data = {
        product_id,
        qty,
      };
      axios.post(url, { data }).then((response) => {
        console.log('加入購物車', response);
        this.$refs.productModal.hide();
        this.getCarts();
        this.loadingItem = '';
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    getCarts() {
      const url = `${apiUrl}/api/${apiPath}/cart`;
      axios.get(url).then((response) => {
        console.log('購物車', response);
        this.cart = response.data.data;
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    updateCartItem(item) {  // 購物車 id, 產品 id
      this.loadingItem = item.id;
      const url = `${apiUrl}/api/${apiPath}/cart/${item.id}`;
      const data = {
        product_id: item.product.id,
        qty: item.qty,
      };

      axios.put(url, { data }).then((response) => {
        console.log('更新購物車', response);
        // this.loadingStatus.loadingItem = '';
        this.getCarts();
        this.loadingItem = '';
      }).catch((err) => {
        alert(err.data.message);
        // this.loadingStatus.loadingItem = '';
      });
    },
    deleteItem(item) {
      this.loadingItem = item.id;
      const url = `${apiUrl}/api/${apiPath}/cart/${item.id}`;
      axios.delete(url).then((response) => {
        console.log('刪除購物車', response);
        this.getCarts();
        this.loadingItem = '';
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    deleteAllCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios.delete(url).then((response) => {
        this.getCarts();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      const order = this.form;
      axios.post(url, { data: order }).then((response) => {
        alert(response.data.message);
        this.$refs.form.resetForm();
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
})
.component('productModal', productModal)
.mount('#app');