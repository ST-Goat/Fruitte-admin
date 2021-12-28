import classNames from "classnames";
import ButtonCustomizer from "pages/common/Button";

const BookingInformation = ({
  handleCancel,
  handleViewBill,
}: {
  handleCancel: () => void;
  handleViewBill: () => void;
}) => {
  return (
    <div
      className={classNames(
        "p-4 mx-32 my-8",
        "rounded rounded-lg border borde-grey-default",
        "text-center"
      )}
    >
      <h2 className="text-xl font-bold">
        Happy Farm <br /> Plant trees
      </h2>
      <section className="flex justify-end">
        <div style={{ minWidth: 200 }} className="mr-8">
          <b>User:</b>
          <p>junghaein123</p>
        </div>
        <div style={{ minWidth: 200 }}>
          <b>Booking date:</b>
          <p>10/09/2021</p>
        </div>
      </section>
      <section className="mt-8 flex">
        <div className="mr-4">
          <img
            src="https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_limit,h_256,dpr_3/https://assets.app.engoo.com/images/QKVwutsxMHDrNur49p0IxFhxQRqCgYldwxT5Keeq0SQ.jpeg"
            style={{ width: 520, height: 400 }}
          />
        </div>
        <div
          className={classNames(
            "mr-8 flex items-center",
            "font-bold text-center"
          )}
        >
          19:00 <br />
          2021/10/10
        </div>
        <ul>
          <li className="font-bold text-left">Farm Location:</li>
          <li className="font-bold text-left">Phone number:</li>
          <li className="font-bold text-left">Staff:</li>
          <li className="font-bold text-left">Price:</li>
          <li className="font-bold text-left">Type:</li>
          <li className="font-bold text-left">Additonal service:</li>
        </ul>
      </section>
      <div className="mt-36 mb-16 flex justify-center">
        <ButtonCustomizer
          style={{ minWidth: 200 }}
          color="secondary"
          className="mr-8"
          onClick={handleCancel}
        >
          Cancel reservation
        </ButtonCustomizer>
        <ButtonCustomizer style={{ minWidth: 200 }} onClick={handleViewBill}>
          View billing information
        </ButtonCustomizer>
      </div>
    </div>
  );
};

export default BookingInformation;
