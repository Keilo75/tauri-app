use std::path::Path;

use tauri;

#[tauri::command]
pub fn is_folder_empty(folder: String) -> Result<bool, ()> {
    let path = Path::new(&folder);

    // Error out if folder does not exist
    if !path.is_dir() {
        return Err(());
    }

    let is_empty = path
        .read_dir()
        .map(|mut i| i.next().is_none())
        .unwrap_or(false);

    Ok(is_empty)
}
