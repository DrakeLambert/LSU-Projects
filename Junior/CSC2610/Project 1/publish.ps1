$currentFileName = "publish.ps1"
$publishDirectory = "C:\Program Files (x86)\Apache Group\Apache2\htdocs"

foreach ($file in Get-ChildItem) {
    if ($file.Name -ne $currentFileName) {
        Copy-Item $file $publishDirectory -Force -Recurse
    }
}