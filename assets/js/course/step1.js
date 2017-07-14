/*
* 功能:
* 1. 获取地址栏的参数
* 2. 根据获取的cs_id发请求获取课程信息
* 3. 把获取到的数据展示出来
* 4. 进行表单验证
* 5. 二级联动
* 6. 点击保存按钮,把数据发给服务器
* 7. 如果请求成功,跳转到下一个页面
*
* */
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'], function () {
    require(['jquery','/bxg/assets/js/getarg.js','template','validate','form'], function ($,obj,template) {
        getCourseInfo()
        /*============获取课程信息 并展示数据=============*/
        function getCourseInfo(){
            var options={
                url:'/api/course/basic',
                type:'get',
                data:{
                    cs_id:obj.cs_id
                },
                success:function(info){
                    if(info.code===200){
                        var html=template('tmp',{list:info.result});
                        $('.content').html(html);

                        /*注册一级分类的change事件*/
                        $('#top').on('change', function () {
                            var cgID=$(this).val();
                            var options={
                                url:'/api/category/child',
                                type:'get',
                                data:{
                                    cg_id:cgID
                                },
                                success:function(info){
                                    if(info.code===200){
                                        var str='';
                                        info.result.forEach(function(v){
                                            str+='<option value="'+v.cg_id+'">'+v.cg_name+'</option>'
                                        })
                                        $('#childs').html(str);
                                    }
                                }
                            };
                            $.ajax(options);
                        })
                        validateInit();
                    }
                }
            };
            $.ajax(options);
        }
        /*===============表单验证=============*/
        function validateInit(){
            $('form').validate({
                submitHandler:function(){
                    var options={
                        url:'/api/course/update/basic',
                        type:'post',
                        data:{
                            cs_id:obj.cs_id
                        },
                        success:function(info){
                            if(info.code===200){
                                window.location.href='/bxg/views/course/step2.html?cs_id='+info.result.cs_id;
                            }
                        }
                    }
                    $('form').ajaxSubmit(options);
                },
                rules:{
                    cs_name:{
                        required:true,
                        rangelength:[2,8]
                    },
                    cs_tags:{
                        required:true,
                        rangelength:[8,50]
                    }
                },
                messages:{
                    cs_name:{
                        required:'课程名不能为空哦!',
                        rangelength:'长度为2-8个字符'
                    },
                    cs_tags:{
                        required:'标签不能为空!',
                        rangelength:'多写一点介绍吧'
                    }
                }
            })
        }
    })
})