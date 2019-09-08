git pull
tag=$(cat ./tag)
docker pull hanyuufurude/foofserver:$tag
docker stop foofserver
docker rm foofserver
ifconfig eth0 | grep "inet addr:" | awk '{print $2}' | cut -c 6-
docker run -d --env SEUSTALL=${ifconfig eth0 | grep "inet addr:" | awk '{print $2}' | cut -c 6- } -v /home/admin/app/seustall/backEnd/asset/:/foof/asset --name foofserver hanyuufurude/foofserver:$tag