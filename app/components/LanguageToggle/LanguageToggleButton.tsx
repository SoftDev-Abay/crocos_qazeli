import React from "react";
import { useTransition } from "react";
import { useRouter } from "next/router";
import "./style.scss";

const LanguageToggleButton: React.FC<React.HTMLProps<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = router.locale;
  const languages = ["ru", "en"];

  const onLanguageChange = () => {
    if (isPending) return;

    const currentLanguageIndex = languages.indexOf(localeActive || "ru");
    const nextLanguageIndex = (currentLanguageIndex + 1) % languages.length;
    const nextLocale = languages[nextLanguageIndex];

    startTransition(() => {
      // Construct the URL preserving query parameters and dynamic segments
      const pathname = router.pathname; // Gets the current route with dynamic segments like `[id]`
      const query = { ...router.query }; // Preserve other query parameters and update the locale

      router.push({ pathname, query }, undefined, { locale: nextLocale });
    });
  };

  return (
    <div
      className={`language-toggle ${className}`}
      onClick={onLanguageChange}
      {...props}
    >
      <span className="text">{localeActive === "ru" ? "Ру" : "En"}</span>
    </div>
  );
};

export default LanguageToggleButton;
