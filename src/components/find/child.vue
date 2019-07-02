<template>
    <div>
      <h1 ref="h1">{{n}}</h1>
      <button @click="change()">child</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
     n:0
    }
  },
  methods:{
    change:function(){
      this.n++;
      this.$refs.h1.style.color="#333"
    },
    showN:function(){
      return this.n;
    }
  }
}

</script>
<style scoped>

</style>
