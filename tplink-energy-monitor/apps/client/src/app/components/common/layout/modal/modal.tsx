import * as React from 'react';
import styles from './modal.module.scss';
import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../../controls/button/button';

type ModalViewProps = {
    show: boolean;
    hideBackground?: boolean;
    onCloseRequest?: () => void;
};

export const ModalView: React.FC<PropsWithChildren<ModalViewProps>> = (props: PropsWithChildren<ModalViewProps>) => {
    const [loadingError, setLoadingError] = React.useState<boolean>(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => setLoadingError(true), 10000);

        return () => clearTimeout(timeout);
    }, []);

    return props.show
        ? ReactDOM.createPortal(
              <div className={`${styles.backdrop} ${props.show ? styles.visible : styles.hidden}`}>
                  <div
                      className={`${styles.modalContent} flex-col${
                          props.hideBackground ? ` ${styles.noBackground}` : ''
                      }`}
                  >
                      {props.children}
                      {props.onCloseRequest && props.hideBackground && loadingError && (
                          <div className={`${styles.modalCloseRequest} flex-col flex-center`}>
                              <div>
                                  <Button
                                      onClick={props.onCloseRequest}
                                      buttonLabel="Close"
                                      buttonStyle="secondary"
                                      type="button"
                                  />
                              </div>
                          </div>
                      )}
                  </div>
              </div>,
              // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
              document.getElementById('root')!,
          )
        : null;
};

ModalView.defaultProps = {
    hideBackground: false,
};
