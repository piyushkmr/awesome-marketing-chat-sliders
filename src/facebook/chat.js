$.fn.chatSlider=function(options){
	var settings=$.extend({
		type:"mobile"
	}.options);
	this.addClass('browser chrome');
	var chat_browser='<div class="browser-message-content">'+
							'<div class="browser-message-inner">'+
						
							'</div>'+
						'</div>';
	var chat_mobile='<div class="mobile iphone6">'+
						'<div class="message-body">'+
							'<div class="profile">'+
								'<div class="top-bar">'+
									'<div class="profile-dp"></div>'+
									'<div class="profile-name">GREIO</div>'+
								'</div>'+
								'<div class="bottom-bar">'+
									'<div class="profile-action">'+
										'<iframe src="https://www.facebook.com/v2.3/plugins/like.php?href=http://facebook.com/GREInsideOut&layout=button&locale=en_US&sdk=joey&share=false&show_faces=false" width="50" height="20" frameborder="no" style="float:left">'+
										'</iframe>'+
									'</div>'+
								'</div>'+
							'</div>'+
							'<div class="message-content">'+
								'<div class="message-inner">'+
								
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
	if(settings.type=="mobile")
		this.html(chat_mobile);
	else if(settings.type=="browser")
		this.html(chat_browser);
	else
		this.html(chat_browser+chat_mobile);
	function injectMessage(count){
		var count_new=count%message.length;
		var template='<div class="single-post" style="max-height:0; overflow:hidden">'+
						'<div class="message-header">'+
							'<a href="'+pageURL+'" target="_blank"><div class="profile-dp" style="background-image:url(\''+profileLogo+'\')"></div>'+
							'<div class="profile-name">'+profileName+
							'<div class="post-time">1 min ago</div></div></a>'+
						'</div>'+
						'<div class="message-text">'+message[count_new].message+
						'</div>'+
						'<div class="message-stats">'+
							'<span class="message-likes">'+(Math.floor(Math.random()*400-100)+100)+'</span> Likes &nbsp;&nbsp;'+
							'<span class="message-comments">'+(Math.floor(Math.random()*50-10)+10)+'</span> Comments'+
						'</div>'+
						'<div class="message-footer">'+
							'<div class="message-like"><i class="fb-action fb-like like-dynamic"></i><i class="fb-action fb-like"></i>Like</div>'+
							'<div class="message-comment"><i class="fb-action fb-comment"></i>Comment</div>'+
							'<div class="message-share"><i class="fb-action fb-share"></i>Share</div>'+
						'</div>'+
						'<div style="clear:both"></div>'+
					'</div>';
		$('.message-inner').append(template).find('.single-post').animate({'max-height':'350px'},1000,function(){
			slideUp();
		});
		$('.browser-message-inner').append(template).find('.single-post').animate({'max-height':'350px'},1000,function(){
			slideUp();
		});
		if($('.message-inner .single-post').length>3){
			/*$('.message-inner .single-post').eq(0).animate({'height':0,'margin':0,'padding':0},500,function(){
				$(this).remove();
				slideUp();
			});
			$('.browser-message-inner .single-post').eq(0).animate({'height':0,'margin':0,'padding':0},500,function(){
				$(this).remove();
				slideUp();
			});*/
			$('.message-inner .single-post').eq(0).remove();
			$('.browser-message-inner .single-post').eq(0).remove();
			slideUp();
		}
		else slideUp();
		/**
		 * Slide the posts up if they fill up the space
		 */
		function slideUp(){
			var message_height_diff=$('.message-inner').height()-$('.message-content').height();
			var b_message_height_diff=$('.browser-message-inner').height()-$('.browser-message-content').height();
			if(message_height_diff>0)
				$('.message-inner').css({'bottom':0});
				//$('.message-inner').animate({'top':-message_height_diff},500);
			if(b_message_height_diff>0)
				$('.browser-message-inner').css({'bottom':0});
				//$('.browser-message-inner').animate({'top':-b_message_height_diff},500);*/
		}
		slideImg(count_new);
	}
	$(document).ready(function(){
		var start_count=0;//Math.floor(Math.random() * message.length)
		//insert first post as sooon as the user arrives
		injectMessage(start_count);
		(function loop(count){
			var count = ++count || ++start_count%message.length;
			var rand = 3000;//Math.round(Math.random() * (15000 - 3000)) + 3000;
			setTimeout(function() {
				injectMessage(count);
				loop(count);
			}, rand);
		}());
		//function for increasing likes on any random post every random second
		(function likeloop(count){
			var count = ++count || 0;
			var rand = Math.round(Math.random() * (2000 - 500)) + 500;
			setTimeout(function() {
				var eq=Math.floor(Math.random()*$('.browser .single-post').length);
				if($('.single-post').length)
				likeInc(eq);
				likeloop(count);
			}, rand);
		}());
		//browser height tweak
	});
	$(window).on('load resize',function(){
		$('.browser').height($('.browser').width()*0.7);
	});
	/**
	 * Function for incresing like on any post of given index
	 * @params {integer} The index of the post to be liked
	 * @returns {void}
	 */
	function likeInc(index){
		var like=$('.mobile .single-post').eq(index).find('.like-dynamic');
		var like_b=$('.browser .single-post').eq(index).find('.like-dynamic');
		//like.css({'transform':'scale(2,2)','opacity':0,'transition':'0.5s'});
		like.addClass('like-thumping');
		like_b.addClass('like-thumping');
		setTimeout(function() {
			like.removeClass('like-thumping');
			like_b.removeClass('like-thumping');
			//like.css({'transform':'scale(1,1)','opacity':1,'transition':'0s'})
		}, 500);
		var mob_message_likes=$('.mobile .single-post').eq(index).find('.message-stats .message-likes');
		var message_likes=$('.browser .single-post').eq(index).find('.message-stats .message-likes');
		mob_message_likes.html(parseInt(message_likes.html())+1);
		message_likes.html(parseInt(message_likes.html())+1);
	}
	function slideImg(index){
		var type=new Array("Daily Verbal Questions","Inspirational Images","Logical Questions");
		$('.current-text').fadeToggle(1000,function(){
			$(this).html(type[index%3]).fadeToggle(1000);
		});
		$('.current-image').fadeToggle(1000,function(){
			//edit this line to introduce more than 3 images
			$(this).html(message[index%3].message).fadeToggle(1000);
		});
	}
	return this;
}