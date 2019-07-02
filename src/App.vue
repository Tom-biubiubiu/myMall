<template>
  <div id="app">
    <router-view></router-view>
    <NavBottom v-show="showNav"/>
  </div>
</template>

<script>
import NavBottom from './components/NavBottom'
import {mapGetters} from 'vuex'

export default {
  name: 'App',
  data () {
    return {
     
    }
  },
  methods:{},
  components:{
    NavBottom
  },
  computed: {
      ...mapGetters(['showNav'])
  }
}
</script>
<style>
.active {
  color:red;
}
</style>
