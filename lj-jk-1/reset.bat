@echo off

setlocal
:PROMPT
SET /P AREYOUSURE=确定重置吗 (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

echo 开始重置
git reset --hard HEAD~1
echo 重置完成

:END
endlocal
pause
