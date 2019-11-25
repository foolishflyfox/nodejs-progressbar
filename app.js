var express = require('express');
var path = require('path');
var bliss = new require('bliss');
var colors = require('colors');
var app = express();
var view = new bliss();

app.set('views', path.join(__dirname, 'views'));
app.engine('.bliss', function(path, options, fn){
    fn( null, view.render(path, options));
});

/*
 * ROUTES
 */

app.get('/:progress/:total?', function(req, res){
	progress = req.params.progress;
	total = req.params.total;
	if(!progress){
		progress = "0";
	}
	if(!total){
		total = "100";
	}
	progress = parseInt(progress);
	total = parseInt(total);
    if ( progress > total ){
        res.send('You progress is greater than total');  
    }
    else
    {
		progress = 100*progress/total;
		progress = progress.toFixed(2);
        width = 90.0 * progress / 100.0;
        if ( progress < 30 )
        {
            colour = "d9534f";
        }
        else if ( progress < 70)
        {
            colour = "f0ad4e";
        }
        else {
            colour = "5cb85c";
        }

        res.type('svg');
        res.render('bar.bliss', { width: width, progress: progress, colour: colour  });
        console.log('Rendered: '.green + progress + "%".green);
    }
});

/*
 * SERVER
 */
var server = app.listen(3000, function() {
    console.log('Listening on port 3000'.rainbow);
});
