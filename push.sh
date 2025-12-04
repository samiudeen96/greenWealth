VER=v0.0.2
REPO=mohamedshahidh
NAME=greenwealth-app

docker build . -f nginx-greenwealth/Dockerfile -t $REPO/$NAME:$VER
docker push $REPO/$NAME:$VER

echo $REPO/$NAME:$VER
