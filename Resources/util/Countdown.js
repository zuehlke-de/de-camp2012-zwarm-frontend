// initiate new timer object (licensed MIT. copyright Daniel Tamas http://rborn.info)

        
        var countDown =  function( m , s, fn_tick, fn_end  ) {
                return {
                        total_sec:m*60+s,
                        timer:this.timer,
                        set: function(m,s) {
                                this.total_sec = parseInt(m)*60+parseInt(s);
                                this.time = {m:m,s:s};
                                return this;
                        },
                        start: function() {
                                var self = this;
                                this.timer = setInterval( function() {
                                        if (self.total_sec) {
                                                self.total_sec--;
                                                self.time = { m : parseInt(self.total_sec/60), s: (self.total_sec%60) };
                                                fn_tick();
                                        }
                                        else {
                                                self.stop();
                                                fn_end();
                                        }
                                        }, 1000 );
                                return this;
                        },
                        stop: function() {
                                clearInterval(this.timer);
                                this.time = {m:0,s:0};
                                this.total_sec = 0;
                                return this;
                        }
                };
        };    
        
        
        var timeString = function (timer){
        	if(timer.time.s<10){
        		return timer.time.m + ":0" + timer.time.s;
        	}
        	return timer.time.m+":"+timer.time.s;
        }  
        




