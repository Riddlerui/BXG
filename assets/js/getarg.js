

define(function () {
    var search=window.location.search;
    var query=search.split('?')[1]||'';
    var arr=query.split('&')||'';
    var obj={};
    arr.forEach(function (item) {
        var key=item.split('=')[0];
        var value=item.split('=')[1];
        obj[key]=value;
    })
    return obj;
})
