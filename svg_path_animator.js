//Register new UI effect
$.Velocity.RegisterUI('write', {
    defaultDuration: 500,
    calls: [ 
        [ { opacity: 1 }, 0 ],
        [ { strokeDashoffset: 0}, 1 ]	]
});

var AniPath = function(svg_obj, target_class = null)
{
	this.total_length = 0;
	this.sequence = [];
	
	if(!target_class) target_class = 'path';

	//The init/reset function - set strokes and offsets to path lengths
	this.init = function(dur = 3000, del = 0, min_speed = 0)
	{
		var self = this;
		self.total_length = 0;
		self.sequence = [];
		
		$(svg_obj + ' ' + target_class).each(function()
		{
			var element = $(this);
			
			//Start hidden
			element.css('opacity', 0);
			
			//Calculate lengths
			element.attr('data-length', this.getTotalLength());
			self.total_length += Math.round(element.attr('data-length'));
			
			//Initialize dashes (which are animated to create signature effect)
			element.attr({'stroke-dasharray': element.attr('data-length'), 'stroke-dashoffset': element.attr('data-length')});
		});
		
		//Set duration percentages and load animation sequence
		$(svg_obj + ' ' + target_class).each(function(index)
		{	
			var element = $(this);
			
			var indi_duration;
			var indi_delay;
			
			if(!element.attr('data-speed'))
			{
				//Get percentage of total length for each path element
				if(indi_duration < min_speed) indi_duration = min_speed;
				else
					indi_duration = (Math.round(element.attr('data-length')/self.total_length * 100)/100) * dur;

				console.log(indi_duration);
			}
			else
				indi_duration = element.attr('data-speed');
			
			if(!element.attr('data-delay'))
			{
				indi_delay = 100;
				if(!index) indi_delay = del;
			}
			else
				indi_delay = element.attr('data-delay');

			//Load up animation sequence
			self.sequence.push({e: element, p: 'write', o: {duration: indi_duration, delay: indi_delay, easing: 'none'}});
		});		
	}
	
	this.animate = function()
	{
		$.Velocity.RunSequence(this.sequence);
	}
};