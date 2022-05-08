use sha2::{Digest, Sha256};
use std::{fs, path::Path};
use tauri;

fn compute_hash(project: &String) -> String {
    let mut hasher = Sha256::new();
    hasher.update(&project);
    let hash = format!("{:X}", hasher.finalize());

    hash
}

#[tauri::command]
pub fn save_project(path: String, project: String) {
    let file_path = Path::new(&path);

    let hash = compute_hash(&project);
    let file_content = format!("{}\n{}", hash, project);

    fs::write(file_path, file_content).expect("Unable to save project");
}

#[tauri::command]
pub fn load_project(path: String) -> Result<String, String> {
    let file_path = Path::new(&path);

    if !file_path.exists() {
        return Err("File does not exist".into());
    }

    let file_content = fs::read_to_string(file_path);
    let file_content = match file_content {
        Ok(file) => file,
        Err(_) => return Err("Could not read file".into()),
    };

    let file_vec = file_content.lines().collect::<Vec<_>>();
    let hash = file_vec[0].to_string();
    let project = file_vec[1].to_string();

    let computed_hash = compute_hash(&project);
    if hash != computed_hash {
        return Err("File is corrupted".into());
    }

    Ok(project)
}
