$(function() {
	$('.misparkursremarks').each(function(){
		var c = $(this);
		if (c.text().length!=5) return;
		c.wrapAll($('<a/>').attr('href','http://www.openu.ac.il/courses/'+c.text()+'.htm'));
	});
	$('.heara').each(function(){
		var s = $(this);
		var d = $('<p/>').html(
			$('td:has(.remarksnumbers:contains('+s.text().trim()+')):first + td > .remarks').html()
		);
		s.prepend($('<div/>').append(d))
			.hover(function() { d.fadeIn(); }, function() { d.fadeOut(); });
	});
});