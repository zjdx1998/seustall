$imagename = "hanyuufurude/foofserver"
$tag = Get-Content "./tag"
$name = $imagename+":"+$tag
Write-Host($name)
docker build -t $name .
docker push $name