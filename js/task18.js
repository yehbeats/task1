/**
 * Created by lenovo on 2016/4/1.
 */
(function(window,undefined){
    window.onload = function(){

        var inputNumber = document.getElementsByClassName("number-input")[0];
        var content = document.getElementById("content");

        var numbers = [10,3,7,12,11,30];
        graph();

        function graph(){
            content.innerHTML = "";
            numbers.forEach(function(item){
               content.innerHTML += "<div class='item'>"+item+"</div>";
            });
        }

        var numberHandel = document.getElementsByClassName("number-handle")[0];
        numberHandel.addEventListener("click", function(event){
            var button = event.target;
            if(button.tagName === "BUTTON"){
                switch (button.className){
                    case "enter-left": numbers.unshift(inputNumber.value); break;
                    case "enter-right": numbers.push(inputNumber.value); break;
                    case  "leave-left": numbers.shift(); break;
                    case  "leave-right":numbers.pop();break;
                }
                graph();
            }
        },false);
    }
})(window);