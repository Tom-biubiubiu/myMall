<template>
    <div>
      姓名：<input type="text" ref="input"/>
      <button @click="fun()">click</button>
      <Child ref="child"/>

      <button @click="flag= !flag">显示动画</button>
      <!-- <transition name="fade">
        <p v-show="flag">hello world</p>
      </transition> -->
      <!-- <transition name="fade"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
			>
			<p v-show="flag">Welcome</p>
		</transition> -->
    <transition enter-active-class="animated swing" leave-active-class="animated pulse">
			<p v-show="flag">Welcome</p>
		</transition>
    </div>
</template>

<script>
import Child from './child';
import animate from 'animate.css';
export default {
  data () {
    return {
     name:'find',
     flag:false
    }
  },
  methods:{
    fun:function(){
      this.$refs.input.focus();
      this.$refs.input.value="12345";
      console.log(this.$refs.child.n); //获取子组件中的数据
      console.log(this.$refs.child.showN()); //获取子组件中的方法
      this.$refs.child.change();//父组件操作子组件的方法
      this.$refs.child.$refs.h1.style.color="#f60"; //操作子组件中的ref属性
    },
    beforeEnter(el){
						// alert('动画进入之前');
						el.style.background='red';
					},
					enter(el){
            el.innerHTML='Welcome'
						// alert('动画进入');
					},
					afterEnter(el){
						// alert("进入动画之后")
						el.style.background='blue';
					},
					beforeLeave(el){
						el.innerHTML="123";
						// alert("动画离开之前")
					},
					leave(){

						// alert("动画离开")
					},
					afterLeave(){
						// alert("动画离开之后")
					}
  },
  components:{
    Child
  }
}

</script>
<style scoped>
  p{
			width: 200px;
			height: 200px; 
			background-color: red;
		}
		/*开始过渡阶段，动画离开阶段*/
		/*v-enter-active 和 v-leave-active 可以控制进入/离开过渡的不同的缓和曲线，在下面章节会有个示例说明。*/
		.fade-enter-active, .fade-leave-active{
			transition: all 3s ease;
		}

		/*离开*/
		.fade-leave-active{
			opacity: 0;
			width: 10px;
			height: 10px;
		}
		/*开始*/
		.fade-enter{ 
			opacity: 0;
			width: 10px;
			height: 10px;
		}
</style>
