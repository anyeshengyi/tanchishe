//获取元素 页面加载
function $(sel,obj){
	var obj = obj || document;

	
	if (typeof sel == "function") {
		window.onload=function(){
			sel();
		}
	}else if (typeof sel == "string") {
		if (sel.charAt(0) == ".") {
			return getClass(sel.slice(1),obj);
		}else if (sel.charAt(0) == "#") {
			return obj.getElementById(sel.slice(1));
		}else if (/^[a-z|1-6]{1,10}$/g.test(sel)){
			return obj.getElementsByTagName(sel);
		}else{
			console.error("非法输入");
		}
	}
}
//通过类名获取元素
function getClass(sel,obj){
	var obj=obj||document
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(sel);
	}else{
		var newarr=[];
		var arr=obj.getElementsByTagName("*");
		for(var i=0;i<arr.length;i++){
			var str=arr[i].className;
			if(cheak(str,sel)){
				newarr.push(arr[i]);
			}
		}
		return newarr;
	}
}
function cheak(sel1,sle2){
	var dd=sel1.split(" ");
	for(var i=0;i<dd.length;i++){
		if(dd[i]==sel2){
			return true;
		}
		
	}
	return false;
}



//获取或设置元素的文本内容
function getText(obj,value){
		if(value=undefined){
			if(obj.innerText){
				return obj.innerText
			}else{
				return obj.textContent;
			}			
		}else{
			if(obj.innerText){
				obj.textContent=value;
			}else{
				obj.innerText=value;
			}
		}
	}


//获取元素的样式
	function getStyle(obj,prop){
		if(obj.currentStyle==undefined){
			return window.getComputedStyle(obj,null)[prop];
		}else{
			return obj.currentStyle[prop];
		}
	}
	// alert(getStyle(aa,"width"));


//选项卡

function zuodao(lan,xiang){
	for(let i=0;i<lan.length;i++){
 	lan[i].onmouseover=function(){
 		xiang[i].style.display="block";
		
		}

	lan[i].onmouseout=function(){
		xiang[i].style.display="none";
		
	}
	xiang[i].onmouseover=function(){
		xiang[i].style.display="block";
		
	}
	xiang[i].onmouseout=function(){
		xiang[i].style.display="none";
		
	}
	}	
}

//轮播
function lunbo(obj,prop,da,zuo,you){
	var num=0;
	
	var t=setInterval(move,2000);
	function move(){
		num++;
		if(num<0){
			num=prop.length-1;
		}
		if(num==prop.length){
			num=0;
		}
		for(let i=0;i<obj.length;i++){
			
				animate(prop[i],{opacity:0});
				obj[i].style.background="red";
			
		}
		animate(prop[num],{opacity:1});
		obj[num].style.background="black";
		
	}
	da.onmouseover=function(){
		clearInterval(t);
	}
	da.onmouseout=function(){
		t=setInterval(move,2000);
	}
	
	for(var j=0;j<obj.length;j++){
		obj[j].index=j;
		obj[j].onmouseover=function(){
			num=this.index-1;
			move();		
		}		
	}
	you.onclick=function(){
		move();
	}
	zuo.onclick=function(){
		num=num-2;
		move();
	}
}



//获取所有子节点
	
	function getEleChild(obj){
		var aa=[];
		var bb=obj.childNodes;
		// console.log(obj.childNodes);
		for(var i=0;i<bb.length;i++){
			if(bb[i].nodeType==1){
				 
				 aa.push(bb[i])
			}
		}
		return aa;
	}


//获取下一个子元素节点
	function nextSiblingEle(obj){
		var next=obj.nextSibling;
		if(next==null){
			return null;
		}
		while(next.nodeType!=1 ){
			next=next.nextSibling;
			if(next==null){
				return null;
			}
		}
		return next;
	}
//获取上一个子元素节点
	function preSiblingEle(obj){
		var pre=obj.previousSibling;
		if(pre==null){
			return null;
		}
		while(pre.nodeType!=1){
			pre=pre.previousSibling;
			if(pre==null){
				return null;
			}
		}
		return pre;
	}
//获取最后一个子元素节点
	function lastEleChild(obj){
		return getEleChild(obj)[getEleChild(obj).length-1];
	}
//获取第一个子元素节点
	function firstEleChild(obj){
		return getEleChild(obj)[0];
	}
//在zi2后追加zi5
	function insertAfter(obj,pre){
		var fu=pre.parentNode;
		var next=nextSiblingEle(pre);
		if(next==null){
			fu.appendChild(obj);
		}else{
			fu.insertBefore(obj,next)
		}
	}
//获取尺寸
function offsetWindow(){
		var x=document.documentElement.clientWidth;
		var y=document.documentElement.clientWidth;
		return {width:x,height:y}
	}

//obj到浏览器页面的距离
function getPosition(obj){
		var x=obj.offsetLeft
		var y=obj.offsetTop

		var fu=obj.parentNode;
		// var style=getStyle(fu,"position");
		while(fu.nodeName=="BODY"){
			if(getStyle(fu,"position")=="absolute"||getStyle(fu,"position")=="relative"){
				x+=parseInt(getStyle(fu,"borderLeftWidth"));
				x+=fu.offsetLeft;
				x+=parseInt(getStyle(fu,"borderTopWidth"));
				x+=fu.offsetTop;
			}
			fu=fu.parentNode;
		}
		return {top:y,left:x}
	}


//滚轮上滚与下滚各执行函数
function mouseWheel(obj,shang,xia){
		obj.addEventListener("mousewheel",scrollFn,false);
		obj.addEventListener("DOMMouseScroll",scrollFn,false);
		function scrollFn(e){
			if(e.wheelDelta){
				if(e.wheelDelta>0){
					shang()
				}else{
					xia()
				}
			}else{
				if(e.detail<0){
					shang();
				}else{
					xia();
				}
			}
		}
	}