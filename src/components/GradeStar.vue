<template>
    <div class="rate-wrap">
        <div class="rate-box">
            <van-rate 
                :size="8"
                :count="count"
                void-color="#b9b9b9"
                void-icon="star"
                custom-class="ml-star"
                disabled 
            />
        </div> 
        <div class="progress">
            <span :style="{'width' : score + '%'}"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "GradeStar",
    props: {
        score: Number,
        count: Number
    }
}
</script>

<style lang="scss">
    .rate-wrap{
        line-height: 10px;
    }
    .rate-box{
        display: inline-block;
        width: 45px;
        text-align: right;
        padding-right: 5px;
    }
    .progress{
        display: inline-block;
        width: 100px;
        background: $gray_color;
        position: relative;
        height: 5px;
        border-radius: 1px;
        overflow: hidden;
        vertical-align: middle;

        span{
            position: absolute;
            left: 0px;
            height: 100%;
            border-radius: 1px;
            background: $active_color;
        }
    }
</style>
