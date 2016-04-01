/**
 * Created by lenovo on 2016/3/31.
 */
(function(window,undefinde){
    window.onload = function(){
        /* 数据格式演示
         var aqiSourceData = {
         "北京": {
         "2016-01-01": 10,
         "2016-01-02": 10,
         "2016-01-03": 10,
         "2016-01-04": 10
         }
         };
         */
//        首先把两个dom元素得到
        var date = document.getElementById("form-gra-time").getElementsByTagName("input");
        var city = document.getElementById("city-select");
        for(var i=0;i<date.length;i++) {
            if (date[i].checked) {
                var dateSelect = date[i].value;
            }
        }
        var citySelect = city.value;

// 以下两个函数用于随机模拟生成测试数据
        function getDateStr(dat) {
            var y = dat.getFullYear();
            var m = dat.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = dat.getDate();
            d = d < 10 ? '0' + d : d;
            return y + '-' + m + '-' + d;
        }
        function randomBuildData(seed) {
            var returnData = {};
            var dat = new Date("2016-01-01");
            var datStr = '';
            for (var i = 1; i < 92; i++) {
                datStr = getDateStr(dat);
                returnData[datStr] = Math.ceil(Math.random() * seed);
                dat.setDate(dat.getDate() + 1);
            }
            return returnData;
        }

        var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
            '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

        var aqiSourceData = {
            "北京": randomBuildData(500),
            "上海": randomBuildData(300),
            "广州": randomBuildData(200),
            "深圳": randomBuildData(100),
            "成都": randomBuildData(300),
            "西安": randomBuildData(500),
            "福州": randomBuildData(100),
            "厦门": randomBuildData(100),
            "沈阳": randomBuildData(500)
        };

// 用于渲染图表的数据
        var chartData = {};

// 记录当前页面的表单选项
        var pageState = {
            nowSelectCity: -1,
            nowGraTime: "day"
        };

        /**
         * 渲染图表
         */
        function renderChart() {
            var graph = document.getElementsByClassName("aqi-chart-wrap")[0];
            graph.innerHTML = "";
            var i=1;
            if(dateSelect === "day"){
                for(var key in chartData){
                    graph.innerHTML += "<div class='day item' style='height:"+chartData[key]+"px; background-color:"+colors[Math.floor(Math.random() * 11)]+"; left:"+i*15+"px;'><div class='tip'>api: "+chartData[key]+"</div></div>";
                    i++;
                }
            }else if(dateSelect === "week"){
                for(var key in chartData){
                    graph.innerHTML += "<div class='week item' style='height: "+chartData[key]+"px; background-color:"+colors[Math.floor(Math.random() * 11)]+"; left:"+i*60+"px;'><div class='tip'>api: "+chartData[key]+"</div></div>";
                    i++;
                }
            }else {
                for(var key in chartData){
                    graph.innerHTML += "<div class='month item' style='height: "+chartData[key]+"px; background-color:"+colors[Math.floor(Math.random() * 11)]+"; left:"+i*250+"px;'><div class='tip'>api: "+chartData[key]+"</div></div>";
                    i++;
                }
            }
        }

        /**
         * 日、周、月的radio事件点击时的处理函数
         */
        function graTimeChange() {
            // 确定是否选项发生了变化
            if(dateSelect !== this.value){
                dateSelect = this.value;
            }
            // 设置对应数据
            initData();

            // 调用图表渲染函数
            renderChart();
        }

        /**
         * select发生变化时的处理函数
         */
        function citySelectChange() {
            // 确定是否选项发生了变化
            if(citySelect !== this.value){
                citySelect = this.value;
            }
            // 设置对应数据
            initData();

            // 调用图表渲染函数
            renderChart();
        }

        function initData(){
            chartData = {};
            if(dateSelect === 'day'){
                chartData = aqiSourceData[citySelect];
            }else if(dateSelect === 'week') {
                var count = 0, total = 0, week = 1;
                for(var key in aqiSourceData[citySelect]){
                    var itemDate = new Date(key);
                    var weekDay = itemDate.getDay();
                    if(weekDay === 6){
                        count ++;
                        total += aqiSourceData[citySelect][key];
                        chartData[week] = Math.round(total/count);
                        total = 0;
                        count = 0;
                        week ++;
                    }else {
                        total += aqiSourceData[citySelect][key];
                        count ++;
                    }
                }
            }else {
                var tmpMonth = -1;
                count = 0; total = 0;
                for(var key in aqiSourceData[citySelect]) {
                    itemDate = new Date(key);
                    var month = itemDate.getMonth();
                    if(tmpMonth+1 !== month){
                        chartData[tmpMonth+2] = Math.round(total/count);
                        total = 0;
                        count = 0;
                        tmpMonth ++;
                    }
                    total += aqiSourceData[citySelect][key];
                    count ++;
                }
                chartData[tmpMonth+2] = Math.round(total/count);
            }
        }

        /**
         * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
         */
        function initGraTimeForm() {
            for(var i=0; i<date.length; i++){
                date[i].addEventListener("click",graTimeChange,false);
            }
        }

        /**
         * 初始化城市Select下拉选择框中的选项
         */
        function initCitySelector() {
            // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
            for(var key in aqiSourceData){
                city.innerHTML += "<option value='"+key+"'>"+key+"</option>";
            }
            citySelect = city.value;
        //<option value="沈阳">沈阳</option>
            city.addEventListener("change",citySelectChange,false);
            // 给select设置事件，当选项发生变化时调用函数citySelectChange

        }

        /**
         * 初始化图表需要的数据格式
         */
        function initAqiChartData() {
            // 将原始的源数据处理成图表需要的数据格式
            // 处理好的数据存到 chartData 中

            initData();
            renderChart();
        }

        /**
         * 初始化函数
         */
        function init() {
            initGraTimeForm();
            initCitySelector();
            initAqiChartData();
        }

        init();
    };
})(window);