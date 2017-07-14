/*
* 公共功能js
* 功能1. 判断用户是否登录
* 功能2. 从cookie获取用户的资料,并展示
* 功能3. 导航栏交互(展开与收起)
* 功能4. 退出登录
* 功能5. 让页面打开时有进度条,让每个ajax发送请求有进度条
*
* */
define(['jquery','nprogress','cookie'], function ($,NProgress) {
    //进度条开始
    NProgress.start();
    //功能1. 判断用户是否登录
    isSignIn();
    //功能2. 从cookie获取用户的资料,并展示
    getInfo();
    //功能3. 导航栏交互(展开与收起)
    navToggle();
    //功能4. 退出登录
    signOut();
    //功能5. 让页面打开时有进度条,让每个ajax发送请求有进度条
    globalAjaxEvent();

    /*===============功能1. 判断用户是否登录===============*/
    function isSignIn(){
        var sessionID= $.cookie('PHPSESSID');
        //console.log(sessionID);
        if(!sessionID){
            //若sessionID不存在说明,用户没有登录 跳登录界面
            window.location.href='/bxg/views/index/login.html';
        }
    }

    /*===============功能2. 从cookie获取用户的资料,并展示===========*/
    function getInfo(){
        var userInfo=JSON.parse($.cookie('userinfo'));
        //console.log(userInfo);
        //头像
        $('.profile img').attr('src',userInfo.tc_avatar);
        //用户名
        $('.profile h4').text(userInfo.tc_name);
    }

    /*===============功能3. 导航栏交互(展开与收起)=================*/
    function navToggle(){
        $('.navs li a').on('click', function () {
            $(this).next().slideToggle();
        })
    }

    /*===============功能4. 退出登录======================*/
    function signOut(){
        $('.fa-sign-out').closest('a').on('click',clickHandler);
        function clickHandler(){
            var options={
                url:'/api/logout',
                type:'post',
                success: function (info) {
                    //console.log(info);
                    if(info.code==200){
                        window.location.href='/bxg/views/index/login.html';
                    }
                }
            };
            $.ajax(options);
        }
    }

    /*===============功能5. 让页面打开时有进度条,让每个ajax发送请求有进度条========*/
    function globalAjaxEvent(){
        $(document).ajaxStart(function(){
            NProgress.start();
        });
        $(document).ajaxStop(function(){
            NProgress.done();
        });

    }
    //页面加载完成  进度条结束
    $(function () {
        NProgress.done();
    })
})
