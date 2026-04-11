export default function ImageViewer({ image, onClose }) {
  return (
    <div className="image-viewer" onClick={onClose}>
      <span className="close-viewer">&times;</span>
      <img src={image} alt="preview" />
    </div>
  );
}
