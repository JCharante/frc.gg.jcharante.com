make deploy:
	quasar build -m spa && aws s3 sync dist/spa/ s3://frc.gg.jcharante.com/
make invalidate:
	aws cloudfront create-invalidation --distribution-id E17LY1NSIOFA60 --paths "/index.html"
