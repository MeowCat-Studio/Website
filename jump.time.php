<?php
$url = $_REQUEST['url'];
$time = $_REQUEST['time'];
$description = $_REQUEST['description'];
?>
<html>
<head>
	<title>��תҳ�� - С�������� - MeowCat Studio</title>
    <link href="jump.style.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
      }

      .form-signin {
        max-width: 300px;
        padding: 19px 29px 29px;
        margin: 0 auto 20px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        -webkit-border-radius: 5px;
           -moz-border-radius: 5px;
                border-radius: 5px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.05);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.05);
                box-shadow: 0 1px 2px rgba(0,0,0,.05);
      }
      .form-signin .form-signin-heading,
      .form-signin .checkbox {
        margin-bottom: 10px;
      }
      .form-signin input[type="text"],
      .form-signin input[type="password"] {
        font-size: 16px;
        height: auto;
        margin-bottom: 15px;
        padding: 7px 9px;
      }

    </style>
	<meta http-equiv="refresh" content="<?php echo $time; ?>;url=<?php echo $url; ?>">
</head>
<body>
<div class="container">
<form class="form-signin">
<h3 class="form-signin-heading">С����ܰ��ʾ��</br>ҳ�潫��<span id="endtime"><?php echo $time; ?></span><script type="text/javascript">
var CID = "endtime";
if(window.CID != null)
{
    var iTime = document.getElementById(CID).innerText;
    var Account;
    RemainTime();
}
function RemainTime()
{
    var iDay,iHour,iMinute,iSecond;
    var sDay="",sHour="",sMinute="",sSecond="",sTime="";
    if (iTime >= 0)
    {
        iDay = parseInt(iTime/24/3600);
        if (iDay > 0)
        {
            sDay = iDay + "��";
        }
        iHour = parseInt((iTime/3600)%24);
        if (iHour > 0){
            sHour = iHour + "ʱ";
        }
        iMinute = parseInt((iTime/60)%60);
        if (iMinute > 0){
            sMinute = iMinute + "��";
        }
        iSecond = parseInt(iTime%60);
        if (iSecond >= 0){
            sSecond = iSecond + "��";
        }
        if ((sDay=="")&&(sHour=="")){
            sTime="<span style='color:darkorange'>" + sMinute+sSecond + "</font>";
        }
        else
        {
            sTime=sDay+sHour+sMinute+sSecond;
        }
        if(iTime==0){
            clearTimeout(Account);
              sTime="<span style='color:green'>0��</span>";
        }
        else
        {
            Account = setTimeout("RemainTime()",1000);
        }
        iTime=iTime-1;
    }
    else
    {
            sTime="<span style='color:red'>����ʱ����</span>";
    }
    document.getElementById(CID).innerHTML = sTime;
}
</script>����ת��</br><h6><?php echo $description; ?>&nbsp;<?php echo $url; ?></h6></h3>
</form>
</div>
</body>
</html>
