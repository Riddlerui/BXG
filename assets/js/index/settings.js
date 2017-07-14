/*
 * 个人中心页面
 *
 * 功能1. 获取个人资料并展示
 * 功能2. 上传头像功能(插件或者原生js)
 * 功能3. 省市区联动功能
 * 功能4. 日期插件初始化
 * 功能5. 表单验证插件初始化
 * */
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'], function () {
    require(['jquery',
        'template',
        'webuploader',
        'form',
        'zh','validate','datepicker'], function ($,template,WebUploader) {
        getUserInfo();

        var tcID='',tcHomeTown='';
        /*=================功能1: 获取个人资料并展示===================*/
        function getUserInfo(){
            var options={
                url:'/api/teacher/profile',
                type:'get',
                success:function(info){
                    if(info.code===200){
                        var html=template('temp',{list:info.result});
                        $('.settings').html(html);
                        tcID=info.result.tc_id;
                        tcHomeTown=info.result.tc_hometown;
                        uploadAvatarPlugin();//头像上传
                        PCD();//省市区联动功能
                        datapickerInit();//日期插件
                        validateInit();//表单验证
                    }
                }
            };
            $.ajax(options);
        }

        /*=================功能2.上传头像功能(插件或者原生js)=================*/
        //原生版
        function uploadAvatarNative(){}
        //插件版
        function uploadAvatarPlugin(){
            var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,
                // swf文件路径
                // swf: BASE_URL + '/js/Uploader.swf',
                swf: '/node_modules/webuploader/dist/Uploader.swf',
                // 文件接收服务端。
                // server: 'http://webuploader.duapp.com/server/fileupload.php',
                // server: 'http://api.botue.com/uploader/avatar',
                server: '/api/uploader/avatar',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#filePicker',
                // pick: '#upload',
                fileVal: 'tc_avatar', // 参数名
                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png'
                    // mimeTypes: 'image/*'
                }
            })
            uploader.on('uploadSuccess', function (attr,info) {
                $('.preview img').attr('src',info.result.path);
            })
        }

        /*==============功能3. 省市区联动功能===================*/
        function PCD(){
            var data={};
            var options={
                url:'/bxg/assets/region.json',
                type:'post',
                success:function(info){
                    data=info;
                    setOptions('000000',$prevince,'p');
                }
            };
            $.ajax(options);
            var $prevince=$('[name="tc_province"]');
            var $city=$('[name="tc_city"]');
            var $district=$('[name="tc_district"]');
            function setOptions(code,$select,type){
                var options=data[type][code];
                var str='';
                for(var key in options){
                    str+= `<option value="${key}">${options[key]}</option>`
                }
                $select.html(str);
                /*触发事件*/
                $select.trigger('change');
            }
            $prevince.on('change', function () {
                setOptions($(this).val(),$city,'c');
            });
            $city.on('change', function () {
                setOptions($(this).val(),$district,'d');
            })

        }
        /*===============功能4. 日期插件初始化===============*/
        function datapickerInit(){
            $('[name="tc_birthday"],[name="tc_join_date"]').datepicker({
                format:'yyyy/mm/dd',
                language:'zh-CN',
                todayHighlight:true
            })
        }
        /*=================功能5. 表单验证插件初始化=================*/
        function validateInit(){

            $('form').validate({
                submitHandler:function(){
                    var options={
                        url:'/api/teacher/modify',
                        type:'post',
                        data:{
                            tc_id:tcID,
                            tc_hometown:tcHomeTown
                        },
                        success:function(info){
                            if(info.code===200){
                                alert('保存成功!');
                            }
                        }
                    }
                    $('form').ajaxSubmit(options);
                },
                rules:{
                    tc_roster:{
                        required:true,
                        rangelength:[2,10]
                    },
                    tc_join_date:{
                        required:true,
                        date:true
                    }
                },
                messages:{
                    tc_roster:{
                        required:'昵称不能为空!',
                        rangelength:'长度为2-10个字符!'
                    },
                    tc_join_date:{
                        required:'日期不能为空!',
                        date:'格式不正确!'
                    }
                }
            });
        }
    })
})