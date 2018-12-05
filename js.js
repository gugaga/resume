var portfolioAll = document.getElementById("portfolioAll");
var portfolioFrameWork = document.getElementById("portfolioFrameWork");
var portfolioVallina = document.getElementById("portfolioVallina");
var portfolioBar = document.getElementById("portfolioBar");

portfolioAll.onclick = function(){
    portfolioBar.className = "bar state-1";
}

portfolioFrameWork.onclick = function(){
    portfolioBar.className = "bar state-2";
}
portfolioVallina.onclick =function(){
    portfolioBar.className = "bar state-3";
}