<template>
    <div class="rowdiv">
      <span>{{ title }}：</span>
      <ul @click="fn">
        <li :class="{active:value === '全部'}">全部</li>
        <li v-for="e of list" :key="e" :class="{active:e===value}">{{ e }}</li>
      </ul>
    </div>
</template>

<script>
    export default {
        name:'Listfilter',
        props:[
            //标题文件
            'title',
            //列表
            'list',
            //当前选中
            'value',
            //返回的键名（多个的时候用）
            'name'
        ],
        methods:{
            //列表的点击事件
            fn({target}){
                if (target.tagName !== "LI") return
                //传回点击的项
                this.$emit('clickfn',{
                    name:this.name,
                    value:target.textContent
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.rowdiv {
  display: flex;
  font-size: 0.8em;
  margin-bottom: 10px;
  span {
    text-wrap: nowrap;
    color: rgb(148, 148, 148);
  }
  ul {
    text-wrap: nowrap;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    li {
      text-wrap: nowrap;
      cursor: pointer;
      padding: 0 8px 8px 0;
    }
  }
  .active {
    color: #00aeec !important;
  }
}
</style>