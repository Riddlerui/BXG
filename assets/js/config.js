/**
 * Created by Lenovo on 2017/7/12.
 */
require.config({
    baseUrl:'/bxg/node_modules',
    paths:{
        jquery:'./jquery/dist/jquery',
        cookie:'./jquery.cookie/jquery.cookie',
        nprogress:'./nprogress/nprogress',
        template:'./art-template/lib/template-web',
        bootstrap:'./bootstrap/dist/js/bootstrap',
        datepicker:'./bootstrap-datepicker/dist/js/bootstrap-datepicker',
        validate:'./jquery-validation/dist/jquery.validate',
        form:'./jquery-form/dist/jquery.form.min',
        zh:'./bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
        webuploader:'./webuploader/dist/webuploader',
        jcrop:'/bxg/assets/jcrop/js/jquery.Jcrop'
    },
    shim:{
        bootstrap: {
            deps: ['jquery']
        },
        zh:{
            deps:['jquery','datepicker']
        }
    }
})