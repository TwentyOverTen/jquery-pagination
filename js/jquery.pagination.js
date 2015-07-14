//-------------------------------------------------
//		Jquery Pagination
//		Enhanced & Simplified by nick dimatteo
//		Originally Created by dan and emanuel @geckonm.com
//		www.geckonewmedia.com
//-------------------------------------------------

(function($) {
	    
	$.fn.pagination = function(options) {
	
		var defaults = {
			pageSize: 5,
			currentPage: 1,
			holder: null,
			prevNext: true,
			pagerLocation: 'after'
		};
		
		var options = $.extend(defaults, options);
		
		
		return this.each(function() {
	
						
			var selector = $(this);	
			var pageCounter = 1;
			
			selector.wrap('<div class="pagination-wrapper"></div>');
			
			selector.parents('.pagination-wrapper').find('ul.pagination').remove();
			
			selector.children().each(function(i){ 
					
				if(i < pageCounter*options.pageSize && i >= (pageCounter-1)*options.pageSize) {
				$(this).addClass('page-'+pageCounter);
				}
				else {
					$(this).addClass('page-'+(pageCounter+1));
					pageCounter ++;
				}	
				
			});
			
			// show/hide the appropriate regions 
			selector.children().hide();
			selector.children('.page-'+options.currentPage).show();
			
			if(pageCounter <= 1) {
				return;
			}
			
			//Build pager navigation
			var pageNav = '<ul class="pagination">';	
			// show prev
			if(options.prevNext) {
				pageNav += '<li class="prev-page disabled"><a rel="1" href="#">Prev Page</a></li>';
			}
			for (i=1;i<=pageCounter;i++){
				if (i==options.currentPage) {
					pageNav += '<li class="active pager-'+i+'"><a rel="'+i+'" href="#">'+i+'</a></li>';	
				}
				else {
					pageNav += '<li class="pager-'+i+'"><a rel="'+i+'" href="#">'+i+'</a></li>';
				}
			}
			// show next
			if(options.prevNext) {
				pageNav += '<li class="next-page"><a rel="2" href="#">Next Page</a></li>';
			}
			pageNav += '</ul>';
			
			if(!options.holder) {
				switch(options.pagerLocation)
				{
				case 'before':
					selector.before(pageNav);
				break;
				case 'both':
					selector.before(pageNav);
					selector.after(pageNav);
				break;
				default:
					selector.after(pageNav);
				}
			}
			else {
				$(options.holder).append(pageNav);
			}
			
			//pager navigation behaviour
			selector.parent().find('.pagination a').on('click', function(e) {
				e.preventDefault();

				if($(this).parent().hasClass('disabled')) {
					return;
				}
					
				//grab the REL attribute 
				var clickedLink = parseInt($(this).attr('rel'));
				var prevPage = clickedLink - 1;
				var nextPage = clickedLink + 1;
				options.currentPage = clickedLink;
				
				//update prev/next buttons
				if(options.prevNext) {
					selector.parent().find('.prev-page, .next-page').removeClass('disabled');
					if(clickedLink == 1) {
						selector.parent().find('.prev-page').addClass('disabled');
					} else if (clickedLink == pageCounter) {
						selector.parent().find('.next-page').addClass('disabled');
					}
					selector.parent().find('.prev-page a').attr('rel', prevPage);
					selector.parent().find('.next-page a').attr('rel', nextPage);
				}
				
				if(options.holder) {
					$(this).parent('li').parent('ul').parent(options.holder).find('li.active').removeClass('active');
					$(this).parent('li').parent('ul').parent(options.holder).find('a[rel="'+clickedLink+'"]').parent('li').addClass('active');
				}
				else {
					//remove current current (!) page
					$(this).closest('ul').find('li.active').removeClass('active');
					//Add current page highlighting
					$(this).closest('ul').find('a[rel="'+clickedLink+'"]').parent('li').addClass('active');
				}
				
				//hide and show relevant links
				selector.children().hide();			
				selector.find('.page-'+clickedLink).show();
			});
		});
	}
	

})(jQuery);


