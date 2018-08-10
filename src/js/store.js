/**
 * Created by ollie on 2018/8/10.
 */
var obj={
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
        enum_tags:['1','2','3'],
        multi:[
            {
                protocol_type: 'Boolean',
                protocol_tags:'',
                int:{
                    max:'',
                    min:'',
                    step:''
                },
                enum_tags:[],
                multi:[
                    {
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
                    }
                ]
            }
        ]
    }
}