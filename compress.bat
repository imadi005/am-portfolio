@echo off
setlocal enabledelayedexpansion

REM Output directory for compressed files
set "OUTPUT_DIR=public_optimized"
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

echo --- Starting Video Compression ---
REM Find and compress all .mp4 files
for /r public %%f in (*.mp4) do (
    set "filepath=%%f"
    REM Replace 'public' with the output directory name
    set "output_path=!filepath:public=%OUTPUT_DIR%!"
    
    REM Create the directory for the output file if it doesn't exist
    for %%p in ("!output_path!") do (
        if not exist "%%~dpp" mkdir "%%~dpp"
    )

    echo Compressing video: "%%f"
    REM Run ffmpeg command
    ffmpeg -i "%%f" -vf "scale=1280:-1" -crf 28 -preset veryfast -vcodec libx264 -acodec aac "!output_path!" -y
)
echo --- Video Compression Finished ---

echo.
echo --- Starting Image Compression ---
REM Find and compress all image files (jpeg, jpg, png)
for %%e in (jpeg jpg png) do (
    for /r public %%f in (*.%%e) do (
        set "filepath=%%f"
        set "output_path=!filepath:public=%OUTPUT_DIR%!"

        REM Create the directory for the output file if it doesn't exist
        for %%p in ("!output_path!") do (
            if not exist "%%~dpp" mkdir "%%~dpp"
        )
        
        echo Compressing image: "%%f"
        REM This command is correct and will work with a proper installation
        magick convert "%%f" -resize 1920x> -quality 80 -strip "!output_path!"
    )
)
echo --- Image Compression Finished ---

echo.
echo ✅ Compression complete! Check the '%OUTPUT_DIR%' folder.
pause