import { createPortal } from "react-dom";
import styles from "./ZoomImage.module.css";
import { useZoom } from "../hooks/useZoom";
import { calculateLensStyle } from "../../../shared/utils/zoom";

interface ZoomableImageProps {
  src: string;
  alt: string;
}

const ZoomableImage = ({ src, alt }: ZoomableImageProps) => {
  const { 
    isModalOpen, showLens, lensPos, 
    openModal, closeModal, handleMouseMove, setShowLens 
  } = useZoom(src);

  const lensStyle = calculateLensStyle(lensPos, src);

  const modalContent = (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <button className={styles.closeBtn} onClick={closeModal}>
        &times;
      </button>
      <div
        className={styles.modalImageWrapper}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
        onMouseMove={handleMouseMove}
      >
        <img src={src} alt={alt} className={styles.modalMainImage} />
        {showLens && (
          <div className={styles.lens} style={lensStyle} />
        )}
      </div>
    </div>
  );

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={styles.triggerImage}
        onClick={openModal}
      />
      {isModalOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default ZoomableImage;