use std::{fs, path::PathBuf};

use tauri;

fn get_config_path(app_handle: tauri::AppHandle) -> PathBuf {
    let app_dir = app_handle.path_resolver().app_dir().unwrap();
    let config_path = app_dir.join("config.json");

    config_path
}

#[tauri::command]
pub fn get_app_store(app_handle: tauri::AppHandle) -> Result<String, String> {
    let config_path = get_config_path(app_handle);

    let config_exists = config_path.exists();
    if !config_exists {
        return Err("Config does not exist".into());
    }

    let app_store = fs::read_to_string(config_path).expect("Unable to read config");
    return Ok(app_store.into());
}

#[tauri::command]
pub fn set_app_store(app_handle: tauri::AppHandle, app_store: String) {
    let config_path = get_config_path(app_handle);
    let app_dir = config_path.parent().unwrap();

    let app_dir_exists = app_dir.exists();
    if !app_dir_exists {
        fs::create_dir(app_dir).expect("Unable to create app dir");
    }

    fs::write(config_path, app_store).expect("Unable to write config")
}
