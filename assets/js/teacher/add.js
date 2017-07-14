/*
 * 添加讲师页面
 * */
require(['/bxg/assets/js/config.js'],function(){
    require(['jquery',
        'datepicker',
        'validate',
        'form',
        'zh',
        '/bxg/assets/js/common.js'], function ($) {

        /*日期插件初始化*/
        $('input[name="tc_join_date"]').datepicker({
            language:'zh-CN',
            format:'yyyy/mm/dd',
            todayHighlight:true
        })

        /*表单控制插件*/
        $('form').validate({
            submitHandler:function(){
                $('form').ajaxSubmit({
                    url:'/api/teacher/add',
                    type:'post',
                    success:function(info){
                        if(info.code===200){
                            //alert('添加成功!');
                            window.location.href='/bxg/views/teacher/list.html';
                        }
                    }
                })

            },
            rules:{
                tc_name:{
                    required:true,
                    rangelength:[2,10]
                },
                tc_pass:{
                    required:true
                },
                tc_join_date:{
                    required:true,
                    date:true
                }
            },
            messages:{
                tc_name:{
                    required:'姓名不能为空!',
                    rangelength:'长度为2-10个字符!'
                },
                tc_pass:{
                    required:'密码不能为空!'
                },
                tc_join_date:{
                    required:'日期不能为空!',
                    date:'格式不对!'
                }
            }
        })
    })
})