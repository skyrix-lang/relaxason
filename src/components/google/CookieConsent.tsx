import { FC, useEffect, useState } from "react";
import { Button, Group, Paper, Text } from "@mantine/core";
import global from "../../styles/Global.module.css";

const CookieConsent: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  // Vérifier si l'utilisateur a déjà donné son consentement
  useEffect(() => {
    const hasConsent = localStorage.getItem("cookie-consent");
    if (hasConsent === null) {
      setVisible(true);
    } else if (hasConsent === "false") {
      // Désactiver Google Analytics si l'utilisateur a refusé
      window["ga-disable-G-Q8CPR243NQ"] = true;
    }
  }, []);

  const acceptCookies = () => {
    // Stocker le consentement dans localStorage
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  const declineCookies = () => {
    // Stocker le refus dans localStorage
    localStorage.setItem("cookie-consent", "false");

    // Désactiver Google Analytics
    window["ga-disable-G-Q8CPR243NQ"] = true;

    // Supprimer les cookies existants liés à Google Analytics
    document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "_ga_G-Q8CPR243NQ=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_gat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Paper
      shadow="md"
      p="md"
      radius="md"
      withBorder
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#F8FDFC",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Text size="sm" mb="md">
        Ce site utilise des cookies pour analyser son trafic et améliorer votre
        expérience utilisateur. En acceptant, vous nous aidez à comprendre
        comment les visiteurs utilisent notre site.
      </Text>

      <Group justify="flex-end" gap="md">
        <Button
          variant="subtle"
          size="sm"
          onClick={declineCookies}
          style={{ color: "#868E96" }}
        >
          Refuser
        </Button>

        <Button size="sm" onClick={acceptCookies} className={global.ctaButton}>
          Accepter
        </Button>
      </Group>
    </Paper>
  );
};

declare global {
  interface Window {
    [key: string]: any;
  }
}

export default CookieConsent;
