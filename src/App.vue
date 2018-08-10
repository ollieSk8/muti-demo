<template>
    <div id="app">
        <form class="form-horizontal">
            <!--功能名称-->
            <div class="form-group">
                <label for="fun_name" class="col-sm-2 control-label">功能名称</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="fun_name" v-model="data.fun_name">
                </div>
            </div>
            <!--协议标识-->
            <div class="form-group">
                <label for="protocol_flag" class="col-sm-2 control-label">协议标识</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="protocol_flag" v-model="data.protocol_flag">
                </div>
            </div>
            <!--协议类型-->
            <div class="form-group">
                <label class="col-sm-2 control-label">协议类型</label>
                <div class="col-sm-10">
                    <select class="form-control" v-model="data.protocol_type" v-on:change="protocol_type_change">
                        <option value="Boolean">Boolean</option>
                        <option value="String">String</option>
                        <option value="Enum">Enum</option>
                        <option value="Int">Int</option>
                        <option value="Multi">Multi</option>
                    </select>
                </div>
            </div>
            <!--数据传输类型-->
            <div class="form-group">
                <label class="col-sm-2 control-label">数据传输类型</label>
                <div class="col-sm-10">
                    <div class="radio">
                        <label>
                            <input type="radio" checked value="up_down" v-model="data.data_transport_type">
                            可下发可上报
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" value="up" v-model="data.data_transport_type">
                            只上报
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" value="down" v-model="data.data_transport_type">
                            只下发
                        </label>
                    </div>
                </div>
            </div>
            <!--功能描述-->
            <div class="form-group">
                <label class="col-sm-2 control-label">功能描述</label>
                <div class="col-sm-10">
                    <textarea class="form-control" rows="3" v-model="data.func_desc"></textarea>
                </div>
            </div>
            <!--根据协议类型展示不同数据类型-->
            <!--Boolean-->
            <div class="form-group" v-if="data.protocol_type=='Boolean'">
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-10">
                    <p>
                        * Boolean： true、false
                    </p>
                </div>
            </div>
            <!--String-->
            <div class="form-group" v-if="data.protocol_type=='String'">
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-10">
                    <p>
                        * String： 最长不能超过N个字符
                    </p>
                </div>
            </div>
            <!--Enum-->
            <div class="form-group" v-if="data.protocol_type=='Enum'">
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-10">
                    <div>
                        *Enum：
                        <el-tag
                                :key="tag"
                                v-for="tag in data.enum_tags"
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
            <div class="form-group" v-if="data.protocol_type=='Int'">
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-10">
                    <div>
                        * Int
                        <div class="form-inline">
                            <div class="form-group">
                                <label>Max</label>&nbsp;&nbsp;
                                <input type="text" class="form-control" v-model="data.int.max">
                            </div>
                            <div class="form-group">
                                <label>Min</label>&nbsp;&nbsp;
                                <input type="text" class="form-control" v-model="data.int.min">
                            </div>
                            <div class="form-group">
                                <label>Step</label>&nbsp;&nbsp;
                                <input type="text" class="form-control" v-model="data.int.step">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Multi-->
            <div class="form-group" v-if="data.protocol_type=='Multi'">
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-10">
                    <button type="button" class="btn btn-success" v-on:click="addMulti">+</button>
                    <div v-for="(item,index) in data.multi">
                        <multi v-bind:multidata="item" v-bind:index="index" v-on:remove="removeHandle" v-on:muti_data_change="muti_data_change"></multi>
                        <hr>
                    </div>
                </div>
            </div>
        </form>
        <button type="button" class="btn btn-default" v-on:click="showDate">展示数据</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    import 'bootstrap3/dist/css/bootstrap.min.css';
    import Multi from './components/Multi.vue';
    Vue.use(ElementUI);
    export default {
        name: 'app',
        data(){
            return {
                data: {
                    fun_name: '',
                    protocol_flag: '',
                    protocol_type: 'Boolean',
                    data_transport_type: 'up_down',//up_down ,up,down
                    func_desc: '',
                    int:{
                        max:'',
                        min:'',
                        step:''
                    },
                    enum_tags:[],
                    multi:[]
                },
                inputVisible: false,
                inputValue: ''
            }
        },
        methods: {
            showDate(){
                console.dir(JSON.parse(JSON.stringify(this.data)));
            },
            muti_data_change(data,index){
                this.data.multi[index]=data;
            },
            removeHandle(index){
                this.data.multi.splice(index,1);
            },
            protocol_type_change(){
                this.data.int={}
                this.data.enum_tags=[];
                this.data.multi=[];
            },
            //增加层级
            addMulti(){
                this.data.multi.push({
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
            //enum
            handleClose(tag) {
                this.data.enum_tags.splice(this.data.enum_tags.indexOf(tag), 1);
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
                    this.data.enum_tags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //Multi
        },
        components: {
            'multi':Multi
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    #app {
        width: 800px;
        margin: 0 auto;
        padding-top: 20px;
    }

    .form-horizontal .form-group {
        margin-right: 5px;
        margin-left: 5px;
        margin-bottom: 10px;
    }
    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
</style>
