<template>
  <div>
    <h2>這是後台</h2>
    <nav>
      <RouterLink to="/admin/products">產品列表</RouterLink> |
      <RouterLink to="/admin/oder">訂單列表</RouterLink> |
      <RouterLink to="/">返回前台</RouterLink>
    </nav>
    <RouterView></RouterView>
  </div>
</template>

<script>
import axios from 'axios'

const { VITE_URL } = import.meta.env

export default {
  data () {
    return {}
  },
  methods: {
    checkAdmin () {
      const url = `${VITE_URL}/api/user/check`
      axios.post(url)
        .then((res) => {
          console.log('驗證成功', res.data)
        })
        .catch((err) => {
          alert(err.data.message)
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    if (!token) {
      this.$router.push('/login')
    }

    axios.defaults.headers.common.Authorization = token

    this.checkAdmin()
  }
}
</script>
