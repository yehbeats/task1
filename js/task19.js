/**
 * Created by lenovo on 2016/4/1.
 */
(function(window,undefined){
    window.onload = function(){

        var inputNumber = document.getElementsByClassName("number-input")[0];
        var sort = document.getElementsByClassName("sort")[0];
        var content = document.getElementById("content");


        var numbers = [99,80,10,65,55,3,7,52,12,11,30,48,23,60,56,12,89,70];

        var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
            '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];
        graph();
        function graph(){
            content.innerHTML = "";
            var i = 1;
            numbers.forEach(function(item){
                var color = colors[0];
                if(10<=item && item<20){
                    color = colors[1];
                }else if(20<=item && item<30){
                    color = colors[2];
                }else if(30<=item && item<40){
                    color = colors[3];
                }else if(40<=item && item<50){
                    color = colors[4];
                }else if(50<=item && item<60){
                    color = colors[5];
                }else if(60<=item && item<70){
                    color = colors[6];
                }else if(70<=item && item<80){
                    color = colors[7];
                }else if(80<=item && item<90){
                    color = colors[8];
                }else if(90<=item && item<=100){
                    color = colors[9];
                }
               content.innerHTML += "<div class='item' style='height: "+item+"px; background-color:"+color+"; left:"+i*40+"px'></div>";
                i++;
            });
        }
        function judge(){
            if(Number(inputNumber.value)>100 || Number(inputNumber.value) < 10){
                alert("请出入符合范围的数据");
                return false;
            }
            if(numbers.length >= 60) {
                alert("超出60");
                return false;
            }
            return true;
        }

        function numSort(){
            var items = content.getElementsByTagName("div");
            var length = numbers.length;
            var i = length -1;
            var j = 0;
            var timer = setInterval(run, 100);
            function run() {
                if( i >= 0) {
                    if(j < i) {
                        if (numbers[j] > numbers[j + 1]) {
                            var tmp = numbers[j];
                            numbers[j] = numbers[j + 1];
                            numbers[j + 1] = tmp;
                            var color = items[j].style.backgroundColor;
                            items[j].style.backgroundColor = items[j+1].style.backgroundColor;
                            items[j+1].style.backgroundColor = color;
                            items[j].style.height = numbers[j]+"px";
                            items[j+1].style.height = numbers[j+1]+"px";
                        }
                        j++;
                    }else{
                        i --;
                        j = 0;
                    }
                }else{
                    clearInterval(timer);
                    return;
                }
            }
        }

        var numberHandel = document.getElementsByClassName("number-handle")[0];
        numberHandel.addEventListener("click", function(event){
            var button = event.target;
            if(button.tagName === "BUTTON"){
                switch (button.className){
                    case "enter-left": if(!judge()) break; numbers.unshift(Number(inputNumber.value)); graph(); break;
                    case "enter-right": if(!judge()) break; numbers.push(Number(inputNumber.value)); graph(); break;
                    case  "leave-left": numbers.shift(); graph(); break;
                    case  "leave-right":numbers.pop(); graph(); break;
                }

            }
        },false);

        sort.addEventListener("click",numSort,false);
    }
})(window);