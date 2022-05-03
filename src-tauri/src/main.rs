use tauri;
mod app_store;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            app_store::get_app_store,
            app_store::set_app_store
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
