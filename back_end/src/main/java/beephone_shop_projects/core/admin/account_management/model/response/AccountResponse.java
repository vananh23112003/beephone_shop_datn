package beephone_shop_projects.core.admin.account_management.model.response;

import beephone_shop_projects.entity.Account;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Projection(types = {Account.class})
public interface AccountResponse {
    @Value("#{target.ma}")
    String getMa();
    @Value("#{target.id}")
    String getID();
    @Value("#{target.mat_khau}")
    String getMatKhau();
    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.ho_va_ten}")
    String getHoVaTen();

   @Value("#{target.id_role}") // Truy cập thuộc tính id của đối tượng Role
   String getIdRole();
    @Value("#{target.trang_thai}")
    String getTrangThai();


    @Value("#{target.so_dien_thoai}")
    String getSoDienThoai();
//    @Temporal(TemporalType.DATE)
    @Value("#{target.ngay_sinh}")
    LocalDate getNgaySinh();

}
