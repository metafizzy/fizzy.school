deploy:
	surge build fizzy.school

gulp:
	gulp

reset:
	rm -rf build/

prod: reset gulp deploy
