import { Button, Modal } from "antd";
const LogoutModal = ({ isOpen, handleClose }) => {
  const LogOut = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  }
  return (
    <>
      <Modal
        title={<p className="mb-5 text-xl">Tizimdan chiqmoqchimisiz?</p>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        footer={false}
        onCancel={() => {
          handleClose();
        }}
        centered
        style={{ maxWidth: 370 }}
      >
        <div className="flex justify-end gap-3">
          <Button size="large" onClick={handleClose}>Yo'q</Button>
          <Button size="large" type="primary" onClick={LogOut}>
            Ha
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;
