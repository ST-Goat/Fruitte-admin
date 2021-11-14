import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Text from "pages/common/components/Text";
import ButtonCustomizer from "pages/common/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Text className="text-center font-bold text-3xl text-blue-300">
            요청서
          </Text>
          <div className="m-auto mt-2 w-64 h-px bg-grey-500"></div>
          <div className="mt-8">
            <Text className="text-xl font-bold">이름</Text>
            <Text className="text-xl">홍길동</Text>
          </div>
          <div className="mt-8">
            <Text className="text-xl font-bold">전화번호</Text>
            <Text className="text-xl">010-1234-1234</Text>
          </div>
          <div className="mt-4">
            <Text className="text-xl font-bold">내용</Text>
            <Text className="text-xl">
              내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
              내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
              내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
            </Text>
          </div>
          <div className="w-full flex justify-between mt-36">
            <ButtonCustomizer
              className="rounded-3xl font-bold hover:opacity-80"
              color="green"
              style={{ minWidth: "25%" }}
            >
              승인
            </ButtonCustomizer>
            <ButtonCustomizer
              className="rounded-3xl font-bold hover:opacity-80"
              color="red"
              style={{ minWidth: "25%" }}
            >
              반려
            </ButtonCustomizer>
            <ButtonCustomizer
              className="rounded-3xl bg-grey-500 font-bold hover:opacity-80"
              color="other"
              style={{ minWidth: "25%" }}
              onClick={handleClose}
            >
              취소
            </ButtonCustomizer>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
