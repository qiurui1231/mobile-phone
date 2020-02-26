//获取元素

var getEle = function (selector) {
	return	document.querySelector(selector);
}

var getAllElem = function (selector) {
	return  document.querySelectorAll(selector);
}

//获取元素样式

var	getCls = function (element) {
	return	element.getAttribute('class');
}
//设置元素样式
var setCls = function (element,cls) {
	return element.setAttribute('class',cls)
}
//为元素添加类
var addCls = function (element,cls) {
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) ===-1 ) {
		setCls(element,baseCls+' '+cls)
	}
}

//为元素删除类

var delCls = function (element,cls) {
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) !==-1 ) {
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '))
	}
}

// 第一步  初始化样式
var screenAnimateElement={
	'.screen-1':[
	'.screen-1_heading',
	'.screen-1_phone',
	'.screen-1_shadow',
	],
	'.screen-2':[
	'.screen-2_heading',
	'.screen-2_phone',
	'.screen-2_subheading',
	'.screen-2_point_i_1',
	'.screen-2_point_i_2',
	'.screen-2_point_i_3',
	],
	'.screen-3' : [
	'.screen-3_heading',
	'.screen-3_phone',
	'.screen-3_subheading',
	'.screen-3_features',
	],
	'.screen-4' : [
	'.screen-4_heading',
	'.screen-4_subheading',
	'.screen-4_type_item_i_1',
	'.screen-4_type_item_i_2',
	'.screen-4_type_item_i_3',
	'.screen-4_type_item_i_4',
	],
	'.screen-5' : [
	'.screen-5_heading',
	'.screen-5_subheading',
	'.screen-5_bg',
	]
}

var setScreenAnimate =function (screenClass) {
	var screen = document.querySelector(screenClass);
	var animateElements = screenAnimateElement[screenClass];

	for (var i = 0; i < animateElements.length; i++) {
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');
				// console.log(baseCls);
				element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init')
			}
}
  
var playScreenAnimateDone = function (screenClass) {
	var screen = document.querySelector(screenClass);
	var animateElements = screenAnimateElement[screenClass];

	for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');
				element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'))
			}
}

window.onload = function () {
	for(k in screenAnimateElement){
		if (k ==='.screen-1') {
			continue;
		}
		setScreenAnimate(k);
}
}

// 第二步  滚动到哪里  执行到哪里
setTimeout(function(){playScreenAnimateDone('.screen-1');},200)

var navItems = getAllElem('.header_nav_item');
var outlineItems = getAllElem('.outline_item');

var  swichNavitemsActive = function (idx) {
	for (var i = 0; i < navItems.length; i++) {
		delCls(navItems[i],'header_nav_item_status_active');
	}
		addCls(navItems[idx],'header_nav_item_status_active');
		
	for (var i = 0; i < outlineItems.length; i++) {
		delCls(outlineItems[i],'outline_item_status_active');
	}
		addCls(outlineItems[idx],'outline_item_status_active');
}
// 侧栏滚动
window.onscroll =function () {
	var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	swichNavitemsActive(0)
	if (top > 80) {
		addCls(getEle('.header'),'header_status_back')
		addCls(getEle('.outline'),'outline_status_in')
	}else{
		delCls(getEle('.header'),'header_status_back')
		delCls(getEle('.outline'),'outline_status_in')
	}

	// if (top > 1) {
	// 	playScreenAnimateDone('.screen-1');
	// }
	if (top > 800*1 -100) {
		playScreenAnimateDone('.screen-2');
		swichNavitemsActive(1)
	}  
	if (top > 800*2 -100) {
		playScreenAnimateDone('.screen-3');
		swichNavitemsActive(2)
	}
	if (top > 800*3 -100) {
		playScreenAnimateDone('.screen-4');
		swichNavitemsActive(3)

	}
	if (top > 800*4 -100) {
		playScreenAnimateDone('.screen-5');
		swichNavitemsActive(4)

	}
}

// 双向定位


var setNavjump = function (i,lib) {
	var  item = lib[i];
	item.onclick =function () {
		console.log(i);
		// alert(this.innerHTML);
	 if(document.body.scrollTop){
		document.body.scrollTop = i*800 ;
	 }else{
		document.documentElement.scrollTop = i*800 ;

	 }

	
	}
}

for (var i = 0; i < navItems.length; i++) {
	setNavjump(i,navItems)
}

for (var i = 0; i < outlineItems.length; i++) {
	setNavjump(i,outlineItems)
	
}

// 滑动门特效
  var navTip = getEle('.header_nav_tip');
  var setTip =function (idx,lib) {
  	lib[idx].onmouseover =function () {
  		// console.log(this,idx)
		   navTip.style.left = (idx*70) + 'px';

		//   if(navTip.style.left == 350+'px'){
		// 	//   console.log(111)
		// 	navTip.style.width = 100+'px';
		//   }else if(!navTip.style.left == 350+'px'){
		// 	navTip.style.width = 30+'px';

		//   }
  	}
  		var  idxActive = 0;

  	lib[idx].onmouseout =function () {
  		console.log(this,idx);
  		for (var i = 0; i < lib.length; i++) {
  			if (getCls(lib[i]).indexOf('header_nav_item_status_active') > -1) {
  			idxActive = i;
  			break;
  		}
  		}
  		console.log(idxActive);
  		navTip.style.left = (idxActive * 70) + 'px';
  	}
  }


  for (var i = 0; i < navItems.length; i++) {
  		setTip(i,navItems)
  }

  // setTimeout(function () {
  // 	playScreenAnimateDone('.screen-1');
  // },300)