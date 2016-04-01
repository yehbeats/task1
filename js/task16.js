/**
 * Created by lenovo on 2016/3/30.
 */
(function(window){
    window.onload = function(){
        /**
         * aqiData，存储用户输入的空气指数数据
         * 示例格式：
         * aqiData = {
         * "北京": 90,
         * "上海": 40
         * };
         */
        var city = document.getElementById("aqi-city-input");
        var aqi = document.getElementById("aqi-value-input");
        var warning = document.getElementById("alert");
        var warningAqi = document.getElementById("aqialert");

        var aqiData = {};
        var message, messageAqi;
        var canAdd;

        //var checkCity = new RegExp("^[\\u4E00-\\u9FA5a-zA-Z]+$","g");


        function ifValidate(){
            var checkCity = /^[\u4E00-\u9FA5a-zA-Z]+$/g;    //必须放在里面，以保证每次都是从头开始匹配，而不是在上一次的结果上
            if(aqiData[city.value] !== undefined){
                message = "*不能添加重复数据";
                canAdd = false;
            }else{
                //alert(city.value);
                if(checkCity.exec(city.value)){
                    var pos = aqi.value.search(/\D/g);
                    if(pos >= 0){
                        messageAqi = "*空气质量必须全部为数字";
                        canAdd = false;
                    }else{
                        canAdd = true;
                    }
                }else{
                    message = "*请输入的正确的城市名称";
                    canAdd = false;
                }
            }
        }
        function clear(){
            warning.innerHTML = "";
            warningAqi.innerHTML = "";
            message = undefined;
            messageAqi = undefined;
        }

        /**
         * 从用户输入中获取数据，向aqiData中增加一条数据
         * 然后渲染aqi-list列表，增加新增的数据
         */
        function addAqiData() {
            clear();
            ifValidate();
            if(canAdd){
                aqiData[city.value] = aqi.value;
            }
        }

        /**
         * 渲染aqi-table表格
         */
        function renderAqiList() {
            if(!canAdd){
                if(message !== undefined){
                    warning.innerHTML = message;
                    warning.style.color = "#ff0000";
                }
                if(messageAqi !== undefined){
                    warningAqi.innerHTML = messageAqi;
                    warningAqi.style.color = "#ff0000";
                }

            }else{
                var table = document.getElementById("aqi-table");
                var row = table.insertRow();
                row.innerHTML = "<td>"+city.value+"</td><td>"+aqi.value+"</td><td><button>删除</button></td>";
                table.appendChild(row);
            }

            //table.innerHTML += "<tr><td>" + city.value + "</td><td>" +aqi.value + "</td><td><button>删除</button></td>";
        }

        /**
         * 点击add-btn时的处理逻辑
         * 获取用户输入，更新数据，并进行页面呈现的更新
         */
        function addBtnHandle() {
            addAqiData();
            renderAqiList();
        }

        /**
         * 点击各个删除按钮的时候的处理逻辑
         * 获取哪个城市数据被删，删除数据，更新表格显示
         */
        function delBtnHandle() {
            // do sth.

            renderAqiList();
        }

        function init() {

            // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
            var btn = document.getElementById("add-btn");
            btn.addEventListener("click",addBtnHandle,false);
            // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
            var table = document.getElementById("aqi-table");
            table.addEventListener("click",function(event){
                var node = event.target;                       //判断过来的是不是button
                if(node.tagName  === "BUTTON") {
                    table.deleteRow(node.parentNode.parentNode.rowIndex);
                    delete  aqiData[node.parentNode.previousSibling.previousSibling.innerHTML];  //同时删除字典中相对应的一项
                    console.log(aqiData);
                }
            },false);
        }

        init();
    };
})(window);
