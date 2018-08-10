<template>
  <div>
    <div class="form-horizontal">
      <div class="form-group">
        <label for="" class="col-sm-2 control-label">协议标识</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="请输入协议标识" v-model="protocol_tags">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">协议类型</label>
        <div class="col-sm-10">
          <select class="form-control" v-model="protocol_type" v-on:change="protocol_type_change">
            <option value="Boolean">Boolean</option>
            <option value="String">String</option>
            <option value="Enum">Enum</option>
            <option value="Int">Int</option>
          </select>
        </div>
      </div>
      <!--根据协议类型展示不同数据类型-->
      <!--Boolean-->
      <div class="form-group" v-if="protocol_type=='Boolean'">
        <label class="col-sm-2 control-label"></label>
        <div class="col-sm-10">
          <p>
            * Boolean： true、false
          </p>
        </div>
      </div>
      <!--String-->
      <div class="form-group" v-if="protocol_type=='String'">
        <label class="col-sm-2 control-label"></label>
        <div class="col-sm-10">
          <p>
            * String： 最长不能超过N个字符
          </p>
        </div>
      </div>
      <!--Enum-->
      <div class="form-group" v-if="protocol_type=='Enum'">
        <label class="col-sm-2 control-label"></label>
        <div class="col-sm-10">
          <div>
            *Enum：
            <el-tag
                    :key="tag"
                    v-for="tag in enum_tags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 输入枚举值</el-button>

          </div>
        </div>
      </div>
      <!--Int-->
      <div class="form-group" v-if="protocol_type=='Int'">
        <label class="col-sm-2 control-label"></label>
        <div class="col-sm-10">
          <div>
            * Int
            <div class="form-inline">
              <div class="form-group">
                <label>Max</label>&nbsp;&nbsp;
                <input type="text" class="form-control" v-model="int.max">
              </div>
              <div class="form-group">
                <label>Min</label>&nbsp;&nbsp;
                <input type="text" class="form-control" v-model="int.min">
              </div>
              <div class="form-group">
                <label>Step</label>&nbsp;&nbsp;
                <input type="text" class="form-control" v-model="int.step">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Multi-->
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-default" v-on:click="addMulti">+</button>
        <button type="button" class="btn btn-default"  v-on:click="removeMulti">-</button>
      </div>
      <div v-for="(item,index) in multi">
        <div style="width:95%;float:right;">
          <multi v-bind:multidata="item" v-bind:index="index" v-on:remove="removeHandle" v-on:muti_data_change="muti_data_change"></multi>
          <hr>
        </div>
        <div style="clear:both;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Multi from './Multi.vue';
export default {
  name: 'multi',
  props: {
    multidata:{
      type:Object,
      default:{}
    },
    index:{
      type:Number
    }
  },
  created(){
    console.log('初始化加载')
  },
  watch:{
    protocol_type(){
      this.event_send();
    },
    protocol_tags(){
      this.event_send();
    },
    int(){
      this.event_send();
    },
    enum_tags(){
      this.event_send();
    }
  },
  data(){
    return {
      protocol_type: this.multidata.protocol_type,
      protocol_tags:this.multidata.protocol_tags,
      int:this.multidata.int,
      enum_tags:this.multidata.enum_tags,
      multi:this.multidata.multi,
      inputVisible: false,
      inputValue: ''
    }
  },
  components: {
    'multi':Multi
  },
  methods:{
    event_send(){
      this.$emit('muti_data_change',{
        protocol_type:this.protocol_type,
        protocol_tags:this.protocol_tags,
        int:this.int,
        enum_tags:this.enum_tags,
        multi:this.multi
      },this.index)
    },
    muti_data_change(data,index){
      this.multi[index]=data;
    },
    removeHandle(index){
      this.multi.splice(index,1);
    },
    removeMulti(){
      this.$emit('remove',this.index)
    },
    //增加层级
    addMulti(){
      this.multi.push({
        protocol_type: 'Boolean',
        protocol_tags:'',
        int:{
          max:'',
          min:'',
          step:''
        },
        enum_tags:[],
        multi:[

        ]
      });
    },
    protocol_type_change(){
      this.int={};
      this.enum_tags=[];
      this.multi=[];
    },
    //enum
    handleClose(tag) {
      this.enum_tags.splice(this.enum_tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.enum_tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
