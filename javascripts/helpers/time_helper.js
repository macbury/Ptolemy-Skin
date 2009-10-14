function distance_of_time_in_words(time){
	var nbr = Math.floor(time / 60);
	return (nbr+":")+(((nbr=(time-(nbr*60)))<10)?"0"+nbr:nbr);
}