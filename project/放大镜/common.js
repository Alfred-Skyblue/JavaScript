/**
 * 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 */
function getDates(dt) {
	var str = ""; //存储时间的字符串
	//获取年
	var year = dt.getFullYear();
	//获取月
	var month = dt.getMonth() + 1;
	//获取日
	var day = dt.getDate();
	//获取小时
	var hour = dt.getHours();
	//获取分钟
	var min = dt.getMinutes();
	//获取秒
	var sec = dt.getSeconds();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;
	str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
	return str;
}



/**
 * 根据id属性值，返回对应的元素
 * 参数是id属性值
 * @param {Object} id
 */
function my$(id) {
	return document.getElementById(id);
}


/**
 * 获取指定id值下面的所有指定子元素
 * 返回值是存储所有指定子元素的数组
 * @param {Object} label
 */
function me$(id, sun) {
	return document.getElementById(id).getElementsByTagName(sun);
}

/**
 * 设置任意标签内的任意文本内容
 * element=标签名
 * text=文本内容
 * @param {Object} element 标签名
 * @param {Object} text	文本内容
 */
function setInnerText(element, text) {

	//判断浏览器是否支持这个属性
	if (typeof element.innerText == "undefined") { //不支持这个属性
		element.innerContent = text;
	} else { //支持这个属性
		element.innerText = text;
	}
}


/**
 * 获取任意标签的文本内容
 * @param {Object} element 标签名
 */
function getInnerText(element) {
	if (typeof element.textContent == "undefined") {
		return element.innerText;
	} else {
		return element.textContent;
	}
}


/**
 * 获取任意一个父级元素的第一个子级元素
 * @param {Object} element
 */
function getFirstElementChild(element) {
	if (element.firstElementChild) { //如果为true则支持
		return element.firstElementChild;
	} else {
		var node = element.firstChild; //为了兼容其他浏览器，所以这里需要获取元素的第一个子节点
		while (node && node.nodeType != 1) { //判断这个节点是不是标签，如果不是标签，则寻找下一个节点
			node = node.nextSibling;
		}
		return node;
	}
}

/**
 * 获取任意一个父级元素的最后一个子级元素
 * @param {Object} element
 */

function getLastElementChild(element) {
	if (element.lastElementChild) { //如果为true则支持
		return element.lastElementChild;
	} else {
		var node = element.lastChild; //为了兼容其他浏览器，这里需要获取最后一个子节点
		while (node && node.nodeType != 1) { //判断这个节点是不是标签，如果不是标签，则寻找上一个节点
			node = node.previousSibling;
		}
		return node;
	}
}


/**
 * 为元素绑定多个事件的兼容性代码
 * 参数是：元素,事件类型,函数表达式
 * @param {Object} element
 * @param {Object} type
 * @param {Object} fn
 */
function addEventListener(element, type, fn) {
	if (element.addEventListener) {
		element.addEventListener(type, fn, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + type, fn);
	} else {
		element["on" + type] = fn;
	}
}

/**
 * 为元素解绑任意事件的兼容性代码
 * 参数是：元素,事件类型,函数表达式
 * @param {Object} element
 * @param {Object} type
 * @param {Object} fn
 */
function removeEventListener(element, type, fn) {
	if (element.removeEventListener) {
		element.removeEventListener(type, fn, false);
	} else if (element.detachEvent) {
		element.detachEvent("on" + type, fn);
	} else {
		element["on" + type] = null;
	}
};

/**
 * scrloo函数
 * 属性left、top
 */
function getScroll() {
	return {
		left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
		top: window.pageYoffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
	};
}



/**
 * 获取计算后的样式属性值
 * 任意一个元素的任意的样式属性值
 * 返回值是字符串类型
 * 
 * @param {Object} element
 * @param {Object} attr
 */
function getStyle(element, attr) {
	//判断浏览器是否支持这个方法	
	return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}



/**
 * 为任意元素的任意属性设置缓动动画效果设置回调函数
 * 参数为(元素、对象、回调函数)
 * 
 * @param {Object} element
 * @param {Object} json
 * @param {Object} fn
 */
function animate(element, json, fn) {
	//先清理定时器
	clearInterval(element.timeId);
	element.timeId = setInterval(function() {
		//默认假设全部到达目标
		var flag = true;
		//遍历json对象中的每个属性,和属性对应的目标值
		for (var attr in json) {
			//判断attr中的属性是不是opacity
			if (attr == "opacity") {
				//获取元素当前的透明度,把它放大100倍
				var current = getStyle(element, attr) * 100;
				//目标透明度放大100倍
				var target = json[attr] * 100
				//缓速移动公式
				var step = (target - current) / 10;
				// 判断走正数还是负数
				step = step > 0 ? Math.ceil(step) : Math.floor(step);

				current += step;
				element.style[attr] = current / 100;
			} else if (attr == "zIndex") {
				//判断attr中的属性是不是zIndex,如果是zIndex,那么让它的值,直接等于目标值
				element.style[attr] = json[attr]
			} else {
				//普通的属性
				//获取元素的目标值
				var target = json[attr];
				// 获取元素当前对应属性的值
				var current = parseInt(getStyle(element, attr))
				//缓速移动公式
				var step = (target - current) / 10;
				// 判断走正数还是负数
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				//每次移动到的位置
				current += step;
				//移动到目标位置
				element.style[attr] = current + "px";
			}
			//判断是否到达目标
			if (current != target) {
				flag = false;
			}
		}
		if (flag) {
			// 清理定时器
			clearInterval(element.timeId);
			if (fn) {
				//判断有没有传入回调函数,如果有,则调用这个函数
				fn();
			}
		}
		// 测试代码
		console.log("目标位置：" + target + "，当前位置：" + current + "，每次移动的步数：" + step);
	}, 20)
}


/**
 * 图片跟着鼠标飞的兼容性代码
 */
var evt = {
	// window.event和事件处理参数对象e的兼容性代码
	getEvent: function(evt) {
		return window.event || evt;
	},
	// 可视区域横坐标的兼容代码
	getClientX: function(evt) {
		return this.getEvent(evt).clientX;
	},
	// 可视区域纵坐标的兼容代码
	getClientY: function(evt) {
		return this.getEvent(evt).clientY;
	},
	// 页面向左卷曲出去的横坐标
	getScrollLeft: function() {
		return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
	},
	//页面向上卷曲出去的纵坐标
	getScrollTop: function() {
		return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
	},
	//相对于页面的横坐标(pageX或者是clientX+scrollLeft)
	getPageX: function(evt) {
		return this.getEvent(evt).pageX ? this.getEvent(evt).pageX : this.getClientX(evt) + this.getScrollLeft();
	},
	//相对于页面的纵坐标(pageY或者是clientY+scrollTop)
	getPageY: function(evt) {
		return this.getEvent(evt).pageY ? this.getEvent(evt).pageY : this.getClientY(evt) + this.getScrollTop();
	}


}
