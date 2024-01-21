import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: '202401-vue-shaoyu',
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    });

    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });

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
     */
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      axios.get(url).then((response) => {
        this.products = response.data.products;
      }).catch((err) => {
        alert(err.data.message);
      })
    },
    /**
     * [新增/更新]產品資料
     */
    updateProduct() {
      // 新增產品資料
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = 'post';

      if (!this.isNew) {
        // 更新產品資料
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = 'put'
      }

      if(this.tempProduct.imagesUrl && this.tempProduct.imagesUrl.length > 0) {
        const imagesUrlTemp = this.tempProduct.imagesUrl.filter(item => item != '');
        this.tempProduct.imagesUrl = imagesUrlTemp;
      }

      axios[http](url, { data: this.tempProduct }).then((response) => {
        alert(response.data.message);
        productModal.hide();
        this.getData();
      }).catch((err) => {
        alert(err.data.message);
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
    /**
     * 刪除產品
     */
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios.delete(url).then((response) => {
        alert(response.data.message);
        delProductModal.hide();
        this.getData();
      }).catch((err) => {
        alert(err.data.message);
      })
    },
    isAddImagesUrlBtuDisabled() {
      if(!this.tempProduct.imagesUrl || this.tempProduct.imagesUrl.length <= 0) {
        return false;
      }
      if(this.tempProduct.imagesUrl.some(item => item === '')) {
        return true;
      }
    }
  },
}).mount('#app');