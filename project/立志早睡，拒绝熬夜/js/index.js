$(function() {
	// 获取元素
	var mainBtn = $(".main-btn");
	var main = $(".main");
	var manifesto = $(".manifesto");
	var textarea = $(".manifesto>textarea");
	// 创建宣言对象的构造函数

	function Oaths(txt, main) {
		this.Object = null;
		this.txt = txt;
	}
	//添加初始化方法
	Oaths.prototype.init = function(top, left) {
		this.top = top || 0;
		this.left = left || 0;
		// 创建p标签
		this.Object = document.createElement("p");
		// 把p标签加入到main中
		main.append($(this.Object));
		// this.Object.appendTo(main);
		// 设置文本内容和标签样式
		$(this.Object).text(this.txt);
		$(this.Object).attr("class", "barr");
		$(this.Object).css({
			position: "absolute",
			color: randomColor(),
			fontSize: randomNum(12, 40),
			top: this.top,
			left: this.left,
			whiteSpace: "nowrap",
			cursor: "pointer"
		});
	}

	// 添加标签移动方法
	Oaths.prototype.move = function() {
		var that = this;
		var time = randomNum(9000, 26000);
		// 获取当前标签的宽度
		var width = $(this.Object).width();
		var height = $(this.Object).height();
		// var that=this;
		// 调用动画方法,移动p标签
		// console.log($(this.Object));
		var current = this.Object;
		$(this.Object).animate({
			left: -width
		}, time, function() {
			$(current).remove();
			// 回调函数初始化标签位置,重新移动
			that.init(randomNum(0, 800 - height), main.width() + width);
			that.move();
		});

	}



	var elements = [
		"学习能力下降",
		"熬夜真的会死人的",
		"内分泌系统紊乱",
		"每天睡5个小时的人比睡6个小时的人,又会增加更多体重",
		"因为熬夜,所以秃了",
		"睡不够会让你掉肌肉",
		"熬夜可以让你变的更丑",
		"心脏病风险增加",
		"每天睡6个小时的人比睡7个小时的人,体重增加的多",
	];
	var objects = [];
	elements.forEach(function(txt, i) {
		objects.push(new Oaths(txt, main));
	});

	objects.forEach(function(obj) {
		obj.init(randomNum(0, 760), randomNum(0, 600));
		obj.move();
	});


	//点击mainBtn显示输入宣言的文本框
	mainBtn.on("click", function() {
		manifesto.css("display", "block");
		textarea.val("请输入您的早睡宣言......");
		textarea.css("color", "#999");
	});

	//点击关闭按钮,隐藏文本框
	manifesto.find("i").on("click", function() {
		manifesto.css("display", "none");
	})

	textarea.on("keyup", function(e) {
		if (e.keyCode != 13) {
			$(".warning").css("display", "none");
			$(this).css("borderColor", "#B1B1B3");
			$(".repe").css("display", "none");
		}
		
		// 获取文本域内文字的个数
		var len = $(this).val().length;
		//可输入文字的个数最大值
		var max = 25;
		len = len > 25 ? 25 : len;
		//截取字符串个数
		$(this).val($(this).val().substr(0, max));
		// 设置提示可输入文字的个数
		manifesto.find("span").text(len + "/" + max);
	}).on("focus", function() {
		$(".repe").css("display", "none");
		// 文本域获取焦点事件
		$(".warning").css("display", "none");
		$(this).css("borderColor", "#B1B1B3");
		if ($(this).val() == "请输入您的早睡宣言......") {
			// 清空文本域的提示内容初始化样式
			$(this).val("");
			$(this).css("color", "#000");
		}
	}).on("keydown", function(event) {
		if (event.keyCode == 13) {
			manifesto.find("button").triggerHandler("click");
			return false;
		}
	})





	var mymakes = [];
	var num = 3231;
	manifesto.find("button").on("click", function() {
			// 提交宣言页面的提交按钮点击事件
			if (mymakes.indexOf(textarea.val()) != -1) {
				$(".repe").css("display", "block");
				textarea.css("borderColor", "red");
			} else {
				var borcor = textarea.css("color");
				if (borcor == "rgb(153, 153, 153)" || textarea.val().length == 0) {
					textarea.css("borderColor", "red");
					$(".warning").css("display", "block");
				} else {
					num++;
					// 创建一个p标签
					var $p = $("<p class='barr' style='border: 1px solid red;'>" + textarea.val() + "</p>");
					pInit($p, main);
					$p.appendTo(main);
					mymakes.push(textarea.val());
					manifesto.css("display", "none");
					textarea.css("color", "#999");
					$(".main-btn i").text("已有" + num + "人准备早睡！");
				}
				myAnimate($p, main);
			}
	});


	// p标签的动画函数

	function myAnimate(ele, main) {
		var time2 = randomNum(5000, 20000);
		var minLeft = $(ele).width();
		$(ele).animate({
			left: -minLeft
		}, time2, function() {
			pInit(ele, main);
			// 递归,调用函数循环产生动画效果
			myAnimate(ele, main);
		});
	}


	// 初始化p标签样式的函数
	function pInit(ele, main) {
		var maxLeft = main.width() + $(ele).width();
		$(ele).css({
			color: randomColor(),
			fontSize: randomNum(12, 40),
			position: "absolute",
			top: randomNum(0, 760),
			left: maxLeft,
			whiteSpace: "nowrap",
			padding: 6,
			cursor: "pointer"
		});
	}


	// 为document注册键盘按下事件
	$(document).on("keydown", function(e) {
		if (e.which == 13) {
			if (manifesto.css("display") == "block") {
				manifesto.find("button").triggerHandler("click");
			}

		}
	}).on("click",function () {
		return false;
	});
	

	// 为弹幕注册鼠标进入和鼠标离开事件

	main.on("mouseenter", ".barr", function() {
		$(this).stop();
		console.log(1);
	}).on("mouseleave", ".barr", function() {
		myAnimate(this, main)
	})


	// 生成随机颜色的函数
	function randomColor() {
		var str = '#';
		for (var i = 0; i < 6; i++) {
			str += Math.floor(Math.random() * 16).toString(16);
		}
		return str;
	}
	//生成随机数的函数
	function randomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
})
