@echo off

setlocal
:PROMPT
SET /P AREYOUSURE=ȷ�������� (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

echo ��ʼ����
git reset --hard HEAD~1
echo �������

:END
endlocal
pause
