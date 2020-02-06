window.onload = function(){
    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth() + 1;
    var curDay = curDate.getDate();
    var toolsCurdate = document.getElementById('cldtopCurdate');
    toolsCurdate.innerHTML = curYear+'年'+curMonth+'月'+curDay+'日';
    showCld(curYear,curMonth,whatDay(curYear,curMonth));
    document.getElementById('right').onclick = function(){
        nextMonth();
    }
    document.getElementById('left').onclick = function(){
        preMonth();
    }
    addOnclick(1);
}

var lastButton = -1;
var monthDay = [31,0,31,30,31,30,31,31,30,31,30,31];
var colorList = ['#018acb','#03b2eb','#00a172','#89bd4f','#c2d032','#fbc434','#f08439','#eb5531','#eb4366','#c24b8d','#744e9b','#375ea9'];

function nextMonth(){
    var topStr = document.getElementById("topDate").innerHTML;
    var pattern = /\d+/g;
    var listTemp = topStr.match(pattern);
    var year = Number(listTemp[0]);
    var month = Number(listTemp[1]);
    var nextMonth = month+1;
    var tDate = new Date();
    if(nextMonth > 12){
        nextMonth = 1;
        year++;
    }
    document.getElementById('topDate').innerHTML = '';
    showCld(year, nextMonth, whatDay(year, nextMonth));
    if(nextMonth == tDate.getMonth()+1 && year == tDate.getFullYear()){
        addOnclick(1);
    }
    else{
        addOnclick(0);
    }
}
function preMonth(){
    var topStr = document.getElementById("topDate").innerHTML;
    var pattern = /\d+/g;
    var listTemp = topStr.match(pattern);
    var year = Number(listTemp[0]);
    var month = Number(listTemp[1]);
    var preMonth = month-1;
    var tDate = new Date();
    if(preMonth < 1){
        preMonth = 12;
        year--;
    }
    document.getElementById('topDate').innerHTML = '';
    showCld(year, preMonth, whatDay(year, preMonth));
    if(preMonth == tDate.getMonth()+1 && year == tDate.getFullYear()){
        addOnclick(1);
    }
    else{
        addOnclick(0);
    }
}

function addOnclick(flag){
    var dayButtons = document.getElementsByClassName('isDate');
    var curTd = document.getElementsByClassName('curDate')[0];
    for(var i=0; i<dayButtons.length; i++){
        dayButtons[i].index = i;
        dayButtons[i].onclick = function(){
            if(lastButton != -1){
                dayButtons[lastButton].style = '';
            }
            else if(lastButton == -1 && flag){
                curTd.style = '';
            }
            this.style = 'border-radius: 30px;color: white;background-color: #ffa500;';
            lastButton = this.index; 
        };
    }
    if(flag){
        curTd.index = -1;
        curTd.onclick = function(){
            if(lastButton != -1){
                dayButtons[lastButton].style = '';
            }
            this.style = 'border-radius: 30px;color: white;background-color: red;';
            lastButton = -1;
        };
    }
}

/*显示日历*/
function showCld(year, month, firstDay){
    var i;
    var tagClass = "";
    var nowDate = new Date();
    var thead = document.getElementById('cldThead');
    thead.style.background = colorList[month-1];
    var days;
    if(month == 2){
        if(isLeap(year)){
            days = 29;
        }
        else{
            days = 28;
        }
    }
    else{
        days = monthDay[month-1];
    }


    var topdateHtml = year + "年" + month + "月";
    var topDate = document.getElementById('topDate');
    topDate.innerHTML = topdateHtml;    
    
    var lastEnd;
    if(month == 1){
        lastEnd = 31;
    }
    else if(month == 3){
        if(isLeap(year)){
            lastEnd = 29;
        }
        else{
            lastEnd = 28;
        }
    }
    else{
        lastEnd = monthDay[month-2];
    }

    var tbodyHtml = '<tr>';
    for(i=lastEnd-firstDay+1; i<=lastEnd; i++){
        tbodyHtml += "<td class='notDate'>" + i + "</td>";
    }
    var changLine = firstDay;
    for(i=1; i<=days; i++){//每一个日期的填充
        if(year == nowDate.getFullYear() && month == nowDate.getMonth()+1 && i == nowDate.getDate()) {
            tagClass = "curDate";
        } 
        else{ 
            tagClass = "isDate";
        }  
        tbodyHtml += "<td class=" + tagClass + ">" + i + "</td>";
        changLine = (changLine+1)%7;
        if(changLine == 0 && i != days){//是否换行填充的判断
            tbodyHtml += "</tr><tr>";
        } 
    }
    var nextStart = 1;
    if(changLine!=0){
        for (i=changLine; i<7; i++) {
            tbodyHtml += "<td class='notDate'>" + nextStart + "</td>";
            nextStart++;
        }
    }  
    tbodyHtml +="</tr>";
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = tbodyHtml;
}

/*判断某年某月某日是星期几，默认日为1号*/
function whatDay(year, month, day=1) {
    var sum = 0;
    sum += (year-1)*365+Math.floor((year-1)/4)-Math.floor((year-1)/100)+Math.floor((year-1)/400)+day;
    for(var i=0; i<month-1; i++){
        sum += monthDay[i];
    }
    if(month > 2){
        if(isLeap(year)){ 
            sum += 29; 
        }
        else{
             sum += 28; 
        }
    }
    return sum%7;
}

/*判断某年是否是闰年*/
function isLeap(year) {
    if((year%4==0 && year%100!=0) || year%400==0){
        return true;
    }
    else{
        return false; 
    }
}

function Jump(){
    var yearIn = document.getElementById('jumpYear');
    var monthIn = document.getElementById('jumpMonth');
    var dayIn= document.getElementById('jumpDay');
    var year = yearIn.value;
    var month = monthIn.value;
    var day = dayIn.value;
    var isMis = 1;
    if(isNaN(year) || isNaN(month) || isNaN(day)){
        alert('请输入有效的数字！');
        yearIn.value = monthIn.value = dayIn.value = '';
        return;
    }
    if(year == ''){
        alert('年份输入不能为空！');
        yearIn.value = '';
        return;
    }
    if(month == ''){
        alert('月份输入不能为空！');
        monthIn.value = '';
        return;
    }
    if(month <1 || month>12){
        alert('月份输入有误！');
        monthIn.value = '';
        return;
    }
    if(day == ''){
        isMis = 0;
    }
    var flag = 0;
    var tDate = new Date();
    showCld(year, month, whatDay(year, month));
    if(month == tDate.getMonth()+1 && year == tDate.getFullYear()){
        addOnclick(1);
        flag = 1;
    }
    else{
        addOnclick(0);
    }
    var dayButtons = document.getElementsByClassName('isDate');
    
    if(flag == 1 && day == tDate.getDate()){
        var curTd = document.getElementsByClassName('curDate')[0];
        curTd.click();
        isMis = 0;
    }
    else{
        for(var i=0;i<dayButtons.length;i++){
            if(dayButtons[i].innerHTML == day){
                dayButtons[i].click();
                isMis = 0;
            }
        }
    }
    if(isMis){
        alert('日期输入有误！已跳转到'+year+'年'+month+'月');
        dayIn.value = '';
        return;
    }
    yearIn.value = '';
    monthIn.value = '';
    dayIn.value = '';
}

function Back(){
    var tDate = new Date();
    var year = tDate.getFullYear();
    var month = tDate.getMonth()+1;
    showCld(year,month,whatDay(year,month));
    addOnclick(1);
    var curTd = document.getElementsByClassName('curDate')[0];
    curTd.click();
}