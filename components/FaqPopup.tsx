import React from "react";
import style from "../styles/home.module.css";
import { useRouter } from "next/router";
import en from "../locales/en";
import vn from "../locales/vn";

interface FaqPopupProps {
  onClose: () => void;
}

const FaqPopup: React.FC<FaqPopupProps> = ({ onClose }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : vn;

  return (
    <>
    <div
      className={`fixed w-[100vw] h-[100vh] bg-[black] bg-opacity-40 popupWallet`}
    />
      <div className="popupBuy popupBuy-white">
        <img
          onClick={onClose}
          className={style["img-close"]}
          src="/multiply.png"
        />
        <div className={`rounded-[4px] `}>
          <div className="text-lg mb-[20px] font-semibold">Điều kiện điều khoản sử dụng Voucher</div>
           1. Vouchers được sử dụng để mua
          hàng tại Shopdi, bao gồm cả các sản phẩm trong chương trình khuyến
          mãi.<br/> 2. Khách Hàng sẽ sử dụng Voucher và quy đổi thành Shopdi xu để
          mua sắm và thực hiện thanh toán trực tuyến trên Shopdi. <br/>3. Mỗi Mã
          Voucher chỉ được chuyển đổi sang Shopdi xu 01 lần. Không chấp nhận
          voucher đã quá thời gian quy đổi. <br/>4. Voucher sẽ không được hoàn lại
          khi đã quy đổi Shopdi Xu <br/>5. Voucher không có giá trị quy đổi thành
          tiền mặt. <br/>6. Khách hàng có trách nhiệm bảo mật thông tin voucher sau
          khi mua. Shopdi sẽ không chịu trách nhiệm trả lại Voucher bị mất hoặc
          ở trạng thái "Đã sử dụng" sau thời điểm Voucher được quy đổi vì bất kỳ
          lý do gì.<br/> 7. Shopdi có quyền sửa đổi hoặc thay đổi các điều khoản và
          điều kiện mà không cần thông báo trước.
        </div>
      </div>
   
    </>
  );
};

export default FaqPopup;
