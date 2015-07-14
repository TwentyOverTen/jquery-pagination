//-------------------------------------------------
//		Quick Pager jquery plugin
//		Created by dan and emanuel @geckonm.com
//		www.geckonewmedia.com
// 
//
//		18/09/09 * bug fix by John V - http://blog.geekyjohn.com/
//		1.2 - allows reloading of pager with new items
//-------------------------------------------------

(function($) {
	    
	$.fn.pagination = function(options) {
	
		var defaults = {
			pageSize: 5,
			currentPage: 1,
			holder: null,
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
			var pageNav = '<ul class="pagination"><li class="prev-page inactive"><a rel="1" href="#">Prev Page</a></li>';	
			for (i=1;i<=pageCounter;i++){
				if (i==options.currentPage) {
					pageNav += '<li class="active pager-'+i+'"><a rel="'+i+'" href="#">'+i+'</a></li>';	
				}
				else {
					pageNav += '<li class="pager-'+i+'"><a rel="'+i+'" href="#">'+i+'</a></li>';
				}
			}
			pageNav += '<li class="next-page"><a rel="2" href="#">Next Page</a></li></ul>';
			
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

				if($(this).parent().hasClass('inactive')) {
					return;
				}
					
				//grab the REL attribute 
				var clickedLink = parseInt($(this).attr('rel'));
				var prevPage = clickedLink - 1;
				var nextPage = clickedLink + 1;
				options.currentPage = clickedLink;
				
				//update prev/next buttons
				selector.parent().find('.prev-page, .next-page').removeClass('inactive');
				if(clickedLink == 1) {
					selector.parent().find('.prev-page').addClass('inactive');
				} else if (clickedLink == pageCounter) {
					selector.parent().find('.next-page').addClass('inactive');
				}
				selector.parent().find('.prev-page a').attr('rel', prevPage);
				selector.parent().find('.next-page a').attr('rel', nextPage);
				
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


