$projectRoot = "C:\Users\juanc\OneDrive\Documents\Capstone Project\ABGS"

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot'; & '.\venv\Scripts\Activate.ps1'; python -m uvicorn app.main:app --reload"

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\frontend'; npm run dev"