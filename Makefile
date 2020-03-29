deploy:
	netlify deploy --dir=build

gulp:
	gulp

reset:
	rm -rf build/

prod: reset gulp deploy
