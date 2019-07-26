<template>
  <div class="cell">
    <div class="cell-hd">
      <div class="cell-title">
        {{title}}
        <span href="javascript:;" @tap="handleSkipMore" class="fr lookMore">查看更多 &gt;</span>
      </div>
    </div>
    <div class="cell-cnt">
      <div> 
        <scroll-view 
          class="scroll-movice" 
          :scroll-x="true"
        >
            <div 
              class="scroll-movice-item"
              v-for="(item, index) in data" 
              :key="index"
            >
              <MoviceLabel 
                :pic="item.cover.url"
                :title="item.title"
                :rate="(item.rating.value / 2).toFixed(1)"
              />  
            </div>
        </scroll-view>
      </div>  
    </div>  
  </div>
</template>

<script>
import MoviceLabel from '@/components/MoviceLabel'
import { HOME_NAMES } from '@/utils/index' 

export default {
  components: {
    MoviceLabel,
  },
  props: {
    title: String,
    link: String,
    type: [String,Number],
    data: {
      type: Array,
      default(){
        return []
      }
    },
  },  
  methods: {
    handleSkipMore(){ 
      let _this = this,
          type = _this.type
        wx.navigateTo({ url: `/pages/moviceList/main?type=${type}`})
    }
  },
}
</script>

<style lang="scss">
.cell{ 
  padding-left: 15px;
  margin-bottom: 10px;
  .cell-label{
    width: 360px;
  }
  .cell-title{
    font-size: 14px;
    color: #000;
    font-weight: bold;
    line-height: 50px;
    padding-right: 15px; 
    .lookMore{ 
      color: $db_theme; 
    }
  }
  .scroll-movice{ 
    width: 100%;
    white-space: nowrap; 
    .scroll-movice-item{
      display:  inline-block; 
    }
  }
}
</style>
