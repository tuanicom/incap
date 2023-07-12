$ScriptBlock = {
    param($target,$script_path)
    Set-Location $script_path
    .\rebuild.cmd $target
}
$build_front = Start-Job -ScriptBlock $ScriptBlock -ArgumentList "frontend",$PSScriptRoot -Name "Build.frontend" 
$build_back  = Start-Job -ScriptBlock $ScriptBlock -ArgumentList "backend",$PSScriptRoot -Name "Build.backend" 
Get-Job | Out-Host
$jobs = @($build_front,$build_back)
while ($jobs.Length -gt 0) {
    $jid = @()
    foreach ($j in $jobs) { $jid += $j.Id }
    
    Wait-job -Id $jid -Any -Timeout 6000

    $remaining = @()
    $jid = @()
    foreach ($j in $jobs) {
        if ($j.State -ne "Running") {
            Receive-Job -Job $j
        }
        else {
            $jid += $j.Id
            $remaining += $j
        }
    }
    $jobs = $remaining
}