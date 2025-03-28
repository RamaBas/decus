import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Upload, ImageIcon, File, X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FileUploaderProps {
  isImage?: boolean;
  onUploadURL: (url: string) => void;
  onDeleteURL?: (url: string) => void;
  maxFiles?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  isImage = true, 
  onUploadURL,
  onDeleteURL,
  maxFiles = 1 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string; publicId: string }>>([]);
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
    const files = event.target.files;
    if (!files) return;

    const filesArray = Array.from(files).slice(0, maxFiles - uploadedFiles.length);
    
    if (filesArray.length === 0) return;

    setIsUploading(true);
    setShowToast(false);

    try {
      const uploadPromises = filesArray.map(async (file) => {
        // Validaciones
        if (isImage && !file.type.startsWith('image/')) {
          throw new Error('Tipo de archivo no válido');
        }

        if (file.size > 5 * 1024 * 1024) {
          throw new Error('El archivo supera los 5MB');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('cloud_name', cloudName);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/${isImage ? 'image' : 'raw'}/upload`,
          { method: 'POST', body: formData }
        );

        if (!response.ok) throw new Error('Error en la subida');
        
        const data = await response.json();
        return {
          url: data.secure_url,
          publicId: data.public_id
        };
      });

      const results = await Promise.all(uploadPromises);
      setUploadedFiles(prev => [...prev, ...results]);
      results.forEach(file => onUploadURL(file.url));
      
    } catch (err) {
      setShowToast(true);
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (publicId: string, url: string) => {
    try {
      // Eliminar de Cloudinary (requiere configuración segura en backend)
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_id: publicId,
            upload_preset: uploadPreset
          })
        }
      );

      if (!response.ok) throw new Error('Error al eliminar');
      
      setUploadedFiles(prev => prev.filter(file => file.publicId !== publicId));
      onDeleteURL?.(url);

    } catch (err) {
      toast.error('Error al eliminar el archivo');
      console.error(err);
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
            multiple={maxFiles > 1}
            disabled={isUploading || uploadedFiles.length >= maxFiles}
            className="hidden"
          />
          {isUploading ? (
            <Upload className="h-5 w-5 animate-pulse" />
          ) : (
            isImage ? <ImageIcon className="h-5 w-5" /> : <File className="h-5 w-5" />
          )}
          {isImage ? 'Seleccionar fotos' : 'Seleccionar archivos'}
        </label>
        
        {isUploading && (
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Upload className="h-4 w-4 animate-bounce" />
            Subiendo archivos...
          </p>
        )}
      </div>

      {/* Previsualización de archivos */}
      <div className="mt-2 flex flex-wrap gap-2">
        {uploadedFiles.map((file, index) => (
          <div key={file.publicId} className="relative group">
            <img
              src={file.url}
              alt={`Preview ${index}`}
              className="h-16 w-16 object-cover rounded-md"
            />
            <button
              onClick={() => handleDeleteFile(file.publicId, file.url)}
              className="absolute top-1 right-1 bg-gray-500/80 text-white rounded-full p-0.5 hover:bg-red-600 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Contador de archivos */}
      {maxFiles > 1 && (
        <p className="text-sm text-gray-500">
          {uploadedFiles.length}/{maxFiles} archivos subidos
        </p>
      )}
    </div>
  );
};

export default FileUploader;