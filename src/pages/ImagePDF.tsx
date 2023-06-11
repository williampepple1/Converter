import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { jsPDF } from 'jspdf';
import { toast } from 'react-hot-toast/headless';

const ImageToPdf: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const doc = new jsPDF();
    let processedFilesCount = 0;

    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Turn file into a data URL
        const dataUrl = reader.result as string;
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          // Add the image to the PDF. You may need to adjust the dimensions
          doc.addImage(dataUrl, 'PNG', 10, 10, 180, 160);
          processedFilesCount++;

          // if it's not the last image, add a new page
          if (processedFilesCount < acceptedFiles.length) {
            doc.addPage();
          } else {
            // Generate the PDF and create a URL for it
            const pdfData = doc.output('blob');
            const url = URL.createObjectURL(pdfData);
            setPdfUrl(url);
          }
        };
        img.onerror = () => {
          toast.error('There was an error loading one of your images. Please try again.');
        };
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{width: '500px', margin: '50px auto'}}>
      <div {...getRootProps()} style={{ padding: '20px', border: '2px dashed gray', borderRadius: '10px', textAlign: 'center', cursor: 'pointer'}}>
        <input {...getInputProps()}  type='image'/>
        {isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <p>Drag or Upload </p>
        )}
      </div>
      {pdfUrl && (
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <a href={pdfUrl} download="image.pdf">
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageToPdf;
