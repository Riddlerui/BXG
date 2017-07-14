/*
*
* */
require(['/bxg/assets/js/config.js'], function () {
    require(['jquery',
        '/bxg/assets/js/getarg.js',
        'validate',
        'datepicker',
        'form',
        'zh',
        '/bxg/assets/js/common.js'], function ($,obj) {
        console.log(obj);
        /*发送请求并获取数据呈现*/
        var options={
            url:'/api/teacher/edit',
            type:'get',
            data:{
                tc_id:obj.tc_id
            },
            success:function(info){
                if(info.code===200){
                    var $tcName=$('input[name="tc_name"]');
                    var $tcJoinDate=$('input[name="tc_join_date"]');
                    var $tcType=$('input[name="tc_type"]');
                    var $tcGender=$('input[name="tc_gender"]');
                    var data=info.result;
                    $tcName.val(data.tc_name);
                    $tcJoinDate.val(data.tc_join_date);
                    var num=data.tc_type==0?1:0;
                    $($tcType.find('option')[num]).attr(data.tc_type);

                    var k=data.tc_gender;
                    $($tcGender[k]).attr('checked',true);
                }
            }
        }
        $.ajax(options);

        /*日期插件*/
        $('input[name="tc_join_date"]').datepicker({
            language:'zh-CN',
            format:'yyyy/mm/dd',
            todayHightlight:true
        })
        /*表单验证*/
        $('form').validate({
            submitHandler:function(){
                $('form').ajaxSubmit({
                    url:'/api/teacher/update',
                    type:'post',
                    data:{
                        tc_id:obj.tc_id
                    },
                    success:function(info){
                        if(info.code===200){
                            //alert('修改成功!');
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
                tc_join_date:{
                    required:'日期不能为空!',
                    date:'格式不对!'
                }
            }

        })
    })
})