    $(document).ready(function() {

        //资讯nav
        var infodex = $(".nav-info li.active").index() + 1;
        $(".nav-info li").eq(infodex).find('span').css("border", "none");;
        //财经日历筛选
        /*$(".weektime-cj li").click(function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });*/

        $('.weektime-cj').on('click', 'li',function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        })

        $(".ccountry-cj ul li").click(function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });


        $(".other-cj, .submit-othercj span").click(function() {
            if ($(".detail-othercj").css("display") == "none") {
                $(".detail-othercj").slideDown();
                $(".sj-othercj i").show();
            } else {
                $(".detail-othercj").slideUp();
                $(".sj-othercj i").hide();
            }
        });
        //详解显示
        $(document).on('click', '.nav-detailcj li', function() {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var x = $(this).index();
            if (x == 0) {
                $(".main01-detailcj").show();
                $(".main02-detailcj").hide();
            } else {
                $(".main01-detailcj").hide();
                $(".main02-detailcj").show();
            }
        });

    });

    var arrData = []; //历史数据【公布值】
    var arrDate = []; //历史数据【周期】
    (function() {
        'usestrict';
        var countries = []; //国家地区
        var categories = []; //类别
        var importances = []; //重要性
        var url = '/test/caiji.php';
        var moduleEconomicCalendar = angular.module("ModuleEconomicCalendar", ['commonApp', 'ngSanitize']);

        moduleEconomicCalendar.controller('EconomicCalendarCtrl', function($scope, $http, $compile) {
            $scope.isShow = {};
            $scope.beginDate = ''; //开始日期
            $scope.countryCode = ''; //国家编号

            //根据日期搜索
            $scope.SearchDay = function(day) {
                $scope.beginDate = day;
                $scope.Search();
            }

            //根据国家来搜索
            $scope.SearchCountry = function(code) {
                $scope.countryCode = code;
                $scope.Search();
            }

           $scope.Search = function() {
                $http({
                    method: 'POST',
                    url: url,
                    data: {
                        beginDate: $scope.beginDate,
                        keyWord: $("#keyWord").val(),
                        countries: countries,
                        categories: categories,
                        importances: importances,
                        countryCode: $scope.countryCode
                    }
                }).success(function(data) {
                    $scope.groupFinancialCalendarData = data.groupFinancialCalendarData;
                    $scope.CentralBankNews = data.CentralBankNews;
                    $scope.FinancialEvent = data.FinancialEvent;
                    $scope.HolidayReport = data.HolidayReport;

                });
                url = '/test/caiji.php';
            }

            $scope.Search();


            //根据日期选择展现数据
            $scope.chooseDate = function() {
                laydate({
                    festival: true, //显示节日
                    istoday: true,
                    choose: function(data) { //选择日期完毕的回调
                        var objs = $(".weektime-cj").find('li');
                        $(objs).removeClass('active');
                        $.each(objs, function() {
                            if ($(this).html().indexOf(data) > -1) {
                                $(this).addClass('active');
                                return false;
                            }
                        });
                        $scope.beginDate = data;
                        $scope.Search();
                    }
                });

            }

            $scope.loadDay = function (day) {
                var firstDayHtml = $(".weektime-cj").find('li').first();
                var lastDayHtml = $(".weektime-cj").find('li').last()
                var strFirstDay = firstDayHtml.text().split(' ')[0];
                var strlastDay = lastDayHtml.text().split(' ')[0];
                if (strlastDay) {
                    var currentDate;
                    if (day == 0) {
                        currentDate = new Date(strlastDay);
                    } else {
                        currentDate = new Date(strFirstDay);
                    }
                   
                    var strHtml='';
                    for (var i = 1-day; i <= 7-day; i++) {
                        var date = $scope.getDate(currentDate, i)
                        strHtml += "<li ng-click=\"SearchDay('"+ $scope.generateDate(date) + "')\">" + $scope.generateDate(date) + " " + $scope.generateWeekDay(date) + "</li>"
                    }

                    $(".weektime-cj").hide().empty();
                    if (day == 0) {
                        $(".weektime-cj").append(strHtml).show('slide', { direction: "right" })

                    } else {
                        $(".weektime-cj").append(strHtml).show('slide', { direction: "left" })
                    }
                   
                    var compiled = $compile(angular.element('.weektime-cj'));
                    compiled($scope);
                   
                }
            }

            //日期增减计算
            $scope.getDate = function (date, dayNum) {
                var d = new Date(date);
                d.setDate(d.getDate() + dayNum)
                return d;
            }


            //生成特定日期格式
            $scope.generateDate = function (date) {
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var day = date.getDate()< 10 ? "0" + (date.getDate()) : date.getDate();
                return date.getFullYear() + "-" + month + "-" + day;
            }

            //根据日期生成礼拜几
            $scope.generateWeekDay=function(date) {
                var day = date.getDay();
                switch(day) {
                    case 0:
                        return "(周日)";
                    case 1:
                        return "(周一)";
                    case 2:
                        return "(周二)";
                    case 3:
                        return "(周三)";
                    case 4:
                        return "(周四)";
                    case 5:
                        return "(周五)";
                    case 6:
                        return "(周六)";

                }
            }

            //显示详情图表
            $scope.showDetail = function(columnCode, content) {
                if (!$('#div' + columnCode).is(':hidden')) { //再次点击切换隐藏功能
                    $('#div' + columnCode).hide();
                    return;
                }
                $(".detail-lxcj").empty();
                $(".detail-lxcj").hide();
                $http({
                    method: 'GET',
                    async: true,
                    url: 'http://www.followme.com/News/Indicator?columnCode=' + columnCode,
                    data: { columnCode: columnCode }
                }).success(function(response) {
                    var rawHtml = response;
                    alert(rawHtml);
                    $("#div" + columnCode).append(rawHtml);
                    $scope.ListIndicatorDate = arrDate.concat().reverse();
                    $scope.ListIndicatorData = arrData.concat().reverse();
                    $scope.dataLength = 5;
                    //编译图表页面
                    var compiled = $compile(angular.element('.main02-detailcj'));
                    compiled($scope);
                    $("#div" + columnCode).slideDown();
                });

            }
            //加载更多
            $scope.loadMore = function() {
                $scope.dataLength += 5;
            }

        });


        $(function() {

            //Li标签事件对象
            function LiEventModel(containers, obj) {
                this.obj = obj;
                this.containers = containers
            }

            LiEventModel.prototype = {
                start: function() {
                    var that = this;
                    var firstItem = $(that).find('li').first();
                    $(that.obj).on('click', 'li', function() {
                            var item = $(this).html();
                            var index = that.containers.indexOf(item);
                            if ($(this).hasClass('active')) {
                                $(this).removeClass('active');

                                if (index > -1 && item !== '全部') {
                                    that.containers.splice(index, 1);
                                    if ($(firstItem).hasClass('active')) {
                                        $(firstItem).removeClass('active');
                                    }
                                }
                                if (item === '全部') {
                                    $(that.obj).find('li').removeClass('active');
                                    that.containers.splice(0,that.containers.length);
                                }

                            } else {
                                if (index === -1 && item !== '全部') {
                                    that.containers.push(item);
                                } else if (item === '全部') {
                                    that.containers.splice(0,that.containers.length)
                                    var objs = $(that.obj).find('li');
                                    $.each(objs, function() {
                                        var temp = $(this).html();
                                        if (temp != '全部') {
                                            that.containers.push(temp);
                                        }
                                    });
                                    $(that.obj).find('li').addClass('active');
                                }
                                $(this).addClass('active');
                            }
                        }
                    )
                }
            }
    
            //根据国家来过滤
            var c1 = new LiEventModel(countries, $('#divCountry'));
            //根据类别来过滤
            var c2 = new LiEventModel(categories, $("#divCategory"));
            c1.start();
            c2.start();
           
        


            //根据重要性来过滤
            $("#divImportance").on('click', 'label', function() {
                var numArray = $(this).html().match(/[0-9]/);
                var index = -1;
                var important = parseInt(numArray); //过滤出数字
                if (!isNaN(important)) {
                    index = importances.indexOf(important);
                }

                if ($(this).hasClass('checked')) {
                    $(this).removeClass('checked');
                    if (index > -1) {
                        importances.splice(index, 1);
                    }

                } else {
                    if (index === -1) {
                        importances.push(important);
                    }
                    $(this).addClass('checked');

                }
            });

        });

    }());

     function getMyDate(str){  
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime =  getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
        }; 
        //补0操作
      function getzf(num){  
          if(parseInt(num) < 10){  
              num = '0'+num;  
          }  
          return num;  
      }