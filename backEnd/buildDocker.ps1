$imagename = "hanyuufurude/foofserver"
$tag = "v6.4"
$name = $imagename+":"+$tag
Write-Host($name)
docker build -t $name .
docker push $name