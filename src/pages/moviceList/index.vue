<template>
    <div>
        <div class="movice-list">
            <div 
                class="movice-item"
                v-for="(item, index) in list" 
                :key="index"
            > 
                <MoviceLabel 
                    :pic="item.cover.url"
                    :title="item.title" 
                    :rate="(item.rating.value / 2).toFixed(1)"
                    centerLayout
                />  
            </div> 
        </div>
        <LoadingComponent 
            :show="loading"
        /> 
    </div>
</template>

<script>
import { BASE_PATH, HOME_NAMES } from '@/utils/index' 
import MoviceLabel from '@/components/MoviceLabel'
import LoadingComponent from '@/components/LoadingComponent'
export default {
    name: "moviceList",
    components: {
        MoviceLabel,
        LoadingComponent,
    }, 
    data(){
        return {
            list: [],
            page: 1,
            loadMore: true,
            loading: false,
        }
    },
    mounted() {
        wx.setNavigationBarTitle({  
            title: HOME_NAMES[this.$root.$mp.query.type || '1']  
        })  
        this.queryList()
    },
    onReachBottom(){
        this.queryList()
    }, 
    methods: {  
        queryList(page = this.page){ 
            let _this = this,
                url = `${BASE_PATH}movice/list/${page}`
            if(!_this.loadMore){
                return 
            }
            _this.loading = true
            wx.request({
                url,
                method: 'GET',  
                header: { 'content-type': 'json' }, 
                success: function (res) { 
                    let data = res.data.data || []; 
                    if(res.data.end){
                        _this.loadMore = false 
                    }
                    _this.list = _this.list.concat(data)
                    _this.page += 1 
                },
                fail: function (err) { 
                    Toast.fail(err); 
                },
                complete: function(){
                    _this.loading = false
                }
            }) 
        }
    },
}
</script>

<style lang="scss">
    .movice-list{  
        padding-top: 23px; 
        padding-left: 7px; 
        .movice-item{
            display: inline-block;
            margin:13px 0 0 23px;
        }
    }
</style>





