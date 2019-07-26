<template> 
    <div 
        class="b-rank"  
        @tap="handleSkip"
    >
        <div class="b-rank-pt" :style="{'background-image': 'url('+ data.bg_pic +')'}">
            <div class="mask"></div>
            <div class="cnt">
                <p class="p1">评分最高</p>
                <p class="title">{{data.catetry}}</p>
                <p class="year" v-if="data.catetry">2018</p>
            </div>
        </div>
        <div class="b-rank-w">   
            <ul class="b-rank-list">    
                <li
                    v-for="(l, idx) in data.list"
                    :key="idx"
                >       
                    <span>{{idx + 1}}. {{l.title}}</span>
                    <em>{{l.core}}分</em>   
                </li>
            </ul>  
        </div>
    </div> 
</template>
<script>
export default {
    name: "SmallRankCard",
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
    } 
}
</script>

<style lang="scss">
    $pt_size: 100px;
    .b-rank{  
        @include flex;
        margin-top: 12px;
        .b-rank-pt{
            width: $pt_size;
            height: $pt_size - 23px; 
            padding-top: 23px;
            position: relative; 
            background-size: 100%; 
            .cnt{
                text-align: center;
                position: relative;
                z-index:2;
                .p1{
                    color: #c5cace;
                    line-height: 15px;
                    font-size: 10px;
                }
                .title{
                    color: #fff; 
                    line-height: 24px;
                    font-size: 16px;
                }
                .year{
                    color: #9ea3a4;
                    line-height: 35px;
                    font-size: 18px;
                }
            }
        }      
        .b-rank-w{ 
            flex: 1;
            @include flex;
            align-content: center;
            padding: 6px 0;
        }
        .b-rank-list{
            width: 100%;
            border: 1px solid #f3f3f3;
            border-left: none;
            border-radius: 0 3px 3px 0;
            padding: 8px 19px 7px;
            li{
                line-height: 22px;
                color: #282828;
                span, em{
                    display: inline-block;
                } 
                em{
                    margin-left: 6px;
                    font-size: 10px;
                    color: #f9d48e;
                }
            } 

        }
    }
</style>
