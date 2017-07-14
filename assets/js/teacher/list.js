/*
* 教室列表页面
* 功能1. 获取教师信息列表
* 功能2. 查看教师信息
* 功能3. 注销或者启用
* */
require(['/bxg/assets/js/config.js'], function () {
    require(['jquery','template','bootstrap','/bxg/assets/js/common.js'], function ($,template) {
        //功能1. 获取教师信息列表
        getTeacherList();
        //功能2. 查看教师信息
        getTeacherInfo();
        //功能3. 注销或者启用
        startOrStop();

        /*============功能1. 获取教师信息列表==============*/
        function getTeacherList(){
            var options={
                url:'/api/teacher',
                type:'get',
                success: function (info) {
                    if(info.code===200){
                        var html=template('tmpl-list',{list:info.result});
                        $('#list').html(html);
                    }else{
                        alert('没有数据!');
                    }
                },
                error: function (err) {
                    alert('你没有权限!');
                }
            };
            $.ajax(options);
        }

        /*把出生日期改成年龄显示*/
        function getAge(birth){
            var birthYear=new Date(birth).getFullYear();
            var nowYear=new Date().getFullYear();
            return nowYear-birthYear;
        }
        /*过滤器 让所有的模板都可以使用这个getAge*/
        template.defaults.imports.getTecAge=getAge;

        /*============功能2. 查看教师信息==============*/
        function getTeacherInfo(){
            $('#list').on('click','.preview', function () {
            //    弹出模态框
                $('#teacherModal').modal();
            //    发请求获取教师信息
                var tcID=$(this).closest('tr').attr('tc-id');
                var options={
                    url:'/api/teacher/view',
                    type:'get',
                    data:{
                        tc_id:tcID
                    },
                    success: function (info) {
                        if(info.code===200){
                            var data=info.result;
                            /*es6 中新增的方法*/
                            var html=`
                        <tbody>
                            <tr>
                            <th>姓名:</th>
                            <td>${data.tc_name}</td>
                            <th>职位:</th>
                            <td colspan="3">讲师</td>
                                <td rowspan="4" width="128">
                                <div class="avatar">
                                <img src="${data.tc_avatar}" alt="">
                                </div>
                                </td>
                                </tr>
                                <tr>
                                <th>花名:</th>
                            <td>${data.tc_roster}</td>
                            <th>出生日期:</th>
                            <td colspan="3">${getAge(data.tc_birthday)}</td>
                                </tr>
                                <tr>
                                <th>性别:</th>
                            <td>${data.tc_gender===0?'男':'女'}</td>
                            <th>入职日期:</th>
                            <td colspan="3">${data.tc_join_date}</td>
                                </tr>
                                <tr>
                                <th>手机号码:</th>
                            <td colspan="2">${data.tc_cellphone}</td>
                                <th>邮箱:</th>
                            <td colspan="2">${data.tc_email}</td>
                            </tr>
                            <tr>
                            <th>籍贯:</th>
                            <td colspan="6">${data.tc_hometown}</td>
                            </tr>
                            <tr>
                            <td colspan="7">
                                <div class="introduce">
                                    ${data.tc_introduce}
                               </div>
                            </td>
                            </tr>
                            </tbody>
                            `
                            $('#modal-list').html(html);
                        }
                    },
                    error:function(){
                        console.log('出错了!');
                    }
                };
                $.ajax(options);
            })
        }

        /*==============功能3. 注销或者启用===================*/
        function startOrStop(){
            $('#list').on('click','.start-stop', function (){
                var $this=$(this);
                var $tr=$this.closest('tr');
                var tcID=$tr.attr('tc-id');
                var tcStatus=$tr.attr('tc-status');
                var options={
                    url:'/api/teacher/handle',
                    type:'post',
                    data:{
                        tc_id:tcID,
                        tc_status:tcStatus
                    },
                    success:function(info){
                        if(info.code===200){
                            var status=info.result.tc_status==0?'注销':'启用';
                            $tr.attr('tc-status',info.result.tc_status);
                            $this.text(status);
                        }
                    }

                };
                $.ajax(options);
            })
        }
    })
})