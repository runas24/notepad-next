import shutil
import os
import time
from datetime import datetime

backup_folder = 'Backup'
interval = 180  # интервал в секундах (180 секунд = 3 минуты)

if not os.path.exists(backup_folder):
    os.makedirs(backup_folder)

while True:
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_name = f'backup_{timestamp}.zip'
    backup_path = os.path.join(backup_folder, backup_name)
    
    shutil.make_archive(backup_path.replace('.zip', ''), 'zip', '.')

    print(f'Backup created: {backup_path}')
    
    time.sleep(interval)
