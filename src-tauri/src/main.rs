use tauri;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_app_store])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_app_store(app_handle: tauri::AppHandle) -> Result<String, String> {
    let app_dir = app_handle.path_resolver().app_dir().unwrap();
    let config_file = app_dir.join("config.json");

    let config_exists = config_file.exists();
    if !config_exists {
        return Err("does not exist".into());
    }

    Ok("".into())
}
