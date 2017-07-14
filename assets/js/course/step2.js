/*
* 功能
* 1. 上传图片
* 2. 裁剪图片(Jcrop插件),保存裁剪的坐标及宽高
* 3. 给裁切按钮注册点击事件,把得到的坐标发给服务器(图片在服务器上裁切的)
* 4. 如果注册成功,就跳转到下一个页面
* */
require(['/bxg/assets/js/config.js','/bxg/assets/js/common.js'],function(){
    require(['jquery','/bxg/assets/js/getarg.js'
        ,'webuploader','jcrop'],function($,obj,WebUploader){
        var coords={};
        uploadAvatarPlugin();
        subCoords()
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
                server: '/api/uploader/cover',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#filePicker',
                // pick: '#upload',
                formData:{
                    cs_id:obj.cs_id
                },
                fileVal: 'cs_cover_original', // 参数名
                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png'
                    // mimeTypes: 'image/*'
                }
            })
            uploader.on('uploadSuccess', function (attr,info) {
                $('.preview img').attr('src',info.result.path).on('load', function () {
                    jcropInit();
                })

            })
        }
        /*裁剪图片*/
        function jcropInit(){
            var options={
                boxWidth:300,
                //aspectRatio:1.618,
                onSelect:function(arg){
                    //console.log(arg);
                    coords=arg;
                }
            };
            $('.preview img').Jcrop(options, function () {
                /*设置默认选择的区间*/
                this.setSelect([0,20,100,400]);
            })
        }
        /*点击裁切按钮,把坐标发给服务器*/
        function subCoords(){
            $('#sub').on('click', function () {
                coords.cs_id=obj.cs_id;
                var options={
                    url:'/api/course/update/picture',
                    type:'post',
                    data:coords,
                    success:function(info){
                        if(info.code===200){
                            window.location.href='/bxg/views/course/step3.html?cs_id='+obj.cs_id;
                        }
                    }
                };
                $.ajax(options);
            })
        }
    })
})