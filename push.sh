VER=v0.0.1
REPO=samiudeen96
NAME=greenwealth-app
docker build ./nginx-greenwealth --tag $REPO/$NAME:$VER && docker push  $REPO/$NAME:$VER
echo $REPO/$NAME:$VER   