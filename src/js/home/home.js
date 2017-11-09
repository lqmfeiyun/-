$(document).ready(function(){
	servlet();
	init();
	// // 一分钟请求下
	// setInterval("init()",60000);
	getDate();
 });

// 跳转
function servlet(){
	// 财经日历
	$('#calendar').on('click',function () {
   // location.href="http://wx.haibaobaoxian.com/hb-biz/h5_partner/welcome.html?pcode=weix-h5-all";
   // window.open('bb.html,'_blank'); 
	 window.close(); 
	 console.log("22");
	});
	// 行情
	$('#quotation').on('click',function (){
		location.href="../quotation/quotation.html";
	});
}

//财经行情
function init(){
	var str='';
   	$.ajax({
      	url:'/test/index1.php',
	  	type:'get',
		dataType: 'json',
		async:false,
		success:function(msg){
	  		// var obj = eval('(' + data + ')');
		  	var obj=msg;
			for(var i=0;i<obj.list[0].length;i++){
				
				if(obj.list[0][i]['Nation']==''){
					var time= new Array(); //定义一数组
		            time=obj.list[0][i]['UpdateTime'].split("("); //字符分割 			 
					var shijian=time[1].split(')')[0];	
					var data = getMyDate(parseInt(shijian));
					str=str+'<li ng-repeat="item in group" class="ng-scope"> <div ng-if="!item.IsEcoIndicator" class="ng-scope">';
					str=str+'<span class="time-hx ng-binding">'+data+'</span><span class="txt-hx ng-binding" ng-bind-html="item.Title" ng-class=""><div>'
					str=str+obj.list[0][i]['Title']+'</div></span></div></li>';
				}
				// 图片加载不出，暂时不显示
				/*else{
					var time= new Array(); //定义一数组
	             	time=obj.list[0][i]['UpdateTime'].split("("); //字符分割 
				 
				 	var shijian=time[1].split(')')[0];
				 
					var data = getMyDate(parseInt(shijian));
					str=str+'<li ng-repeat="item in group" class="ng-scope"><i class="hxll-icon ng-scope" ng-if="item.IsEcoIndicator" ng-class=""></i><div ng-if="item.IsEcoIndicator" class="ng-scope">';
					str=str+'<span class="time-hx ng-binding">'+data+'</span><div class="ll-hx"><span class="xx-'+obj.list[0][i]['StarLevel']+'"></span>';
					str=str+'<span class="bg-country '+obj.list[0][i]['Nation']+'"></span><p ng-bind-html="item.Title" class="ng-binding">';
					str=str+obj.list[0][i]['Title']+'</p></div><div class="lx-hx"><p>前值<br><em class="ng-binding">';
					str=str+obj.list[0][i]['Prev']+'%</em> </p><p>预期<br><em class="ng-binding">';
					str=str+obj.list[0][i]['Pred']+'%</em></p><p> 实际<br><em class="blue-hx ng-binding" ng-class="">';
					str=str+obj.list[0][i]['Curr']+'%</em> </p></div></div></li>';
				}*/
			}
				
			$('.list-hx').append(str);
	 	},
	 	error:function(){
	 		console.log("error");
	 	},
   });
   
}

// 获取时间
function getMyDate(str) {
	var oDate = new Date(str),
	oYear = oDate.getFullYear(),
	oMonth = oDate.getMonth() + 1,
	oDay = oDate.getDate(),
	oHour = oDate.getHours(),
	oMin = oDate.getMinutes(),
	oSen = oDate.getSeconds(),
	oTime = getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间  
	return oTime;
};
//补0操作
function getzf(num){  
    if(parseInt(num) < 10){  
        num = '0'+num;  
    }  
    return num;  
}
//获取当天     
function getDate(){
	/*获取当天日期*/
	var oDate = new Date(), 
    oYear = oDate.getFullYear(),  
	oMonth = oDate.getMonth()+1,  
	oDay = oDate.getDate(),   
	oToday=oYear+'-'+oMonth+'-'+oDay;


      /*获取星期*/
    var weekDay='日一二三四五六',
    getWeek='星期'+weekDay.charAt(new Date().getDay());
	var strDate='<span style="font-weight:bolder">'+getWeek+'&nbsp;&nbsp;&nbsp;'+oToday+'</span>';
	$('.getDate').append(strDate);
}