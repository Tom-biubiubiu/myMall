<template>
	<div class="home_ban">
		<div class="m_banner clearfix" id="my_banner">
            <ul class="banner_box" id="sliderBox"
                @touchstart.prevent="touchStart"
                @touchmove.prevent="touchMove"
                @touchend="touchEnd"
                >
                <li v-for="(v,i) in imgDatas"  :key="i"><img :src="v" alt="" /></li>
            </ul>
            <ul class="point_box">
                    <li v-for="(v,i) in imgDatas.slice(1,-1)" :key="i"
                        :class="{'dot-active':i===num}"
                        @click="currShow(i)"
                        ></li>
            </ul>
        </div>
	</div>
</template>

<script>
    var that;
export default {
  data () {
    return {
        num:0,
        imgDatas:[
            require('../../assets/images/l5.jpg'),
            require('../../assets/images/l1.jpg'),
            require('../../assets/images/l2.jpg'),
            require('../../assets/images/l3.jpg'),
            require('../../assets/images/l4.jpg'),
            require('../../assets/images/l5.jpg'),
            require('../../assets/images/l1.jpg'),
        ],
        sliderBox: '',
        distance: window.screen.width,
        interval: null, // 自动播放定时器
        timer: null,
        disable: true // 自动轮播
    }
  },
  //props:['imgDatas'],
    mounted:function(){   //生命周期  挂载完成
        that = this;
        this.sliderBox = document.getElementById('sliderBox');
        var sliderLi = document.querySelectorAll('.banner_box li');
        this.sliderBox.style.width = this.distance * sliderLi.length + 'px';

        this.sliderBox.style.left = -this.distance + 10 + 'px';
        for(var i=0;i<sliderLi.length;i++) {
            sliderLi[i].style.width = this.distance  + 'px'
        }
        this.$nextTick(() => {
            var sliBoxHeight = sliderLi[0].offsetHeight
            this.sliderBox.style.height = sliBoxHeight + 'px';
            this.autoPlay();
        })
    },
    methods:{   //方法
        autoPlay:function(){
            this.interval = setInterval(() => {
                this.animate(-this.distance)
            }, 2000)
        },
        animate(offset) { // 图片切换动画
            if(!this.disable) return;
            this.disable = false;
            let newLeft = parseInt(this.sliderBox.style.left) + offset;  // 下一张轮播图应该位移到的位置
            let interval = 10;  // 图片位移的时间
            let speed = ((offset / 10) / 3); //每10ms移动的位置 这里可以根据自己需求改动

            this.num++;
            if(this.num > this.imgDatas.length - 3) {
                this.num = 0;
            }

            var _change = function change() { // 利用定时器递归的模拟动画效果切换图片
                if (parseInt(that.sliderBox.style.left) === -that.distance * 6 + 10) {
                    that.sliderBox.style.left = -that.distance + 10 + 'px'
                    newLeft = -that.distance * 2 + 10
                }
                if (parseInt(that.sliderBox.style.left) > 0) {
                    that.sliderBox.style.left = -that.distance * 5 +10+ 'px'
                    newLeft = -that.distance * 4 + 10
                }
                that.timer = setTimeout(() => {
                    that.sliderBox.style.left = parseFloat(that.sliderBox.style.left) + speed + 'px'
                    // console.log(parseFloat(that.sliderBox.style.left), newLeft)
                    if (parseFloat(that.sliderBox.style.left) != newLeft) { // 判断是否到了应该到的位移位置，到达就清除计时器停止递归
                        _change()
                    } else {
                        clearTimeout(that.timer)
                        that.disable = true //动画完成进行下一次点击
                        /*console.log(that.disable)
                        console.log(that.sliderBox.style.left)*/
                    }
                }, interval)
            }
            _change();
        },
        currShow(i) {
            if(this.disable) {
                this.num = i;
                this.sliderBox.style.left = `-${this.distance * (this.num+1) - 10}px`
            }
        },
        touchStart(e) {
            this.disable = false; //停止轮播
            this.touchX = e.touches[0].pageX;
        },
        touchMove(e) {
            clearInterval(this.interval); //清空动画定时器
            this.moveX = e.touches[0].pageX;
            this.deltaX = this.moveX - this.touchX
            if(this.deltaX < 0) {
                this.sliderBox.style.left = `-${this.distance * (this.num + 2) - (this.distance - Math.abs(this.deltaX))}px`
            }else {
                this.sliderBox.style.left = -this.distance * this.num - (this.distance - this.deltaX) + 'px'
            }
        },
        touchEnd(e) {
            this.disable = true;
            this.autoPlay(); //继续自动轮播
            if(this.deltaX < 0) {
                if(Math.abs(this.deltaX) > this.distance * 0.7) {
                    this.num++;
                    if(this.num > this.imgDatas.length - 3) {
                        this.num = 0;
                    }
                    this.sliderBox.style.left = parseFloat(this.sliderBox.style.left) - (this.distance - Math.abs(this.deltaX)) +10+ 'px';
                }else {
                    this.sliderBox.style.left = parseFloat(this.sliderBox.style.left) - this.deltaX +10+ 'px';
                }
            }else {
                if(Math.abs(this.deltaX) > this.distance * 0.7) {
                    this.num--;
                    if(this.num < 0) {
                        this.num = this.imgDatas.length - 3;
                    }
                    this.sliderBox.style.left = parseFloat(this.sliderBox.style.left) + (this.distance - Math.abs(this.deltaX)) +10+ 'px';
                }else {
                    this.sliderBox.style.left = parseFloat(this.sliderBox.style.left) - this.deltaX +10+ 'px';
                }
            }
        }
    }
}
</script>
<style scoped>
.m_banner{
    position: relative;
}
.banner_box{
    position: relative;
    top: 0;
    /*transition: all 700ms cubic-bezier(0.215, 0.610, 0.355, 1);*/
}

.dot-active{
    background: #ff0038;
}
</style>