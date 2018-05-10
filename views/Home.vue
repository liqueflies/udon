<template>
  <div class="home">
    <img src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import page, { asyncData } from '@/mixins/page'
import meta from '@/mixins/meta'

export default {
  name: "home",
  asyncData,
  components: {
    HelloWorld
  },
  mixins: [page, meta]
}
</script>
