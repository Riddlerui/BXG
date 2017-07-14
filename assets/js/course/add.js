/*
 * 课程添加页面
 * <!-- 2. 在模板中实现功能-->
 <!-- 2.1 用表单验证对表单内容进行验证，rules, messages, submitHandler-->
 <!-- 2.3 在submitHandler方法中写获取表单数据及发请求的代码-->
 <!-- 2.3.1 实现2.3功能方式: 原生js, jquery(serialize), 表单提交插件-->
 <!-- 2.4 请求成功之后跳转到一个新的页面-->
 * */
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'],function(){
    require(['jquery','validate','form'], function ($) {
        $('form').validate({
            submitHandler:function(){
                var options={
                    url:'/api/course/create',
                    type:'post',
                    success:function(info){
                        if(info.code===200){
                            window.location.href='/bxg/views/course/step1.html?cs_id='+info.result.cs_id;
                        }
                    }
                };
                $('form').ajaxSubmit(options);
            },
            rules:{
                tc_name:{
                    required:true,
                    rangelength:[2,10]
                }
            },
            messages:{
                required:'课程名不能为空!',
                rangelength:'课程名长度为2-10个字符!'
            }

        })
    })
})