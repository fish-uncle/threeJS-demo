<template>
  <div>
    <ul class="fn-flex flex-row nav">
      <li>
        <router-link to="test1">test1</router-link>
      </li>
      <li>
        <router-link to="test2">test2</router-link>
      </li>
      <li>
        <router-link to="test3">test3</router-link>
      </li>
      <li>
        <router-link to="test4">test4</router-link>
      </li>
    </ul>
    <div>
      <router-view/>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>
