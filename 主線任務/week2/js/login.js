import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      const uri = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(uri, this.user).then((res) => {
        const { token, expired } = res.data;
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products.html';
      }).catch((err) => {
        alert(err.response.data.message);
      });
    },
  },
}).mount('#app');