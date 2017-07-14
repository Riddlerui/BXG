/**
 * 功能
 * 1. 给按钮注册点击事件
 * 2. 在点击事件触发时获取用户名和密码的值
 * 3. 表单验证,判断用户名和密码是否为空,如果为空不允许发送请求
 * 4. 使用jQuery发ajax请求,并把数据发给服务器
 */
require(['/bxg/assets/js/config.js'],function(){
    require(['jquery','cookie'],function($){
        // 注册点击事件
        var $btn=$('#submit');
        $btn.on('click',clickHanadler);
        function clickHanadler(e){
            e.preventDefault();
            // 获取用户名和密码值
            var uName=$('#name').val();
            var pwd=$('#pass').val();
            // 表单验证
            if(!uName.trim()||!pwd.trim()){
                return;
            }
            // 发送ajax请求
            var options={
                url:'/api/login',
                type:'post',
                data:{
                    tc_name:uName,
                    tc_pass:pwd
                },
                success:function(info){
                    //console.log(info);
                    if(info.code===200){
                        //将返回的信息存入到cookie中,并保留7天
                        $.cookie('userinfo',JSON.stringify(info.result),{expeires:7,path:'/'});
                        window.location.href='/bxg/views/index/dashboard.html';
                    }
                }
            };
            $.ajax(options);
        }
    })
})


