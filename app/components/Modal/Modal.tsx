import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

import CloseIcon from "@/app/icons/CloseIcon";
import Backdrop from "./Backdrop";
import FacebookIcon from "@/app/icons/FacebookIcon";
import InstagramIcon from "@/app/icons/InstagramIcon";
import YoutubeIcon from "@/app/icons/YoutubeIcon";

type Props = {
  isShow: boolean;
  handleClose: Function;
  children: React.ReactNode;
  maxWidth?: number;
  display?: string;
};

const Modal: React.FC<Props> = ({
  isShow,
  handleClose,
  maxWidth,
  display,
  children,
}) => {
  const [isRenderedOnServerSide, setIsRenderedOnServerSide] =
    useState<boolean>(false);
  useEffect(() => {
    setIsRenderedOnServerSide(true);
  }, []);

  if (!isRenderedOnServerSide) return null;
  return createPortal(
    <>
      {isShow ? (
        <div className={classNames(styles.modal, { "d-none": !isShow })}>
          <div
            style={maxWidth ? { maxWidth: maxWidth, width: "100%" } : {}}
            className={styles.modalContainer}
          >
            <div>
              <div className={styles.modalTop}>
                <div
                  style={
                    display ? { display: display } : { display: "inline-block" }
                  }
                  className={styles.modalControls}
                  onClick={() => handleClose()}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className={styles.modalMain}>{children}</div>
            </div>

            <div className={styles.modalBottom}>
              <div className={styles.modalBottomLinksContainer}>
                <a href="https://www.facebook.com/" target="_blank">
                  <FacebookIcon width={24} height={24} />
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                  <InstagramIcon width={24} height={24} />
                </a>
                <a href="https://www.youtube.com/" target="_blank">
                  <YoutubeIcon width={24} height={24} />
                </a>
              </div>

              <p className={styles.modalBottomCopyright}>
                © Eurasia Group 2022
              </p>
            </div>
          </div>
          <Backdrop onClick={handleClose} transparent={true} />
        </div>
      ) : (
        <></>
      )}
    </>,
    document.getElementById("modal-root")!!
  );
};

export default Modal;
