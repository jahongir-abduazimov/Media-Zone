import { Modal } from "antd";
import request from "../../components/config";
import { useEffect, useState } from "react";
const ClientModal = ({ isOpen, handleClose, id }) => {
  const [loading, setLoading] = useState(false);
  const [salaries, setSalaries] = useState([]);

  const getSalaries = async () => {
    setLoading(true);
    try {
      const res = await request.get(`/accounts/employee/salary/list/${id}/`);
      setSalaries(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      getSalaries();
    }
  }, [isOpen]);
  return (
    <>
      <Modal
        title={<p className="mb-5 text-xl">Oylik tarixi</p>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        footer={false}
        onCancel={() => {
          handleClose();
          setSalaries([]);
        }}
        centered
        style={{ maxWidth: 370 }}
      >
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
          {loading ? (
            <p className="text-center py-3">Yuklanmoqda...</p>
          ) : (
            salaries.map((salary) => (
              <div
                key={salary.id}
                className="flex justify-between items-center p-3 border-b"
              >
                <p className="text-sm">{salary.date}</p>
                <p className="text-sm">
                  {salary.salary?.toLocaleString()} so'm
                </p>
              </div>
            ))
          )}
        </div>
        {salaries.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-3">Ma'lumot mavjud emas</p>
        )}
      </Modal>
    </>
  );
};

export default ClientModal;
