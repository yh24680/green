$(function() {
    const form = layui.form;
    const layer = layui.layer;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });

    // 获取用户基本资料
    const initUserinfo = () => {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) return layer.msg("获取用户信息失败");
                layer.msg("获取用户信息成功");
                form.val("formUserInfo", res.data);
            }
        })
    }
    initUserinfo();


    // 实现重置效果
    $("#btnReset").click((e) => {
        e.preventDefault();
        initUserinfo();
    });


    // 更新用户信息
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"/my/userinfo",
            data: $(this).serialize(),
            success: (res) => {
                if(res.status !==0) return layer.msg("获取失败");
                layer.msg("获取成功")
                //  调用 index.js getUserInfo 方法重新渲染头像
                window.parent.getUserInfo()
            }
        })
    })
})