use std::fs;
use std::path::Path;
use tauri;
mod app_store;
mod validate_paths;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            app_store::get_app_store,
            app_store::set_app_store,
            validate_paths::is_folder_empty,
            save_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn save_project(name: String, folder: String, project: String) {
    let folder = Path::new(&folder);
    let path = folder.join(format!("{}.botlab", name));
    fs::write(path, project).expect("Unable to save project")
}
