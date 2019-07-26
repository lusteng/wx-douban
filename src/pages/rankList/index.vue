<template> 
    <div>
        <div class="rl-banner">
            <div class="mask"></div>
            <h3>{{title}}</h3>
        </div> 
        <LoadingComponent 
            :show="loading"
        /> 
        <div class="rank-list">
            <div 
                v-show="!loading"
                v-for="(item, index) in list"
                :key="index"
                class="rl-item"
            >
                <div :class="{'rl-item-tag': true, ['rl-item-tag' + index + 1]: true}">
                    <span>NO.{{index + 1}}</span>
                </div>
                <div class="rl-item-cnt">
                    <div class="rl-item-l" @tap="handleSkipDetail">
                        <div class="pic">
                            <img :src="item.pic" />
                        </div>
                        <div class="info">
                            <p class="til">{{item.title}}</p>
                            <div class="rate"> 
                                <div class="rate-s">
                                    <div style="display: inline-block">   
                                        <van-rate
                                            allow-half
                                            :size="10"
                                            :value="item.core"
                                            disabled
                                            disabled-color="#ffd21e"
                                            custom-class="ml-star"
                                        /> 
                                    </div>
                                    <span class="core">{{item.core}}</span>
                                </div> 
                            </div>
                            <p class="intro">{{item.info}}</p>
                        </div>
                    </div>
                    <div class="rl-item-r">
                        <div style="width: 100%">
                            <van-icon 
                                name="star-o" 
                            />
                            <p>看过</p>
                        </div>
                    </div>
                </div>
                <p class="rl-item-comment">{{item.comment}}</p>
            </div> 
        </div>
    </div>
</template>

<script>
    import LoadingComponent from '@/components/LoadingComponent'
    import { BASE_PATH } from '@/utils/index'  
    export default {
        name: "rankList",   
        components: { 
            LoadingComponent
        },
        data(){
            return { 
                list: [],
                title: "",
                loading: false,
            }
        },
        mounted() {
            const url = `${BASE_PATH}movice/rank/list`
            let 
                _this = this,
                title = _this.$root.$mp.query.title; 
            _this.title = title    
            wx.setNavigationBarTitle({
                title: title
            })

            _this.loading = true
            wx.request({
                url,
                method: 'GET',  
                header: { 'content-type': 'json' }, 
                success: function (res) { 
                    _this.list = res.data.data;
                },
                fail: function (err) { 
                    Toast.fail(err); 
                },
                complete: function(){
                    _this.loading = false
                }
            })  
        }, 
        onunload() {
            this.list = []
        },
        methods: {
            handleSkipDetail(){
                wx.navigateTo({ url: `/pages/moviceDetail/main`})
            }, 
        } 
    }
</script>

<style lang="scss">
    $banner_height: 186px;
    .rank-list{
        background: #ededed;
    }
    .rl-banner{
        height: 186px;
        background-image: url('https://img1.doubanio.com/view/photo/photo/public/p2553960248.jpg');
        background-size: cover;
        position: relative;
        .mask{
            @include mask;
        }
        h3{ 
            @include flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            position: relative;
            z-index:2;
            font-size: 24px;
            color: $white_color;
        }
    } 
    .rl-item{
        padding: 0 15px 20px;
        margin-bottom: 12px;
        background: #fff;
        .rl-item-tag{
            display: inline-block;
            margin: 10px 0; 
            @include tag; 
        } 
        &:nth-child(2) .rl-item-tag{
            background: #e9717b 
        }
        &:nth-child(3) .rl-item-tag{
            background: #f58b60
        }
        .rl-item-cnt{ 
            @include flex;
            margin-bottom: 13px;
            .rl-item-l{
                @include flex; 
                flex: 1; 
                padding-right: 15px;
                .pic{
                    width: 80px;
                    height: 114px;
                    margin-right: 15px;
                }
                .info{
                    flex: 1;
                    .til{
                        line-height: 25px;
                        font-size: 15px;
                    }
                    .rate-s{ 
                        padding: 8px 0;
                        .core{
                            display: inline-block;
                            vertical-align: middle;
                            color:#909090; 
                        }
                    } 
                    .intro{
                        color: #b3b3b3;
                        line-height: 22px;
                    }
                }
            }
            .rl-item-r{
                @include flex;
                align-items: center;
                justify-content: center;
                width: 66px;
                border-left: 1px dashed #e9e9e9;
                text-align: center;
                color: $active_color;  
                .star{
                    margin-bottom: 10px; 
                } 
            }
        }
        .rl-item-comment{
            color:#9c9c9c;
            height: 38px;
            line-height: 38px;
            border-radius: 3px;
            background: #f8f8f8;
            padding-left: 10px;
        }
    }
</style>





