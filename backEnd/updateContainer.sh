git pull
tag = $(cat ./tag)
docker pull hanyuufurude/foofserver:v6.6
docker stop foofserver
docker run -d --net=host -v /home/admin/app/seustall/backEnd/asset/:/foof/asset hanyuufurude/foofserver:v6.6
