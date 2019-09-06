$imagename = "hanyuufurude/foofserver"
$tag = "v6.5"
$name = $imagename+":"+$tag
Write-Host($name)
docker build -t $name .
docker push $name