module.exports = (function () {

    var defaults = {}
    window.window.$.fn.pos = function(options) {
        //define instance for use in child functions
        var $this = $(this);
	var data = {
		scan: '',
		swipe: ''
	};
        //set default options
        defaults = {
            scan: true,
	    submit_on_scan: false,
            swipe: true,
	    submit_on_swipe: false,
            events: {
                scan: {
                    barcode: 'scan.pos.barcode'
                },
                swipe: {
                    card: 'swipe.pos.card'
                }
            },
            regexp: {
                scan: {
                    barcode: '\\d+'
                },
                swipe: {
                    card: '\\%B(\\d+)\\^(\\w+)\\/(\\w+)\\^\\d+\\?;\\d+=(\\d\\d)(\\d\\d)\\d+\\?'
                }
            },
            prefix: {
                scan: {
                    barcode: ''
                },
                swipe: {
                    card: ''
                }
            }
        };
        //extend options
        $this.options = window.$.extend(true, {}, defaults, options);

        $this.keypress(function(event) {
            if ($this.options.scan) {
                if (event.which == 13) {
                    if( !$this.options.submit_on_scan ){
			event.preventDefault();
		    }
                    var scanexp = new RegExp('^' + $this.options.prefix.scan.barcode + $this.options.regexp.scan.barcode + '$');
                    if (data.scan.match(scanexp)) {
                        $this.trigger({
                            type: $this.options.events.scan.barcode,
                            code: data.scan,
                            time: new Date()
                        });
                    }
                    data.scan = '';
                } else {
                    var char = String.fromCharCode(event.which);
                    data.scan += char;
                }
            }

            if ($this.options.swipe) {
                if (event.which == 13) {
		    if( !$this.options.submit_on_swipe ){
                    	event.preventDefault();
		    }
                    var swipexp = new RegExp('^' + $this.options.prefix.swipe.card + $this.options.regexp.swipe.card + '$');
                    if (data.swipe.match(swipexp)) {
                        var swipe_match = swipexp.exec(data.swipe);
                        var date = new Date();
                        var year = date.getFullYear();
                        year = year.toString().substring(0, 2) + swipe_match[4];
                        $this.trigger({
                            type: $this.options.events.swipe.card,
                            swipe_data: swipe_match[0],
                            card_number: swipe_match[1],
                            card_holder_last_name: swipe_match[2],
                            card_holder_first_name: swipe_match[3],
                            card_exp_date_month: swipe_match[5],
                            card_exp_date_year_2: swipe_match[4],
                            card_exp_date_year_4: year,
                            time: date
                        });
                    }
                    data.swipe = '';
                } else {
                    var char = String.fromCharCode(event.which);
                    data.swipe += char.replace(/ /g, '');
                }
            }
        });
    };
}());
