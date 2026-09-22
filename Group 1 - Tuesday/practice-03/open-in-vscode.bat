@echo off
if not exist "%~dp0README.md" (
    echo Extract the ZIP first ^(right click, Extract All^), then run this file again.
    pause
    exit /b 1
)
where code >nul 2>nul || (
    echo VS Code ^(code^) was not found on PATH.
    pause
    exit /b 1
)
call code "%~dp0."
