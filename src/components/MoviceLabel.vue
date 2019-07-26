<template> 
    <div 
        :class="{'ml-label': true, 'text-center' : centerLayout}"
        @tap="handleSkipDetail"
    >
        <img
            :src="pic"
        />
        <p class="ml-title text-overflow">{{title}}</p>
        <div class="ml-rate clearfix">
            <van-rate
                allow-half
                :size="10"
                disabled
                disabled-color="#ffd21e"
                :value="rate"
                custom-class="ml-star"
            />
            <span class="fr ml-rate-num">
                {{rate}}    
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:"MoviceLabel", 
    props: {
        pic: String,
        title: String,
        rate: [String, Number],
        centerLayout: Boolean, //文字是否居中对齐
    },  
    methods: { 
        toRate(val){
            return 2
            return val - 1
        },
        handleSkipDetail(){
            wx.navigateTo({ url: `/pages/moviceDetail/main`})
        }
    },
}
</script>

<style lang="scss">
.ml-label{
    margin-right: 14px;
    width: 80px;
    display: inline-block;
    img{ 
        height: 112px;
        margin-bottom:4px;  
        background: #ddd; 
    }
    .ml-title{
        font-size: 12px;
        color: #000;
        line-height: 22px; 
    }  
    .ml-rate{ 
        .ml-star{
            display: inline-block; 
            .van-rate__item {
                padding: 0 1px;
            }
        }
        .ml-rate-num{
            font-size: 12px;
            color: #666;
        }
    } 
    &.text-center{
        .ml-title{
            text-align: center;
        }
    }
}
</style>
