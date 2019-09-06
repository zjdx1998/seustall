git pull
tag=$(cat ./tag)
docker pull hanyuufurude/foofserver:$tag
docker stop foofserver
docker run -d --net=host -v /home/admin/app/seustall/backEnd/asset/:/foof/asset --name foofserver hanyuufurude/foofserver:$tag
