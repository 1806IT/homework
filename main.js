Vue.component('overall-situation',{
    template:"<div>这是全局组件</div>"
})
 
var test2=new Vue({
    el:'#test2',
    data:{
        isoverallSituation:true,
        
    },
    components:{
        'topo-situation':{
            template:'<div :class="{topoSituation:istoposituation}">这是局部组件</div>',
            data:function(){
                return{
                    istoposituation: true
                }
            }
        }
    },
    computed:{
        overallsituation:function(){
            return {
                overallsituation: this.isoverallSituation
            }
        }
    }
})
var test3=new Vue({
    el:'#test3',
    data:{
        bus:new Vue(),
        parent: '你好，子组件，我是父组件送来的内容',
    },
    components:{
        'parent-to-children':{
            props: ['msg'],
            template: '<div>{{msg}}</div>'
        },
        'child':{
            props:['fromparent'],
            template:'<div>{{fromparent}}</div>'
        }
    }
})
var test4=new Vue({
    el:'#test4',
    data:{
        money:1000
    },
    components:{
        'child-to-parent':{
            template:'<div>'+
            '<button @click="increase">+1--{{this.count}}</button>'+
            '<button @click="reduce">-1---{{this.count}}</button>'+
            '</div>',
            data:function(){
                return{count:1000}
            },
            methods:{
                increase:function(){
                    this.count++
                    this.$emit('input',this.count)
                    console.log(this.count)
                    // return this.count
                },
                reduce:function(){
                    this.count--
                    this.$emit('input',this.count)
                    console.log(this.count)
                }
            }
        }
    },       
    methods:{
        function(val){
            this.money=val
        }
    }
})
var test5=new Vue({
    el:'#test5',
    data:{
        total:2000
    },
    components:{
        'child':{
            template:'<div>'+
            '<button @click="increase">+20</button>'+
            '<button @click="reduce">-20</button>' +
            '</div>',
            data:function(){
                return {count:2000}
            },
            methods:{
                increase:function(){
                    this.count=this.count+20
                    this.$emit('change',this.count)
                },
                reduce:function(){
                    this.count=this.count-20
                    this.$emit('change',this.count)
                }
            }
        }
    },
    methods:{
        handleTotal:function(total){
            this.total=total
        }
    }
})
var test6=new Vue({
    el:'#test6',
    data:{
        bus:new Vue(),
        isgreen:true
    },
    components:{
        'achild':{
            template:'<div :class={red:isred}>'+
            '<button @click="handle">点击向b传数据'+'</button>'+'{{this.dataA}}'+
            '</div>',
            data:function(){
                return {
                    isred:true,
                    dataA:'我是A组件的数据，你应该可以在B组件看到我'
                }
            },
            methods:{
                handle:function(){
                    this.$root.bus.$emit('iama',this.dataA)
                }
            }
        },
        'bchild':{
            template: '<div>{{this.dataB}}</div>',
            created: function () {
                this.$root.bus.$on('iama',function(value){
                    this.dataB=value
                    console.log(this.dataB)                  
                })
            },
            data: function(){
                return {
                    dataB:'我是B数组的数据'
                }
            }         
        },
    }
})