<template>
    <div>
        <LoadingComponent 
            :show="loading"
        /> 
        <div class="movice-detail" v-show="!loading">
            <div class="movice-detail-hd">
                <div class="picWrap">
                    <img 
                        v-show="topic.pic"
                        :src="topic.pic"
                    />
                </div>
                <div class="info">
                    <p class="title">{{topic.title || ""}}<em>({{topic.time || ""}})</em></p>
                    <p class="desc">{{topic.desc}}</p> 
                    <p class="want">
                        <span 
                            class="btn"   
                        >
                            <van-icon 
                                name="like-o" 
                                size="16px"
                                custom-class="b-icon"
                            />
                            想看
                        </span>
                        <span class="btn">
                            <van-icon 
                                name="star-o"
                                size="16px"
                                custom-class="b-icon"
                            />
                            看过
                        </span>
                    </p>
                </div>
            </div>
            <div class="movice-detail-rate">
                <h3>豆瓣评分<sub>TM</sub></h3>
                <div class="core">
                    <div class="core-lf">
                        <div class="core-box">
                            <p class="core-total">{{rank.count || '0'}}</p>
                            <van-rate
                                allow-half
                                :size="12"
                                disabled
                                disabled-color="#b9b9b9" 
                                custom-class="ml-star"
                                :value="rank.count"
                                void-icon="star"
                            />
                        </div>
                    </div>
                    <div class="core-rt">
                        <GradeStar 
                            v-for="(item, index) in rank.star"
                            :key="index"
                            :count="5 - index"
                            :score="item"
                        />
                        <p class="preson">{{rank.preson}}人评分</p>
                    </div>
                </div>
            </div>
            <div class="movice-detail-intro">
                <h3 class="movice-detail-h">简介</h3>
                <p>{{intro}}</p>
            </div>
            <div class="movice-detail-actors">
                <h3 class="movice-detail-h">影人</h3>
                <div 
                    v-if="actors.length === 0" 
                    class="actor-box actor-box-load"
                >
                    <div class="pic"></div>
                    <div class="pic"></div>
                    <div class="pic"></div>
                </div>
                <scroll-view 
                    v-else
                    class="actor-box" 
                    :scroll-x="true"
                    >
                        <div 
                            class="actor-card"
                            v-for="(item, index) in actors"
                            :key="index"
                        >
                            <div class="pic">
                                <img :src="item.pic" />
                            </div>
                            <p class="text-overflow actor-name">{{item.name}}</p>
                            <p class="actor-role">{{item.role}}</p>
                        </div>   
                </scroll-view>
            </div>
        </div>
    </div>
</template>

<script> 
import GradeStar from '@/components/GradeStar'
import { BASE_PATH, HOME_NAMES } from '@/utils/index'  
import LoadingComponent from '@/components/LoadingComponent'
export default {
    name: "moviceDetail",
    components: {
        GradeStar, 
        LoadingComponent,
    }, 
    data(){
        return { 
            topic: {
                pic: "",
            },
            rank: {
                count: 0
            },
            intro: "",
            actors: [],
            loading: false,
        }
    },  
    mounted() {
        const url = `${BASE_PATH}movice/detail` 
        let _this = this; 
        _this.loading = true
        wx.request({
            url,
            method: 'GET',  
            header: { 'content-type': 'json' }, 
            success: function (res) { 
                let data = res.data.data; 
                _this.topic = data.topic 
                _this.rank = data.rank 
                _this.intro = data.intro 
                _this.actors = data.actors
                wx.setNavigationBarTitle({
                    title: data.topic.title
                })   
            },
            fail: function (err) { 
                Toast.fail(err); 
            },
            complete: function(){
                _this.loading = false
            }
        }) 
    }
}
</script>

<style lang="scss">
    $space : 15px; 
    $img_width: 80px;
    $img_height: 112px;
    $img_space: 15px;
    .movice-detail{
        background: #f8f7f3;
        padding: 21px 0;
        .movice-detail-hd, .movice-detail-intro{
            padding: 0 $space; 
        }
        .movice-detail-hd{ 
            @include flex;
            .picWrap{
                width: 100px;
                height: 140px;
                margin-right: 14px; 
                img{ 
                    box-shadow: 0 0 4px 0 #f6f6f6; 
                    background: #ddd;
                }
            }
            .info{
                margin-top: -2px;
            }
            .title{
                font-size: 21px; 
                line-height: 1.1; 
                em{
                    font-size:19px;
                    display: inline;
                }
            }
            .desc{
                font-size: 12px;
                color: $font_gray;
                line-height: 1.1;
                padding: 12px 0 14px;
            }
            .want{
                span{
                    &:active, &:focus{
                        background:#f6eddf;
                    }
                    display: inline-block;
                    width: 106px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background: #fff;
                    box-shadow: 1px 1px 2px 0 #e6e5e3;
                    font-size: 14px; 
                    &:first-child{
                        margin-left:5px;
                        margin-right:10px;
                    }
                }
                .b-icon{
                    color: #e6ab4b;
                    margin-right: 5px;
                    vertical-align: text-top;
                }
            }
            
        }
        .movice-detail-rate{
            margin: 20px $space 29px; 
            background: #fff;
            border-radius: 3px;
            h3{
                line-height: 29px;
                height: 29px; 
                font-size: 12px;
                text-indent: 13px;
                font-weight: bold;
                sub{
                    display: inline;
                    vertical-align: super; 
                }
            }
            .core{ 
                @include flex;
                padding-top: 13px;
                padding-bottom: 17px;
                .core-lf{
                    text-align: right;
                    width: 150px;
                    .core-box{
                        display: inline-block;
                        width: 90px;
                        text-align: center;
                    }
                    .core-total{
                        font-size: 32px;
                    }
                }
                .core-rt{
                    text-align: left;
                    flex: 1;
                }
            }
            .ml-star{
                .van-rate__item{
                    padding: 0;
                }
            }
            .preson{
                text-align: right;
                color:$font_gray;
                font-size:12px;
                padding-right: 40px;
            }

        }
        .movice-detail-h{
            line-height: 40px;
            font-size: 16px; 
            font-weight: bold;
        }
        .movice-detail-intro{
            margin-bottom: 50px;
            p{ 
                font-size: 14px;
                line-height: 23px;
            }
        }
        .movice-detail-actors{
            padding-left: $space;
            .actor-box{
                width: 100%;
                white-space: nowrap;                 
            }
            .actor-card{
                display: inline-block;
                margin-right: $img_space;
            }
            .pic{
                width: $img_width;
                height: $img_height; 
                margin-bottom: 8px; 
            }
            .actor-name{
                line-height: 22px;
                font-size: 13px; 
            }
            .actor-role{
                font-size: 12px;
                color: $font_gray;
            }
        }
    }
</style>





