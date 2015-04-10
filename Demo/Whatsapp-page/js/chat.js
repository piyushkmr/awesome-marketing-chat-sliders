$.fn.chatslider=function(){
	this.html('<div class="message-body">'+
                        '<div class="profile">'+
                            '<div class="profile-top"></div>'+
                            '<div class="back-arrow"></div>'+
                            '<div class="profile-dp"></div>'+
                            '<div class="profile-name">'+groupName+'</div>'+
                            '<div class="group-members"></div>'+
                        '</div>'+
                        '<div class="message-content">'+
                            '<div class="message-inner"></div>'+
                        '</div>'+
                    '</div>');
	shuffle(users);
	users[0]=groupName;
	/**
	 * Function to show group members in header of whatsapp.
	 */
	function groupMembers(){
		var group_mem="";
		var i=1;
		while(1){
			group_mem+=users[i++]+", ";
			if(group_mem.length>24) break;
		}
		group_mem=group_mem.substring(0,group_mem.length-2)+"..."
		$('.group-members').html(group_mem);
	}
	function injectMessage(count){
		var count_new=count%chat.length;
		var time=new Date();
		//AM|PM condition
		if(time.getHours() >= 12)var ampm="PM";
		else var ampm="AM";
		if(chat[count_new].user=='0') var addclass=" right";
		else var addclass='';
		var template='<div class="single-message'+addclass+'" style="max-height:0;opacity:0">'+
			'<div class="user" style="color:'+colors[chat[count_new].user]%colors.length+'">'+users[chat[count_new].user]+'</div>'+
			'<hr class="user-under"/>'+
			'<div class="message">'+chat[count_new].message+'</div>'+
			'<div class="time">'+time.getHours()%12+':'+time.getMinutes()+' '+ampm+'</div>'+
			'</div>';
		$('.message-inner').append(template).find('.single-message').animate({'max-height':'200px','opacity':'1'},1000,function(){
			slideUp();
		});
		if($('.message-inner .single-message').length>12){
			$('.message-inner .single-message').eq(0).remove();
			slideUp();
		}
		else slideUp();
		
		function slideUp(){
			var message_height_diff=$('.message-inner').height()-$('.message-content').height();
			if(message_height_diff>0)
				$('.message-inner').css({'bottom':0});
		}
	}
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;
		while (0 !== currentIndex) {
	    	randomIndex = Math.floor(Math.random() * currentIndex);
	    	currentIndex -= 1;
	    	temporaryValue = array[currentIndex];
	    	array[currentIndex] = array[randomIndex];
	    	array[randomIndex] = temporaryValue;
		}
		return array;
	}

	$(document).ready(function(){
		groupMembers();
		injectMessage(0);
		(function loop(count){
			var count = ++count || 1;
			var rand = Math.round(Math.random() * (4000 - 1000)) + 1000;
			setTimeout(function() {
				injectMessage(count);
				loop(count);
			}, rand);
		}());
		var time=new Date();
		$('.profile-top').html(formatAMPM(time));
	});
	/**
	 *Function to show AM PM formatted time in top bar of the phone
	 */
	function formatAMPM(date) {
	  	var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
			return strTime;
	}
	setInterval(function(){
		var time=new Date();
		$('.profile-top').html(formatAMPM(time));
	},30000);
}