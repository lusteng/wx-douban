<template> 
    <div 
        class="l-rank"
        :style="{'background-image': 'url('+ data.bg_pic +')'}"
        @tap="handleSkip"
    >    
        <div class="mask"></div>
        <div style="z-index:2; position: relative"> 
            <p :class="{'title': true, 'colorful': data.type == 1}">{{data.title}}</p>
            <div class="l-rank-box">
                <div class="l-rank-movice">
                    <img 
                        v-for="(m, idx) in data.movices"
                        :key="idx"
                        :src="m.pic" 
                    />
                </div>
                <span class="l-rank-count">+{{data.hot_count}}</span>
            </div>
        </div>
    </div> 
</template>
<script>
export default {
    name: "LargeRankCard",
    props: {
        data:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        handleSkip(){
            this.$emit('skip')
        }
    }, 
}
</script>

<style lang="scss">
    $img_width: 60px;
    $img_height: 84px;
    .l-rank{
        border-radius: 5px; 
        height: 158px;
        background-size: cover;
        position: relative;
        padding-left: 20px;
        margin-top: 15px;  
        .mask{ 
            @include mask;
        }
        .title{ 
            font-size: 18px;
            color: $white_color;
            line-height: 58px;
            &.colorful{
                background-image: -webkit-linear-gradient(left,#fef8e2, #fae7c7  80%,#fae5b8);
                color:transparent;
                -webkit-background-clip: text;
                background-size: 200% 100%;
                font-size: 20px;
                font-weight: bold;
            }
        }
        .l-rank-box{ 
            @include flex;
            justify-content: flex-start; 
            align-items:center;
            height:$img_height;
            .l-rank-movice{
                position: relative;
                width: 135px;
                height: 100%;
                img{
                    position: absolute;
                    width: $img_width;  
                    z-index: 100;
                    left: 0;
                    top: 0;
                    box-shadow: 0 0 2px 0 rgba(33,22,20,.6);
                    &:nth-of-type(2){
                        z-index: 99;
                        left: $img_width / 2;
                    }
                    &:nth-of-type(3){
                        z-index: 98;
                        left: $img_width;
                    }
                }
            }
            .l-rank-count{
                font-size: 18px; 
                color: #c5bdb3;
                font-weight: bold;
            }
        }
    }
</style>
