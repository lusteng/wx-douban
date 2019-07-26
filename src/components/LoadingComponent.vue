<template>
    <div v-if="show" class="loading-box">
        <van-loading 
            type="spinner"  
        />
    </div>    
</template> 

<script>
export default {
    name: "LoadingComponent",
    props: {
        show: Boolean
    }, 
}
</script>


<style lang="scss">
    .loading-box{ 
        @include flex;
        justify-content: center;
        padding: 8px 0;
    }
</style>

