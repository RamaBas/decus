import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Upload, ImageIcon, File } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FileUploaderProps {
  isImage?: boolean;
  onUploadURL: (url: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ isImage = true, onUploadURL }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const [showToast, setShowToast] = useState(false);
  const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;

  useEffect(() => {
    if (showToast) {
      toast.error('Hubo problemas al momento de subir el archivo', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadSuccess(null);
    
    // Validaciones
    if (isImage && !file.type.startsWith('image/')) {
      setShowToast(true);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setShowToast(true);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('cloud_name', cloudName);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${isImage ? 'image' : 'raw'}/upload`,
        { method: 'POST', body: formData }
      );

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      onUploadURL(data.secure_url);
      setUploadSuccess(true);
    } catch (err) {
      setUploadSuccess(false);
      setShowToast(true);
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label className={`
          relative flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer
          ${isUploading ? 'bg-blue-200' : 'bg-blue-50 hover:bg-blue-100'}
          text-blue-700 font-semibold transition-colors
        `}>
          <input
            type="file"
            onChange={handleFileChange}
            accept={isImage ? 'image/*' : '*'}
            disabled={isUploading}
            className="hidden"
          />
          {isUploading ? (
            <Upload className="h-5 w-5 animate-pulse" />
          ) : (
            isImage ? <ImageIcon className="h-5 w-5" /> : <File className="h-5 w-5" />
          )}
          {isImage ? 'Seleccionar foto' : 'Seleccionar Curriculum'}
          
          {/* Estado de subida */}
          {uploadSuccess !== null && (
            <span className="absolute -right-2 -top-2">
              {uploadSuccess ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </span>
          )}
        </label>
        {isUploading && (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Upload className="h-4 w-4 animate-bounce" />
          Subiendo archivo...
        </p>
      )}
      </div>
      
      
    </div>
  );
};

export default FileUploader;