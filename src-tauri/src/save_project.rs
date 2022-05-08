use sha2::{Digest, Sha256};
use std::{fs, path::Path};
use tauri;

#[tauri::command]
pub fn save_project(name: String, folder: String, project: String) {
    let folder = Path::new(&folder);
    let path = folder.join(format!("{}.botlab", name));

    let mut hasher = Sha256::new();
    hasher.update(&project);
    let hash = format!("{:X}", hasher.finalize());

    let file_content = format!("{}\n{}", hash, project);
    fs::write(path, file_content).expect("Unable to save project");
}
