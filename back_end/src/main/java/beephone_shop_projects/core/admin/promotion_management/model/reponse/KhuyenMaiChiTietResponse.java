package beephone_shop_projects.core.admin.promotion_management.model.reponse;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface KhuyenMaiChiTietResponse{

    @Value("#{target.don_gia}")
    BigDecimal getDonGia();

    @Value("#{target.don_gia_sau_khuyen_mai}")
    BigDecimal getDonGiaSauKhuyenMai();
}
