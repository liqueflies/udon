<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h1> {{ page.title }} </h1>
    <p> {{ page.description }} </p>
  </div>
</template>

<script>
// @ is an alias to /src
import page, { asyncData } from '@/mixins/page'
import meta from '@/mixins/meta'

export default {
  name: "home",
  asyncData,
  mixins: [page, meta]
}
</script>
