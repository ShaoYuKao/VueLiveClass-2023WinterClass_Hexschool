import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const API_URL = 'https://vue3-course-api.hexschool.io/v2';
const API_PATH = '202401-vue-shaoyu';
let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      apiUrl: API_URL,
      apiPath: API_PATH,
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {},
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    
    if(!token) {
      window.location = 'login.html';
    }

    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
  methods: {
    /**
     * 驗證登入
     */
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message)
          window.location = 'login.html';
        })
    },
    /**
     * 取得產品資料
     * @param {number} page 頁碼
     */
    getData(page = 1) {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
      axios.get(url).then((response) => {
        const { products, pagination } = response.data;
        this.products = products;
        this.pagination = pagination;
      }).catch((err) => {
        alert(err.data.message);
        window.location = 'login.html';
      })
    },
    /**
     * 開啟 Modal 視窗
     * @param {string} isNew 產品狀態(new, edit, delete)
     * @param {object} item 產品資料
     */
    openModal(isNew, item) {
      if (isNew === 'new') {
        // 新增產品資料 Modal

        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        // 編輯產品資料 Modal
        
        this.tempProduct = { ...item };

        if(!item.imagesUrl) {
          this.tempProduct.imagesUrl = [];
        }

        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        // 刪除產品資料 Modal

        this.tempProduct = { ...item };
        delProductModal.show()
      }
    },
  },
});

// 分頁元件
app.component('pagination', {
  template: '#pagination',
  props: ['pages'],
  methods: {
    emitPages(item) {
      this.$emit('emit-pages', item);
    },
  },
});

// 產品新增/編輯元件
app.component('productModal', {
  template: '#productModal',
  props: ['product', 'isNew'],
  data() {
    return {
      apiUrl: API_URL,
      apiPath: API_PATH,
    };
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false,
      backdrop: 'static'
    });
  },
  methods: {
    /**
     * [新增/更新]產品資料
     */
    updateProduct() {
      // 新增產品資料
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = 'post';

      if (!this.isNew) {
        // 更新產品資料
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.product.id}`;
        http = 'put'
      }

      if(this.product.imagesUrl && this.product.imagesUrl.length > 0) {
        const imagesUrlTemp = this.product.imagesUrl.filter(item => item != '');
        this.product.imagesUrl = imagesUrlTemp;
      }

      axios[http](url, { data: this.product }).then((response) => {
        alert(response.data.message);
        this.hideModal();
        this.$emit('update');
      }).catch((err) => {
        alert(err.data.message);
      })
    },
    isAddImagesUrlBtuDisabled() {
      if(!this.product.imagesUrl || this.product.imagesUrl.length <= 0) {
        return false;
      }
      if(this.product.imagesUrl.some(item => item === '')) {
        return true;
      }
    },
    openModal() {
      productModal.show();
    },
    hideModal() {
      productModal.hide();
    },
  },
});

// 產品刪除元件
app.component('delProductModal', {
  template: '#delProductModal',
  props: ['item'],
  data() {
    return {
      apiUrl: API_URL,
      apiPath: API_PATH,
    };
  },
  mounted() {
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false,
      backdrop: 'static',
    });
  },
  methods: {
    /**
     * 刪除產品
     */
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.item.id}`;
      axios.delete(url).then((response) => {
        alert(response.data.message);
        this.hideModal();
        this.$emit('update');
      }).catch((err) => {
        alert(err.data.message);
      })
    },
    openModal() {
      delProductModal.show();
    },
    hideModal() {
      delProductModal.hide();
    },
  },
});

app.mount('#app');