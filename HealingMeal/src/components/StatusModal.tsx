import styles from "../styles/StatusModal.module.less";
interface StatusMSGProps {
  statusMSG: string;
  isValidNameMSG: string;
  isValidBirthDateMSG: string;
  isValidPhoneNumberMSG: string;
  isValidEmailMSG: string;
  isValidGenderMSG: string;

  closeModal: () => void;
}

const StatusModal: React.FunctionComponent<StatusMSGProps> = ({
  statusMSG,
  isValidNameMSG,
  isValidBirthDateMSG,
  isValidEmailMSG,
  isValidGenderMSG,
  isValidPhoneNumberMSG,
  closeModal,
}) => {
  return (
    <div className={styles.statusModal}>
      <div className={styles.Modal_text}>
        {statusMSG} <br />
        {isValidNameMSG} <br />
        {isValidBirthDateMSG} <br />
        {isValidGenderMSG} <br />
        {isValidEmailMSG} <br />
        {isValidPhoneNumberMSG} <br />
      </div>
      <div className={styles.Modal_btn}>
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default StatusModal;
