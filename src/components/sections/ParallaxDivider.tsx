interface ParallaxDividerProps {
  image?: string;
  alt: string;
  text?: string;
  variant?: 'green' | 'azure';
}

export default function ParallaxDivider({ image, alt, text, variant = 'green' }: ParallaxDividerProps) {
  return (
    <div className={`parallax-divider parallax-${variant}`} role="img" aria-label={alt}>
      {image && (
        <div className="parallax-bg-img">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="parallax-overlay" />
      {text && (
        <div className="parallax-content">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
