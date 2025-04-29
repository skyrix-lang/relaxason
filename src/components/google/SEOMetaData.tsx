import { FC } from "react";
import { Helmet } from "react-helmet-async";
import logo from "../../assets/logo_relaxason.png";

interface SEOMetadataProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string; // article, website, etc.
  locale?: string;
  siteName?: string;
}

const SEOMetadata: FC<SEOMetadataProps> = ({
  title,
  description,
  image = logo,
  url = "https://relaxason.com",
  type = "website",
  locale = "fr_FR",
  siteName = "Relaxason",
}) => {
  // Ensure URLs are absolute
  const imageUrl = image.startsWith("http") ? image : `${url}${image}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Optional Meta Tags */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOMetadata;
