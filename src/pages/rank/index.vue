<template>
    <div>  
        <LoadingComponent 
            :show="loading"
        /> 
        <div class="rank" v-show="!loading"> 
            <LargeRankCard
                v-for="(item, index) in t_rank"
                :key="index"
                :data="item"
                @skip="handleSkipRankList(item.title)"
            />
            <div class="small-rank">
                <SmallRankCard
                    v-for="(item, index) in b_rank"
                    :key="index"
                    :data="item"
                    @skip="handleSkipRankList(`${item.catetry}2018榜单`)"
                /> 
            </div>

        </div>
    </div>
</template>

<script>
    import { BASE_PATH } from '@/utils/index' 
    import LargeRankCard from '@/components/LargeRankCard' 
    import SmallRankCard from '@/components/SmallRankCard' 
    import LoadingComponent from '@/components/LoadingComponent'
    export default {
        name: "rank",   
        components: {
            LargeRankCard,
            SmallRankCard,
            LoadingComponent,
        },
        data(){
            return {
                t_rank: [],
                b_rank: [],
                loading: false,
            }
        },
        mounted() {
            let _this = this; 
            const url = `${BASE_PATH}movice/rank`
            _this.loading = true 
            wx.request({
                url,
                method: 'GET',  
                header: { 'content-type': 'json' }, 
                success: function (res) { 
                    let data = res.data.data;
                    console.log(data);
                    
                    _this.t_rank = data.t_rank 
                    _this.b_rank = data.b_rank 
                },
                fail: function (err) { 
                    Toast.fail(err); 
                },
                complete: function(){
                    _this.loading = false
                }
            })  
        },
        methods: {
            handleSkipRankList(title){
                wx.navigateTo({ url: `/pages/rankList/main?title=${title}`})
            }
        },
    }
</script>

<style lang="scss">
    .rank{
        padding: 0 15px; 
    } 
    .b-rank:nth-child(1) .mask{
        @include mask(rgba(61,58,83,.9));
    }
    .b-rank:nth-child(2) .mask{
        @include mask(rgba(67,145,129,.9));
    }
    .b-rank:nth-child(3) .mask{
        @include mask(rgba(95,132,57,.9));
    }
    .b-rank:nth-child(4) .mask{
        @include mask(rgba(132,119,111,.9));
    }
    .b-rank:nth-child(5) .mask{
        @include mask(rgba(75,75,70,.9));
    }  
</style>





