@echo off
echo Deploiement des fichiers PHP vers XAMPP...

REM Copier le dossier backend vers XAMPP
xcopy "backend" "C:\xampp\htdocs\ComProGuinee2\backend\" /E /I /Y

echo.
echo Deploiement termine !
echo.
echo Vous pouvez maintenant tester l'API sur :
echo http://localhost/ComProGuinee2/backend/api/testimonials.php
echo.
pause
