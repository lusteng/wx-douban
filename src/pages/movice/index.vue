<template>
    <div>
        <div class="db-search-wrap">
            <div class="db-search"> 
                <van-icon 
                    name="search" 
                    size="16px" 
                    custom-class="search-icon"
                    custom-style="margin-right:2px; vertical-align: middle;"
                /> 
                <span>搜索</span>
            </div>
        </div>
        <div>
            <LoadingComponent 
                :show="loading"
            /> 
            <OrderCard 
                v-for="(item, key) in datas"
                :key="key"
                :title="maps[item.orderType]"
                :type="item.orderType"
                :data="item.items"
            />   
        </div> 
        <van-toast id="van-toast" />
    </div>
</template>

<script>
import OrderCard from '@/components/OrderCard'
import Toast from 'static/vant-weapp/toast/toast'; 
import LoadingComponent from '@/components/LoadingComponent'
import { BASE_PATH, HOME_NAMES } from '@/utils/index' 
export default {
    name: "movice",
    components: {
        OrderCard,
        LoadingComponent,
    },
    data(){
        return {
            datas: {},
            maps: HOME_NAMES,
            loading: false,
        }
    },
    mounted() {
        let _this = this; 
        const url = `${BASE_PATH}query`
        _this.loading = true
        wx.request({
            url,
            method: 'GET',  
            header: { 'content-type': 'json' }, 
            success: function (res) { 
                let data = res.data.data; 
                _this.datas = res.data.data || {}
            },
            fail: function (err) { 
                Toast.fail(err); 
            },
            complete: function(){
                _this.loading = false
            }
        }) 
    },
}
</script>

<style lang="scss" scope>
    $bg: red;
    .db-search-wrap{
        color: $bg; 
        background: $db_theme;
        padding: 9px 8px;
        .db-search{
            height: 27px;
            line-height: 27px;
            border-radius: 3px;
            font-size: 13px;
            background: $white_color;
            text-align: center;
            color: #959595; 
            vertical-align: middle;
        } 
    } 
</style>





