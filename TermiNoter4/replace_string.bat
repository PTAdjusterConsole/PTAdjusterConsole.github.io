@echo off
setlocal enabledelayedexpansion

set "search_this="
for /f "delims=" %%a in (versionKey.txt) do (
    set "search_this=%%a"
)

REM Get current date and time in YYYYMMDDHHMMSS format
set "date_time=%date:~10,4%%date:~4,2%%date:~7,2%%time:~0,2%%time:~3,2%%time:~6,2%"

REM Remove any leading spaces from hours
set "date_time=%date_time: =0%"

REM Define the string to search for and the replacement string
set "SEARCH_STRING=%search_this%"
set "REPLACE_STRING=%date_time%"

REM Loop through all HTML files in the current directory
for %%F in (*.html) do (
    REM Use PowerShell to read and replace content preserving formatting
    powershell -Command "(Get-Content '%%F' -Raw) -replace [regex]::Escape('%SEARCH_STRING%'), '%REPLACE_STRING%' | Set-Content '%%F.tmp'"
    
    REM Move the temporary file to overwrite the original
    move /y "%%F.tmp" "%%F" > nul
)

type nul > versionKey.txt

echo !REPLACE_STRING!>>versionKey.txt

echo Replacement completed.

