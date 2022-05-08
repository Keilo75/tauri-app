use tauri;
mod app_store;
mod save_project;
mod validate_paths;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            app_store::get_app_store,
            app_store::set_app_store,
            validate_paths::is_folder_empty,
            save_project::save_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
