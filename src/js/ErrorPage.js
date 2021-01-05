let $ = layui.$,
  form = layui.form;

$(
  //1. 反馈按钮确认
  FeedBackCommit(),

  //2. 反馈表单提交
  BackFormSubmit()
);

//1. 反馈按钮确认
function FeedBackCommit() {
  let FormShow = false;
  $('#Js_Feedback').click(function () {
    if(FormShow) return false;
    layer.alert('是够需要填写详细的反馈信息？', {
      title: "信息确认"
      ,skin: 'layui-layer-molv' //样式类名
      ,btn: ["我要填写", "直接报告>>"]
      ,yes: function (index) {
        //我要填写
        $('#FeedBackForm').removeClass('layui-hide');
        FormShow = true;
        layer.close(index)
      }
      ,btn2: function () {
        //直接报告
        AjaxSubmit({})
      }
    });
  })
}

//2. 反馈表单提交
function BackFormSubmit() {
  form.on('submit(BackForm)', function(data){
    AjaxSubmit(data.field);
    return false;
  });
}

//3. Ajax提交
function AjaxSubmit(userInfo) {
  console.log(userInfo);
  $.post('/errors/', userInfo, function(res){
    if(res.code) {
      layer.msg(res.data, {icon:1})
    }else {
      layer.msg(res.msg, {icon:2})
    }
  });
}
