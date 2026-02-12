export interface LensPosition {
  x: number;
  y: number;
  imgWidth: number;
  imgHeight: number;
}

export const LENS_SIZE = 150;
export const ZOOM_LEVEL = 2.5;

export const calculateLensStyle = (pos: LensPosition, src: string): React.CSSProperties => {
  return {
    width: `${LENS_SIZE}px`,
    height: `${LENS_SIZE}px`,
    left: `${pos.x - LENS_SIZE / 2}px`,
    top: `${pos.y - LENS_SIZE / 2}px`,
    backgroundImage: `url(${src})`,
    backgroundPosition: `-${pos.x * ZOOM_LEVEL - LENS_SIZE / 2}px -${
      pos.y * ZOOM_LEVEL - LENS_SIZE / 2
    }px`,
    backgroundSize: `${pos.imgWidth * ZOOM_LEVEL}px ${
      pos.imgHeight * ZOOM_LEVEL
    }px`,
  };
};