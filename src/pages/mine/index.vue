<template>
    <div>  
        <div 
            class="login-wrap"
            v-if="!userInfo.avatarUrl"
        >
            <van-button 
                type="primary" 
                open-type="getUserInfo" 
                size="small"
                @getuserinfo="bindGetUserInfo"  
                @tap="handleLogin"
            >获取昵称</van-button>
        </div>
        <div class="userinfo">
            <img class="userinfo-avatar" :src="userInfo.avatarUrl" />
            <p class="userinfo-nickname">{{userInfo.nickName}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mine",
        data(){
            return {
                userInfo: {}
            }
        },
        methods: {
            handleLogin(){  
            },
            bindGetUserInfo(e){
                console.log(e); 
                if(e.mp.detail.userInfo){
                    console.log(e.mp.detail.userInfo);
                    this.globalData.userInfo = this.userInfo = e.mp.detail.userInfo 
                }else{
                    wx.authorize({
                      scope: 'scope.userInfo',
                    });
                }
                
            }
        },  
    }
</script>

<style lang="scss">
    .login-wrap,
    .userinfo{
        @include flex;
        padding-top: 50px; 
        align-items: center;
    }
    .login-wrap{
        justify-content:center;
    }
    .userinfo{ 
        flex-direction: column;
    }
    
    .userinfo-avatar {
        width: 128rpx;
        height: 128rpx;
        margin: 20rpx;
        border-radius: 50%;
    }

    .userinfo-nickname {
        color: #aaa;
    }
</style>





