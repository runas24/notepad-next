function Get-Tree {
    param (
        [string]$Path = ".",
        [int]$Indentation = 0
    )
    
    $indent = " " * $Indentation
    $directories = Get-ChildItem -Path $Path -Directory | Where-Object {
        $_.FullName -notmatch '\\node_modules\\' -and
        $_.FullName -notmatch '\\.git\\' -and
        $_.FullName -notmatch '\\.env' -and
        $_.FullName -notmatch '\\.vscode\\' -and
        $_.FullName -notmatch '\\.DS_Store' -and
        $_.FullName -notmatch '\\build\\' -and
        $_.FullName -notmatch '\\dist\\' -and
        $_.FullName -notmatch '\\.next\\'
    }
    $files = Get-ChildItem -Path $Path -File | Where-Object {
        $_.FullName -notmatch '\\node_modules\\' -and
        $_.FullName -notmatch '\\.git\\' -and
        $_.FullName -notmatch '\\.env' -and
        $_.FullName -notmatch '\\.vscode\\' -and
        $_.FullName -notmatch '\\.DS_Store' -and
        $_.FullName -notmatch '\\build\\' -and
        $_.FullName -notmatch '\\dist\\' -and
        $_.FullName -notmatch '\\.next\\'
    }

    foreach ($file in $files) {
        Write-Output ("{0}- {1}" -f $indent, $file.Name)
    }

    foreach ($dir in $directories) {
        Write-Output ("{0}+ {1}" -f $indent, $dir.Name)
        Get-Tree -Path $dir.FullName -Indentation ($Indentation + 4)
    }
}

Get-Tree -Path "." | Out-File структура_проекта.txt
