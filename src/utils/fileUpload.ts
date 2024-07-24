// @ts-nocheck

// src/utils/fileUpload.js
export function uploadFile(file, user) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileType = file.type.split('/')[0];
        resolve({
          user,
          url: event.target.result,
          type: fileType === 'image' ? 'image' : 'video'
        });
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
  