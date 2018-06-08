/**
 * Created by hotread on 2017/6/14.
 */

var vm=new Vue({
    el:"#app",
    data:{
        list:[
            {
                name:"洗车这几个地方则就白洗了"
            },{
                name:"洗车这几个地则就白洗了2"
            },{
                name:"洗车这几个地则就白洗了3"
            },{
                name:"洗车这几个地则就白洗了4"
            },{
                name:"洗车这几个地则就白洗了5"
            },{
                name:"洗车这几个地方则就白洗了"
            }
        ],
        comments:[{
            user:"张三",
            date:"2018-01-12",
            carType:"起亚 K3",
            desc:"经理态度一流，客服人员一流，推荐大家过来。",
            pics:["../assets/images/sf.jpg",
                "../assets/images/sf.jpg",
                "../assets/images/sf.jpg"
            ],
            address:"广州市长和广丰4S店"
        }]
    },
    methods:{}
})