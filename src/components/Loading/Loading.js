import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./Loading.module.css";

export const Loading = () => { 
  const [t] = useTranslation("global");
  return (
    <div className={`${styles["loading-wrapper"]} d-flex flex-column`}>
      <div className={`${styles["lds-dual-ring"]} `}>
        <b>{t("loading")}</b>
      </div>
    </div>
  );
};
