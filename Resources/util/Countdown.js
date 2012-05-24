// initiate new timer object (licensed MIT. copyright Daniel Tamas http://rborn.info)
var CountDown =  function( m , s, fn_tick, fn_end ) {
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
                },
                toString: function() {
                	var tempM = Math.floor(this.total_sec / 60);
                	var tempS = this.total_sec % 60;
            		if(tempS<10){
						return tempM + ":0" + tempS;
					}
					return tempM+":"+tempS;
                }
        };
};